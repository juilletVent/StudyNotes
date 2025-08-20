pub mod utils {
    use std::{
        cell::RefCell,
        rc::{Rc, Weak},
    };

    #[derive(Debug)]
    pub struct Node {
        value: String,
        next: Option<Rc<RefCell<Node>>>,
        prev: Option<Weak<RefCell<Node>>>,
    }

    impl Node {
        pub fn new(value: &str) -> Self {
            Self {
                value: value.to_string(),
                next: None,
                prev: None,
            }
        }

        pub fn new_ref(value: &str) -> Rc<RefCell<Self>> {
            Rc::new(RefCell::new(Self::new(value)))
        }

        pub fn next(&self) -> Option<Rc<RefCell<Node>>> {
            self.next.clone()
        }

        pub fn prev(&self) -> Option<Weak<RefCell<Node>>> {
            self.prev.clone()
        }

        pub fn set_next(&mut self, next_node: Rc<RefCell<Node>>) {
            self.next = Some(next_node);
        }

        pub fn set_prev(&mut self, prev_node: Weak<RefCell<Node>>) {
            self.prev = Some(prev_node);
        }

        pub fn value(&self) -> &str {
            &self.value
        }
    }

    #[derive(Debug)]
    pub struct LinkList {
        head: Option<Rc<RefCell<Node>>>,
        tail: Option<Rc<RefCell<Node>>>,
        size: u32,
    }

    impl LinkList {
        pub fn new() -> LinkList {
            LinkList {
                head: None,
                tail: None,
                size: 0,
            }
        }

        pub fn push_back(&mut self, value: &str) {
            let new_node = Node::new_ref(value);
            self.size += 1;

            // 判断tail是否为空，如果为空，则需要同时修改head与tail
            if self.tail.is_none() {
                self.head = Some(Rc::clone(&new_node));
                self.tail = Some(Rc::clone(&new_node));
            } else {
                // 不为空，在尾部添加即可，并为尾部节点设置前向弱引用
                self.tail
                    .as_ref()
                    .unwrap()
                    .borrow_mut()
                    .set_next(Rc::clone(&new_node));
                new_node
                    .borrow_mut()
                    .set_prev(Rc::downgrade(&self.tail.as_ref().unwrap()));
                // 移动 tail 指向新的尾部
                self.tail = Some(new_node);
            }
        }

        pub fn push_front(&mut self, value: &str) {
            let new_node = Node::new_ref(value);
            self.size += 1;

            if self.head.is_none() {
                // 空表
                self.head = Some(Rc::clone(&new_node));
                self.tail = Some(Rc::clone(&new_node));
            } else {
                // 不为空，在头部添加即可，并为头部节点设置后向弱引用
                self.head
                    .as_ref()
                    .unwrap()
                    .borrow_mut()
                    .set_prev(Rc::downgrade(&new_node));
                new_node
                    .borrow_mut()
                    .set_next(Rc::clone(&self.head.as_ref().unwrap()));
                // 移动 head 指向新的头部
                self.head = Some(new_node);
            }
        }

        pub fn length(&self) -> u32 {
            self.size
        }

        pub fn head(&self) -> Option<String> {
            if self.head.is_none() {
                None
            } else {
                Some(self.head.as_ref().unwrap().borrow().value().to_string())
            }
        }

        pub fn tail(&self) -> Option<String> {
            if self.tail.is_none() {
                None
            } else {
                Some(self.tail.as_ref().unwrap().borrow().value().to_string())
            }
        }

        pub fn iter(&self) -> ListIter {
            ListIter::new(self)
        }

        pub fn revert_iter(&self) -> ListRevertIter {
            ListRevertIter::new(self)
        }

        // 在指定位置删除元素
        pub fn delete_at(&mut self, index: u32) {
            // 找到对应的元素
            for (iter_cursor, iter_item) in self.iter().enumerate() {
                if iter_cursor == index as usize {
                    let prev_node = iter_item.as_ref().borrow().prev();
                    let next_node = iter_item.as_ref().borrow().next();

                    let has_next = !next_node.is_none();
                    let has_prev = match prev_node.clone() {
                        Some(weak_ref) => match Weak::upgrade(&weak_ref) {
                            Some(_) => true,
                            _ => false,
                        },
                        _ => false,
                    };

                    // 如果同时存在前级节点与后级节点：将前级节点的next指向后级节点，将后级节点的prev指向前级节点
                    if has_prev && has_next {
                        let prev_node = Weak::upgrade(&prev_node.unwrap()).unwrap();
                        let next_node = next_node.unwrap();
                        // 前级指向后级
                        prev_node.borrow_mut().set_next(Rc::clone(&next_node));
                        // 后级指向前级
                        next_node.borrow_mut().set_prev(Rc::downgrade(&prev_node));
                        self.size -= 1;
                        continue;
                    }
                    // 如果仅存在前级节点，不存在后级节点，将前级节点的next置空，移动list的tail指向
                    if has_prev && !has_next {
                        let prev_node = Weak::upgrade(&prev_node.unwrap()).unwrap();
                        prev_node.borrow_mut().next = None;
                        self.tail = Some(prev_node);
                        self.size -= 1;
                        continue;
                    }
                    // 如果仅存在后级节点，将当前节点的next置空即可
                    if !has_prev && has_next {
                        self.head = iter_item.borrow().next();
                    }
                    // 前后都不存在，当前链表就一个元素
                    if !has_next && !has_next {
                        self.head = None;
                        self.tail = None;
                    }

                    self.size -= 1;
                }
            }
        }

        // 在制定位置后插入元素
        pub fn insert_at(&mut self, index: i32, node_val: &str) {
            self.size += 1;
            // 如果 Index < 0 则在表头插入
            if index < 0 {
                self.push_front(node_val);
                return;
            }
            // 如果 Index >= length - 1 则在表尾插入
            if index as u32 >= self.length() - 1 {
                self.push_back(node_val);
                return;
            }

            // 在指定元素后插入
            for (iter_cursor, iter_item) in self.iter().enumerate() {
                if iter_cursor == index as usize {
                    // 不需要判断目标元素后面是否还有元素，必然有的，没有的情况在上一个分支已经处理了
                    // 获取下一个节点
                    let next_node = iter_item.as_ref().borrow().next().unwrap();
                    let new_node = Node::new_ref(node_val);

                    // 新节点的后级节点指向新节点
                    next_node
                        .as_ref()
                        .borrow_mut()
                        .set_prev(Rc::downgrade(&new_node));

                    {
                        // 处理新节点自身的引用关系
                        let mut new_mut_ref = new_node.as_ref().borrow_mut();
                        new_mut_ref.set_next(next_node);
                        new_mut_ref.set_prev(Rc::downgrade(&iter_item));
                    }

                    // 新节点的前级节点指向新节点
                    iter_item.as_ref().borrow_mut().set_next(new_node);
                }
            }
        }
    }

    pub struct ListIter {
        current: Option<Rc<RefCell<Node>>>,
    }

    impl ListIter {
        pub fn new(link_list: &LinkList) -> ListIter {
            ListIter {
                current: link_list.head.clone(),
            }
        }
    }

    impl Iterator for ListIter {
        type Item = Rc<RefCell<Node>>;

        fn next(&mut self) -> Option<Self::Item> {
            if self.current.is_none() {
                None
            } else {
                let node = self.current.take().unwrap();
                self.current = node.borrow().next();
                Some(node)
            }
        }
    }

    impl IntoIterator for LinkList {
        type Item = Rc<RefCell<Node>>;
        type IntoIter = ListIter;

        fn into_iter(self) -> Self::IntoIter {
            ListIter::new(&self)
        }
    }

    // 为 &LinkList 实现 IntoIterator，这样可以多次迭代
    impl<'a> IntoIterator for &'a LinkList {
        type Item = Rc<RefCell<Node>>;
        type IntoIter = ListIter;

        fn into_iter(self) -> Self::IntoIter {
            self.iter()
        }
    }

    // 反向迭代器
    pub struct ListRevertIter {
        current: Option<Weak<RefCell<Node>>>,
    }

    impl ListRevertIter {
        pub fn new(link_list: &LinkList) -> ListRevertIter {
            if let Some(tail) = link_list.tail.clone() {
                return ListRevertIter {
                    current: Some(Rc::downgrade(&tail)),
                };
            };
            ListRevertIter { current: None }
        }
    }

    impl Iterator for ListRevertIter {
        type Item = Rc<RefCell<Node>>;

        fn next(&mut self) -> Option<Self::Item> {
            let val_opt = self.current.take();

            if let Some(val) = val_opt {
                if let Some(strong_val) = val.upgrade() {
                    // 修改当前迭代器指向的节点
                    let prev_node = strong_val.as_ref().borrow().prev();
                    self.current = prev_node;

                    return Some(strong_val);
                }
            }
            None
        }
    }
}
