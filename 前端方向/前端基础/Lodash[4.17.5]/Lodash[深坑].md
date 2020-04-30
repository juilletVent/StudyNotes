<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-10-09 17:24:32
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-10-09 17:24:32
 * @Description: Nothing
 -->
# Lodash 深坑表

- [匪夷所思的 isEmpty](##匪夷所思的IsEmpty)

## 匪夷所思的 isEmpty

印象之中 isEmpty 在元素为一下值之中的某一个时应该返回 true 才对：

    null undefined NaN ''(字符空串) 0 {}(空对象) 空集合 空映射 空数组

而且他类型的值则应该返回 false 才对，but，isEmpty 在一下情况下也会返回 true，一定要小心别被坑了：

    # 任意数字
    isEmpty(25425) => true
    # 函数
    isEmpty(()=>{}) => true

综上，不要用 isEmpty 去判断一个数值类型或者函数类型的变量，因为他们始终被认为是空值
