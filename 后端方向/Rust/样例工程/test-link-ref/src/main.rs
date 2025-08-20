use test_link_ref::utils::*;

fn main() {
    let mut link_list = LinkList::new();

    link_list.push_front("我是第1个元素");
    link_list.push_back("我是第2个元素");
    link_list.push_back("我是第3个元素");

    println!("head: {:?}", link_list.head());
    println!("tail: {:?}", link_list.tail());
    println!("size: {}", link_list.length());

    link_list.insert_at(1, "我是插入的元素111");
    link_list.insert_at(1, "我是插入的元素11");
    link_list.insert_at(1, "我是插入的元素1");

    for node in &link_list {
        println!("正向迭代：{}", node.as_ref().borrow().value());
    }
    for node in link_list.revert_iter() {
        println!("逆向迭代：{}", node.as_ref().borrow().value());
    }

    // 删除中间元素
    link_list.delete_at(1);
    // 删除表头元素
    link_list.delete_at(0);
    // 删除表尾元素
    link_list.delete_at(link_list.length() - 1);

    println!("{link_list:#?}");
}
