#[cfg(test)]
use crate::math::add::*;

#[test]
fn test_add_comprehensive() {
    // 基本测试
    assert_eq!(add(2, 3), 5);
    assert_eq!(add(-1, 1), 0);
    assert_eq!(add(0, 0), 0);
    
    // 边界值测试
    assert_eq!(add(i32::MAX, 0), i32::MAX);
    assert_eq!(add(i32::MIN, 0), i32::MIN);
}

#[test]
fn test_add_vec_comprehensive() {
    // 正常情况
    assert_eq!(add_vec(&[1, 2, 3, 4]), 10);
    assert_eq!(add_vec(&[]), 0);
    assert_eq!(add_vec(&[-1, 1]), 0);
    
    // 大数组测试
    let large_vec: Vec<i32> = (1..=100).collect();
    assert_eq!(add_vec(&large_vec), 5050); // 1+2+...+100 = 5050
}

#[test]
fn test_add_f64_precision() {
    assert!((add_f64(1.5, 2.5) - 4.0).abs() < f64::EPSILON);
    assert!((add_f64(0.1, 0.2) - 0.3).abs() < f64::EPSILON);
}

#[test]
fn test_conditional_add_edge_cases() {
    // 正数情况
    assert_eq!(conditional_add(1, 2), Some(3));
    assert_eq!(conditional_add(100, 200), Some(300));
    
    // 包含非正数的情况
    assert_eq!(conditional_add(-1, 2), None);
    assert_eq!(conditional_add(0, 1), None);
    assert_eq!(conditional_add(-5, -3), None);
} 