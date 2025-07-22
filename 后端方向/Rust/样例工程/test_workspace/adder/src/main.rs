use add_one::add_one;
use add_two::add_two;

fn main() {
    let x = add_one(1);
    println!("x + 1 = {}", x);

    let x = add_two(x);
    println!("x + 2 = {}", x);
}
