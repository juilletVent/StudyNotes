use test_log_better::Post;

fn main() {
    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today");

    let post = post.request_review();

    let post = post.approve();

    let msg = post.content();

    println!("msg: {}", msg);
}
