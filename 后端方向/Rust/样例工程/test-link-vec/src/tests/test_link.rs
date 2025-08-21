use crate::link::*;

// 原有的链表测试（保留现有的测试）
#[test]
fn test_new_empty_list() {
    let list = LinkList::new();
    assert!(list.head().is_none());
    assert!(list.tail().is_none());
    assert_eq!(list.size(), 0);
    assert!(list.is_free_list_empty());
    assert_eq!(list.nodes_len(), 0);
}

#[test]
fn test_new_with_size() {
    let list = LinkList::new_whit_size(10);
    assert!(list.head().is_none());
    assert!(list.tail().is_none());
    assert_eq!(list.size(), 0);
    assert!(list.is_free_list_empty());
    assert_eq!(list.nodes_capacity(), 10);
}

#[test]
fn test_node_creation() {
    let node = Node::new("test_data");
    assert_eq!(node.get_data(), "test_data");
    assert!(node.get_next().is_none());
    assert!(node.get_prev().is_none());
    assert!(!node.has_next());
    assert!(!node.has_prev());
}

#[test]
fn test_node_setters() {
    let mut node = Node::new("test");
    node.set_next(5);
    node.set_prev(3);

    assert_eq!(node.get_next(), Some(5));
    assert_eq!(node.get_prev(), Some(3));
    assert!(node.has_next());
    assert!(node.has_prev());

    node.clean_next();
    node.clean_prev();

    assert!(node.get_next().is_none());
    assert!(node.get_prev().is_none());
    assert!(!node.has_next());
    assert!(!node.has_prev());
}

#[test]
fn test_append_single_element() {
    let mut list = LinkList::new();
    list.append(Node::new("first"));

    assert_eq!(list.size(), 1);
    assert_eq!(list.head(), Some(0));
    assert_eq!(list.tail(), Some(0));

    // 验证链表内容
    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["first"]);
}

#[test]
fn test_append_multiple_elements() {
    let mut list = LinkList::new();
    list.append(Node::new("first"));
    list.append(Node::new("second"));
    list.append(Node::new("third"));

    assert_eq!(list.size(), 3);
    assert_eq!(list.head(), Some(0));
    assert_eq!(list.tail(), Some(2));

    // 验证链表顺序
    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["first", "second", "third"]);
}

#[test]
fn test_prepend_single_element() {
    let mut list = LinkList::new();
    list.prepend(Node::new("first"));

    assert_eq!(list.size(), 1);
    assert_eq!(list.head(), Some(0));
    assert_eq!(list.tail(), Some(0));

    // 验证链表内容
    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["first"]);
}

#[test]
fn test_prepend_multiple_elements() {
    let mut list = LinkList::new();
    list.prepend(Node::new("third"));
    list.prepend(Node::new("second"));
    list.prepend(Node::new("first"));

    assert_eq!(list.size(), 3);
    assert_eq!(list.head(), Some(2));
    assert_eq!(list.tail(), Some(0));

    // 验证链表顺序
    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["first", "second", "third"]);
}

#[test]
fn test_mixed_append_prepend() {
    let mut list = LinkList::new();
    list.append(Node::new("middle"));
    list.prepend(Node::new("first"));
    list.append(Node::new("last"));
    list.prepend(Node::new("head"));

    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["head", "first", "middle", "last"]);
    assert_eq!(list.size(), 4);
}

#[test]
fn test_insert_at_negative_index() {
    let mut list = LinkList::new();
    list.append(Node::new("second"));
    list.insert_at(-1, Node::new("first"));

    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["first", "second"]);
}

#[test]
fn test_insert_at_large_index() {
    let mut list = LinkList::new();
    list.append(Node::new("first"));
    list.insert_at(100, Node::new("second"));

    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["first", "second"]);
}

#[test]
fn test_insert_at_middle() {
    let mut list = LinkList::new();
    list.append(Node::new("first"));
    list.append(Node::new("third"));
    list.insert_at(1, Node::new("second"));

    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["first", "second", "third"]);
    assert_eq!(list.size(), 3);
}

#[test]
fn test_delete_at_single_element() {
    let mut list = LinkList::new();
    list.append(Node::new("only"));
    list.delete_at(0);

    assert_eq!(list.size(), 0);
    assert!(list.head().is_none());
    assert!(list.tail().is_none());
    assert_eq!(list.free_list_len(), 1);
}

#[test]
fn test_delete_at_head() {
    let mut list = LinkList::new();
    list.append(Node::new("first"));
    list.append(Node::new("second"));
    list.append(Node::new("third"));

    list.delete_at(0);

    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["second", "third"]);
    assert_eq!(list.size(), 2);
}

