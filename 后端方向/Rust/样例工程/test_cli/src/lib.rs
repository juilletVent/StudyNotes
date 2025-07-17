use std::error::Error;
use std::{env, fs};

pub struct Config {
    // 搜索的目标字符串
    pub query: String,
    // 搜索的文件名称
    pub filename: String,
    // 忽略大小写差异
    pub case_insensitive: bool,
}
impl Config {
    pub fn new(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("Not enough arguments");
        }

        let query = args[1].clone();
        let filename = args[2].clone();
        let mut case_insensitive = env::var("CASE_INSENSITIVE").is_ok();

        if args.contains(&"--case-insensitive".to_string()) {
            case_insensitive = true
        }

        Result::Ok(Config {
            query,
            filename,
            case_insensitive,
        })
    }
}

pub fn run(config: &Config) -> Result<(), Box<dyn Error>> {
    let file_content = fs::read_to_string(&config.filename)?; //.expect("Failed to read file");

    let results = if config.case_insensitive {
        search_case_insensitive(&config.query, &file_content)
    } else {
        search(&config.query, &file_content)
    };

    for line in results {
        println!("{}", line)
    }

    Ok(())
}

pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut target_lines = Vec::new();

    for line in contents.lines() {
        if line.contains(query) {
            target_lines.push(line);
        }
    }

    target_lines
}

pub fn search_case_insensitive<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut target_lines = Vec::new();

    let query = query.to_lowercase();

    // 不能在此处直接将contents转换为为小写然后再切分行
    // 先转为小写的话会创建临时变量，此时lines调用将作用在临时变量上，产生的line切片也是临时变量
    // 在离开作用域时临时变量与引用均会释放，从而导致target_lines的内部引用成为悬垂引用
    for line in contents.lines() {
        if line.to_lowercase().contains(&query) {
            target_lines.push(line);
        }
    }

    target_lines
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case_sensitive() {
        let query = "duct";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.";

        assert_eq!(
            search(query, contents),
            vec!["safe, fast, productive."],
            "基础搜索测试，目标文本：{}",
            query
        );
    }

    #[test]
    fn case_insensitive() {
        let query = "rUsT";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.
Trust me.";

        assert_eq!(
            search_case_insensitive(query, contents),
            vec!["Rust:", "Trust me."],
            "忽略大小写测试案例失败，目标搜索文本：{}",
            query
        )
    }
}
