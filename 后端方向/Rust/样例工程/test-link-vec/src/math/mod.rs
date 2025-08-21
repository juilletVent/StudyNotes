/// 数学运算模块
/// 包含加法、减法等基础运算功能

pub mod add;
pub mod sub;

// 重新导出常用函数，方便使用
pub use add::{add, add_vec};
pub use sub::{sub, abs_sub}; 