#[test]
fn test_delete_at_tail() {
    let mut list = LinkList::new();
    list.append(Node::new("first"));
    list.append(Node::new("second"));
    list.append(Node::new("third"));

    list.delete_at(2);

    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["first", "second"]);
    assert_eq!(list.size(), 2);
}

#[test]
fn test_delete_at_middle() {
    let mut list = LinkList::new();
    list.append(Node::new("first"));
    list.append(Node::new("second"));
    list.append(Node::new("third"));

    list.delete_at(1);

    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["first", "third"]);
    assert_eq!(list.size(), 2);
}

#[test]
fn test_delete_invalid_index() {
    let mut list = LinkList::new();
    list.append(Node::new("first"));

    let original_size = list.size();
    list.delete_at(10); // 无效索引

    assert_eq!(list.size(), original_size);
    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["first"]);
}

#[test]
fn test_free_list_reuse() {
    let mut list = LinkList::new();

    // 添加元素
    list.append(Node::new("first"));
    list.append(Node::new("second"));
    list.append(Node::new("third"));

    // 删除中间元素，产生空位
    list.delete_at(1);
    assert_eq!(list.free_list_len(), 1);

    // 再添加元素，应该重用空位
    list.append(Node::new("fourth"));
    assert_eq!(list.free_list_len(), 0);

    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["first", "third", "fourth"]);
}

#[test]
fn test_forward_iteration() {
    let mut list = LinkList::new();
    list.append(Node::new("1"));
    list.append(Node::new("2"));
    list.append(Node::new("3"));

    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["1", "2", "3"]);
}

#[test]
fn test_backward_iteration() {
    let mut list = LinkList::new();
    list.append(Node::new("1"));
    list.append(Node::new("2"));
    list.append(Node::new("3"));

    let items: Vec<_> = list.into_iter().rev().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["3", "2", "1"]);
}

#[test]
fn test_empty_list_iteration() {
    let list = LinkList::new();

    let forward_items: Vec<_> = list.into_iter().collect();
    assert!(forward_items.is_empty());

    let backward_items: Vec<_> = list.into_iter().rev().collect();
    assert!(backward_items.is_empty());
}

#[test]
fn test_single_element_iteration() {
    let mut list = LinkList::new();
    list.append(Node::new("only"));

    let forward_items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(forward_items, vec!["only"]);

    let backward_items: Vec<_> = list.into_iter().rev().map(|n| n.get_data()).collect();
    assert_eq!(backward_items, vec!["only"]);
}

#[test]
fn test_complex_operations() {
    let mut list = LinkList::new();

    // 构建初始链表 Z -> A -> B -> C
    list.append(Node::new("A"));
    list.append(Node::new("B"));
    list.append(Node::new("C"));
    list.prepend(Node::new("Z"));

    // 删除一些元素 Z -> C
    list.delete_at(1); // 删除 "A"
    list.delete_at(1); // 删除 "B"

    // 插入新元素 Y -> Z -> X -> C
    list.insert_at(1, Node::new("X"));
    list.insert_at(0, Node::new("Y"));

    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["Y", "Z", "X", "C"]);
    assert_eq!(list.size(), 4);
}

#[test]
fn test_stress_operations() {
    let mut list = LinkList::new();

    // 大量插入操作
    for i in 0..100 {
        list.append(Node::new(&format!("item_{}", i)));
    }
    assert_eq!(list.size(), 100);

    // 删除一半元素
    for i in (0..50).rev() {
        list.delete_at(i * 2);
    }
    assert_eq!(list.size(), 50);

    // 验证剩余元素
    let items: Vec<_> = list.into_iter().map(|n| n.get_data().to_string()).collect();
    for (i, item) in items.iter().enumerate() {
        assert_eq!(*item, format!("item_{}", i * 2 + 1));
    }
}

#[test]
fn test_multiple_iterations() {
    let mut list = LinkList::new();
    list.append(Node::new("1"));
    list.append(Node::new("2"));
    list.append(Node::new("3"));

    // 多次迭代应该产生相同结果
    for _ in 0..3 {
        let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
        assert_eq!(items, vec!["1", "2", "3"]);
    }
}

#[test]
fn test_iterator_after_modifications() {
    let mut list = LinkList::new();
    list.append(Node::new("A"));
    list.append(Node::new("B"));
    list.append(Node::new("C"));

    // 修改后迭代
    list.delete_at(1);
    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["A", "C"]);

    list.insert_at(1, Node::new("X"));
    let items: Vec<_> = list.into_iter().map(|n| n.get_data()).collect();
    assert_eq!(items, vec!["A", "X", "C"]);
}
