#[cfg(test)]
use crate::math::sub::*;

#[test]
fn test_sub_comprehensive() {
    // 基本测试
    assert_eq!(sub(5, 3), 2);
    assert_eq!(sub(1, 5), -4);
    assert_eq!(sub(0, 0), 0);
    
    // 边界值测试
    assert_eq!(sub(i32::MAX, 1), i32::MAX - 1);
    assert_eq!(sub(i32::MIN, -1), i32::MIN + 1);
}

#[test]
fn test_abs_sub_comprehensive() {
    // 基本测试
    assert_eq!(abs_sub(5, 3), 2);
    assert_eq!(abs_sub(3, 5), 2);
    assert_eq!(abs_sub(0, 0), 0);
    
    // 负数测试
    assert_eq!(abs_sub(-10, -5), 5);
    assert_eq!(abs_sub(-5, -10), 5);
}

#[test]
fn test_safe_sub_overflow() {
    // 正常情况
    assert_eq!(safe_sub(5, 3), Some(2));
    assert_eq!(safe_sub(0, 5), Some(-5));
    
    // 溢出情况
    assert_eq!(safe_sub(i32::MIN, 1), None);
    assert_eq!(safe_sub(i32::MIN, i32::MAX), None);
}

#[test]
fn test_sub_vec_various_cases() {
    // 正常情况
    assert_eq!(sub_vec(&[10, 2, 3]), Some(5)); // 10 - 2 - 3 = 5
    assert_eq!(sub_vec(&[100, 30, 20, 10]), Some(40)); // 100 - 30 - 20 - 10 = 40
    
    // 边界情况
    assert_eq!(sub_vec(&[]), None);
    assert_eq!(sub_vec(&[5]), Some(5));
    assert_eq!(sub_vec(&[0, 0, 0]), Some(0));
} 