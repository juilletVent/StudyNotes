/// 加法模块
/// 提供各种加法运算功能

/// 基本加法函数
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

/// 向量加法函数
pub fn add_vec(vec: &[i32]) -> i32 {
    vec.iter().sum()
}

/// 浮点数加法函数
pub fn add_f64(a: f64, b: f64) -> f64 {
    a + b
}

/// 条件加法：只有当两个数都是正数时才相加
pub fn conditional_add(a: i32, b: i32) -> Option<i32> {
    if a > 0 && b > 0 {
        Some(a + b)
    } else {
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_add() {
        assert_eq!(add(2, 3), 5);
        assert_eq!(add(-1, 1), 0);
        assert_eq!(add(0, 0), 0);
    }

    #[test]
    fn test_add_vec() {
        assert_eq!(add_vec(&[1, 2, 3, 4]), 10);
        assert_eq!(add_vec(&[]), 0);
        assert_eq!(add_vec(&[-1, 1]), 0);
    }

    #[test]
    fn test_add_f64() {
        assert!((add_f64(1.5, 2.5) - 4.0).abs() < f64::EPSILON);
    }

    #[test]
    fn test_conditional_add() {
        assert_eq!(conditional_add(1, 2), Some(3));
        assert_eq!(conditional_add(-1, 2), None);
        assert_eq!(conditional_add(0, 1), None);
    }
} 