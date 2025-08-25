use std::time::Duration;

use async_hello::async_runtime::{self, TimerFuture};

fn main() {
    let (executor, spawner) = async_runtime::new_executor_and_spawner();

    // 创建并调度一个任务，内联异步语句块，内部调用异步函数
    spawner.spawn(async {
        println!("a ha !");
        TimerFuture::new(Duration::from_secs(2)).await;
        say_hello().await;
        print!("done!");
    });

    drop(spawner);

    executor.run();
}

async fn say_hello() {
    println!("hello");
    TimerFuture::new(Duration::from_secs(1)).await;
}
