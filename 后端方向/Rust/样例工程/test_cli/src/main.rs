use std::{env, process};
use test_cli::Config;

fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::new(&args).unwrap_or_else(|err| {
        eprintln!("Problem parsing arguments: {}", err);
        process::exit(1);
    });

    if let Err(err) = test_cli::run(&config) {
        eprintln!("Application error: {}", err);
        process::exit(1);
    }
}
