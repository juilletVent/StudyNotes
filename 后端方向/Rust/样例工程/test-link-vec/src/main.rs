use std::i32;

use test_link_vec::link::*;

fn main() {
    let mut list = LinkList::new();

    list.append(Node::new("link-3"));
    list.append(Node::new("link-4"));
    list.append(Node::new("link-5"));
    list.prepend(Node::new("link-2"));
    list.prepend(Node::new("link-1"));
    list.prepend(Node::new("link-0"));

    println!("============== 正向迭代 ==============");
    for iter_item in &list {
        println!("{}", iter_item.get_data());
    }

    println!("============== 逆向迭代 ==============");
    for iter_item in list.into_iter().rev() {
        println!("{}", iter_item.get_data());
    }

    list.delete_at(3);
    list.delete_at(1);

    println!("============== 删除后正向迭代 ==============");
    for iter_item in &list {
        println!("{}", iter_item.get_data());
    }
    println!("============== 删除后逆向迭代 ==============");
    for iter_item in list.into_iter().rev() {
        println!("{}", iter_item.get_data());
    }

    list.insert_at(1, Node::new("link-1"));
    list.insert_at(3, Node::new("link-3"));
    list.insert_at(3, Node::new("middle-insert"));

    list.insert_at(i32::MIN, Node::new("head-insert"));
    list.insert_at(i32::MAX, Node::new("tail-insert"));

    println!("============== 重新添加后正向迭代 ==============");
    for iter_item in &list {
        println!("{}", iter_item.get_data());
    }

    println!("============== 重新添加后逆向迭代 ==============");
    for iter_item in list.into_iter().rev() {
        println!("{}", iter_item.get_data());
    }
    println!("============== 数据结构 ==============");
    println!("{list:#?}")
}
