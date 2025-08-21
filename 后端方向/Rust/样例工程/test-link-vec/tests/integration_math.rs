/// 数学模块的集成测试
/// 测试通过公共API使用数学功能的各种场景

use test_link_vec::math::{add, sub, add_vec, abs_sub};

#[test]
fn test_math_api_integration() {
    // 测试重新导出的函数
    assert_eq!(add(10, 5), 15);
    assert_eq!(sub(10, 5), 5);
    assert_eq!(add_vec(&[1, 2, 3]), 6);
    assert_eq!(abs_sub(3, 7), 4);
}

#[test]
fn test_calculator_simulation() {
    // 模拟一个简单的计算器使用场景
    struct Calculator {
        result: i32,
    }
    
    impl Calculator {
        fn new() -> Self {
            Self { result: 0 }
        }
        
        fn add(&mut self, value: i32) -> &mut Self {
            self.result = add(self.result, value);
            self
        }
        
        fn sub(&mut self, value: i32) -> &mut Self {
            self.result = sub(self.result, value);
            self
        }
        
        fn get_result(&self) -> i32 {
            self.result
        }
    }
    
    let mut calc = Calculator::new();
    let result = calc.add(10).sub(3).add(5).get_result();
    assert_eq!(result, 12); // 0 + 10 - 3 + 5 = 12
}

#[test]
fn test_real_world_scenario() {
    // 模拟真实应用场景：计算购物车总价
    let prices = vec![299, 199, 99, 49]; // 商品价格
    let total = add_vec(&prices);
    assert_eq!(total, 646);
    
    // 应用折扣
    let discount = 50;
    let final_price = sub(total, discount);
    assert_eq!(final_price, 596);
    
    // 计算找零（顾客支付700元）
    let payment = 700;
    let change = abs_sub(payment, final_price);
    assert_eq!(change, 104);
} 