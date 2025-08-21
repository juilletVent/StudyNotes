#[derive(Debug)]
pub struct Node {
    data: String,
    next: Option<usize>,
    prev: Option<usize>,
    index: Option<usize>,
}

impl Node {
    pub fn new(data: &str) -> Self {
        Self {
            data: data.to_string(),
            next: None,
            prev: None,
            index: None,
        }
    }

    pub fn get_data(&self) -> &str {
        &self.data
    }

    pub fn get_next(&self) -> Option<usize> {
        self.next
    }

    pub fn get_prev(&self) -> Option<usize> {
        self.prev
    }

    pub fn set_next(&mut self, data: usize) {
        self.next = Some(data);
    }

    pub fn set_prev(&mut self, data: usize) {
        self.prev = Some(data);
    }

    pub fn clean_next(&mut self) {
        self.next = None;
    }

    pub fn clean_prev(&mut self) {
        self.prev = None;
    }

    pub fn has_next(&self) -> bool {
        !self.next.is_none()
    }

    pub fn has_prev(&self) -> bool {
        !self.prev.is_none()
    }
}

#[derive(Debug)]
pub struct LinkList {
    nodes: Vec<Option<Node>>,
    free_list: Vec<usize>,
    head: Option<usize>,
    tail: Option<usize>,
    size: usize,
}

impl LinkList {
    pub fn new() -> Self {
        Self::new_whit_size(0)
    }

    pub fn new_whit_size(pre_size: usize) -> Self {
        Self {
            nodes: Vec::with_capacity(pre_size),
            free_list: vec![],
            head: None,
            tail: None,
            size: 0,
        }
    }

    pub fn append(&mut self, mut node: Node) {
        self.size += 1;
        if self.tail.is_none() {
            // 空表，直接插入
            node.index = Some(0);
            self.nodes.push(Some(node));
            self.head = Some(0);
            self.tail = Some(0);
            return;
        }

        // 新节点前向引用处理
        let tail_node_index = self.tail.unwrap();
        node.set_prev(tail_node_index);

        if self.free_list.is_empty() {
            // 新节点索引位置
            let new_node_index = self.nodes.len();
            // update tail
            self.tail = Some(new_node_index);
            node.index = Some(new_node_index);
            let last_node = self.nodes[tail_node_index].as_mut().unwrap();
            last_node.set_next(new_node_index);

            // 将节点推入列表最后面
            self.nodes.push(Some(node));
        } else {
            // 存在空闲位置，获取空闲位置索引，然后放置到空闲位置
            let new_node_index = self.free_list.pop().unwrap();
            self.tail = Some(new_node_index);
            node.index = Some(new_node_index);
            let last_node = self.nodes[tail_node_index].as_mut().unwrap();
            last_node.set_next(new_node_index);

            // 将新节点放到对应空闲位置
            self.nodes[new_node_index] = Some(node);
        }
    }

    pub fn prepend(&mut self, mut node: Node) {
        self.size += 1;
        if self.head.is_none() {
            node.index = Some(0);
            self.nodes.push(Some(node));
            self.head = Some(0);
            self.tail = Some(0);
            return;
        }

        // 新节点的后向引用处理
        let head_node_index = self.head.unwrap();
        node.set_next(head_node_index);

        if self.free_list.is_empty() {
            // 没有空位，需要推入新的位置
            let new_node_index = self.nodes.len();
            node.index = Some(new_node_index);
            // 更新head索引
            self.head = Some(new_node_index);
            let first_node = self.nodes[head_node_index].as_mut().unwrap();
            first_node.set_prev(new_node_index);

            // 将节点推入列表尾部
            self.nodes.push(Some(node));
        } else {
            // 有空位，获取空位，放到空位上
            let new_node_index = self.free_list.pop().unwrap();
            node.index = Some(new_node_index);
            self.head = Some(new_node_index);
            let first_node = self.nodes[head_node_index].as_mut().unwrap();
            first_node.set_prev(new_node_index);

            // 将节点放置到对应的位置
            self.nodes[new_node_index] = Some(node);
        }
    }

