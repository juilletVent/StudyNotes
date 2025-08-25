pub mod async_runtime {
    use {
        futures::{
            future::{BoxFuture, FutureExt},
            task::{ArcWake, waker_ref},
        },
        std::{
            future::Future,
            pin::Pin,
            sync::{
                Arc, Mutex,
                mpsc::{Receiver, SyncSender, sync_channel},
            },
            task::{Context, Poll, Waker},
            thread,
            time::Duration,
        },
    };

    pub struct TimerFuture {
        shared_state: Arc<Mutex<SharedState>>,
    }

    pub struct SharedState {
        completed: bool,
        waker: Option<Waker>,
    }

    impl Future for TimerFuture {
        type Output = ();

        fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
            let mut shared_state = self.shared_state.lock().unwrap();
            if shared_state.completed {
                Poll::Ready(())
            } else {
                shared_state.waker = Some(cx.waker().clone());
                Poll::Pending
            }
        }
    }

    impl TimerFuture {
        pub fn new(duration: Duration) -> Self {
            let shared_state = Arc::new(Mutex::new(SharedState {
                completed: false,
                waker: None,
            }));

            let thread_shared_state = shared_state.clone();

            thread::spawn(move || {
                thread::sleep(duration);

                let mut shared_state = thread_shared_state.lock().unwrap();
                shared_state.completed = true;

                if let Some(wake) = shared_state.waker.take() {
                    wake.wake();
                }
            });

            Self { shared_state }
        }
    }

    // =================================== 执行器 ===================================
    // 执行器，从通道中接受任务然后执行
    pub struct Executor {
        ready_queue: Receiver<Arc<Task>>,
    }

    // Spawner 负责创建新的 Future  然后将它发送到任务通道
    #[derive(Debug)]
    pub struct Spawner {
        task_sender: SyncSender<Arc<Task>>,
    }

    // Future，可以调度自己（将自己放入任务通道），然后等待执行器去Poll
    pub struct Task {
        future: Mutex<Option<BoxFuture<'static, ()>>>,
        task_sender: SyncSender<Arc<Task>>,
    }

    // 为调度器实现调度方法
    impl Spawner {
        pub fn spawn(&self, future: impl Future<Output = ()> + 'static + Send) {
            let future = future.boxed();
            let task = Arc::new(Task {
                future: Mutex::new(Some(future)),
                task_sender: self.task_sender.clone(),
            });
            self.task_sender.send(task).expect("任务队列已满");
        }
    }

    impl ArcWake for Task {
        fn wake_by_ref(arc_self: &Arc<Self>) {
            let cloned = arc_self.clone();
            arc_self.task_sender.send(cloned).expect("队列已满");
        }
    }

    impl Executor {
        pub fn run(&self) {
            while let Ok(task) = self.ready_queue.recv() {
                // 获取Future
                let mut future_slot = task.future.lock().unwrap();
                if let Some(mut future) = future_slot.take() {
                    let waker = waker_ref(&task);
                    let context = &mut Context::from_waker(&*waker);
                    if future.as_mut().poll(context).is_pending() {
                        *future_slot = Some(future);
                    }
                }
            }
        }
    }

    // 创建执行器与调度器
    pub fn new_executor_and_spawner() -> (Executor, Spawner) {
        const MAX_QUEUED_TASKS: usize = 10_000;
        let (task_sender, ready_queue) = sync_channel(MAX_QUEUED_TASKS);
        (Executor { ready_queue }, Spawner { task_sender })
    }
}
