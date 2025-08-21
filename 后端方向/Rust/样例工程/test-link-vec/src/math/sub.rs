/// 减法模块
/// 提供各种减法运算功能

/// 基本减法函数
pub fn sub(a: i32, b: i32) -> i32 {
    a - b
}

/// 绝对值减法函数：始终返回正数
pub fn abs_sub(a: i32, b: i32) -> i32 {
    (a - b).abs()
}

/// 安全减法：防止溢出
pub fn safe_sub(a: i32, b: i32) -> Option<i32> {
    a.checked_sub(b)
}

/// 向量减法：从第一个元素减去其余所有元素
pub fn sub_vec(vec: &[i32]) -> Option<i32> {
    if vec.is_empty() {
        return None;
    }
    
    let mut result = vec[0];
    for &value in &vec[1..] {
        result -= value;
    }
    Some(result)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_sub() {
        assert_eq!(sub(5, 3), 2);
        assert_eq!(sub(1, 5), -4);
        assert_eq!(sub(0, 0), 0);
    }

    #[test]
    fn test_abs_sub() {
        assert_eq!(abs_sub(5, 3), 2);
        assert_eq!(abs_sub(3, 5), 2);
        assert_eq!(abs_sub(0, 0), 0);
    }

    #[test]
    fn test_safe_sub() {
        assert_eq!(safe_sub(5, 3), Some(2));
        assert_eq!(safe_sub(i32::MIN, 1), None); // 溢出情况
    }

    #[test]
    fn test_sub_vec() {
        assert_eq!(sub_vec(&[10, 2, 3]), Some(5)); // 10 - 2 - 3 = 5
        assert_eq!(sub_vec(&[]), None);
        assert_eq!(sub_vec(&[5]), Some(5));
    }
} 