    pub fn insert_at(&mut self, index: i32, mut node: Node) {
        let vec_len = self.nodes.len();
        if index <= 0 {
            // 对头插入
            self.prepend(node);
            return;
        }
        if index as usize > self.size - 1 {
            // 队尾插入
            self.append(node);
            return;
        }

        // 队中插入
        let mut next_index_opt = None;
        for (iter_index, iter_item) in self.into_iter().enumerate() {
            // 迭代序号才是正确的目标序号，匹配则记录存储的实际序号
            if iter_index == index as usize {
                next_index_opt = iter_item.index; // 元素本身也记录了存储在什么位置上
                break;
            }
        }
        if let Some(next_index) = next_index_opt {
            self.size += 1;
            // 获取目标节点以及目标节点的前级节点
            let next_node = self.nodes[next_index].as_ref().unwrap();
            let prev_index = next_node.get_prev().unwrap();

            // 新插入节点的引用关系处理
            node.set_prev(prev_index);
            node.set_next(next_index);

            // 获取新节点存放的实际位置
            let has_idle = !self.free_list.is_empty();
            let new_node_index = if has_idle {
                self.free_list.pop().unwrap()
            } else {
                vec_len
            };

            // 节点记录自身的实际位置
            node.index = Some(new_node_index);
            // 处理前后节点关系
            let prev_node = self.nodes[prev_index].as_mut().unwrap();
            prev_node.set_next(new_node_index);
            let next_node = self.nodes[next_index].as_mut().unwrap();
            next_node.set_prev(new_node_index);

            if has_idle {
                self.nodes[new_node_index] = Some(node);
            } else {
                self.nodes.push(Some(node));
            }
        }
    }

    pub fn delete_at(&mut self, index: usize) {
        let mut target_index_option = None;
        for (iter_index, iter_item) in self.into_iter().enumerate() {
            if iter_index == index {
                target_index_option = iter_item.index;
                break;
            }
        }

        if let Some(target_index) = target_index_option {
            self.size -= 1;
            // 移出节点，留下None
            let del_node = self.nodes[target_index].take().unwrap();
            // 标记空位
            self.free_list.push(target_index);

            // 处理关联节点的引用关系
            if del_node.has_prev() && !del_node.has_next() {
                // 队尾情况：移动tail指向，清理tail node前一个节点的next指向None
                self.tail = del_node.get_prev();
                let prev_node = self.nodes[self.tail.unwrap()].as_mut().unwrap();
                prev_node.clean_next();
            }
            if !del_node.has_prev() && del_node.has_next() {
                // 队头情况
                self.head = del_node.get_next();
                let next_node = self.nodes[self.head.unwrap()].as_mut().unwrap();
                next_node.clean_prev();
            }
            if del_node.has_prev() && del_node.has_next() {
                // 中间情况
                let prev_index = del_node.get_prev().unwrap();
                let next_index = del_node.get_next().unwrap();

                // 前级节点指向后级节点
                let prev_node = self.nodes[prev_index].as_mut().unwrap();
                prev_node.set_next(next_index);
                // 后级节点指向前级节点
                let next_node = self.nodes[next_index].as_mut().unwrap();
                next_node.set_prev(prev_index);
            }
            // 单节点情况
            if !del_node.has_prev() && !del_node.has_next() {
                self.head = None;
                self.tail = None;
            }
        }
    }

    // 测试辅助方法
    pub fn size(&self) -> usize {
        self.size
    }

    pub fn head(&self) -> Option<usize> {
        self.head
    }

    pub fn tail(&self) -> Option<usize> {
        self.tail
    }

    pub fn free_list_len(&self) -> usize {
        self.free_list.len()
    }

    pub fn nodes_len(&self) -> usize {
        self.nodes.len()
    }

    pub fn nodes_capacity(&self) -> usize {
        self.nodes.capacity()
    }

    pub fn is_free_list_empty(&self) -> bool {
        self.free_list.is_empty()
    }
}

pub struct ListIter<'a> {
    nodes: &'a Vec<Option<Node>>,
    head: Option<&'a Node>,
    tail: Option<&'a Node>,
}

impl<'a> Iterator for ListIter<'a> {
    type Item = &'a Node;

    fn next(&mut self) -> Option<Self::Item> {
        if self.head.is_none() {
            return None;
        }
        let result = self.head.unwrap();

        if let Some(next_index) = result.get_next() {
            self.head = self.nodes[next_index].as_ref();
        } else {
            self.head = None;
        }
        return Some(result);
    }
}

impl<'a> IntoIterator for &'a LinkList {
    type IntoIter = ListIter<'a>;
    type Item = &'a Node;

    fn into_iter(self) -> Self::IntoIter {
        if self.head.is_none() {
            return Self::IntoIter {
                nodes: &self.nodes,
                head: None,
                tail: None,
            };
        }

        Self::IntoIter {
            nodes: &self.nodes,
            head: self.nodes[self.head.unwrap()].as_ref(),
            tail: self.nodes[self.tail.unwrap()].as_ref(),
        }
    }
}

impl<'a> DoubleEndedIterator for ListIter<'a> {
    fn next_back(&mut self) -> Option<Self::Item> {
        if self.tail.is_none() {
            return None;
        }
        let result = self.tail.unwrap();

        if let Some(next_index) = result.get_prev() {
            self.tail = self.nodes[next_index].as_ref();
        } else {
            self.tail = None;
        }
        Some(result)
    }
}
