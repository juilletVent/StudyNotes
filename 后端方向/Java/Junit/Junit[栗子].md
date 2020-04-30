## Junit 完整示例

> 待测试类：

```
package cn.nanami52.unittest;

public class Calculator {
    private static int result; //静态变量，用于存储运行结果

    public void add(int n) {
        result = result + n;
    }

    public void substract(int n) {
        result = result - n; //Bug:正确的应该是result=result-n
    }

    public void multiply(int n) {
        this.result *= n;
    }//此方法尚未写好

    public void divide(int n) throws Exception {
        if (n == 0)
            throw new Exception("除数不能为0");
        result = result / n;
    }

    public void square(int n) {
        result = n * n;
    }

    public void squareRoot(int n) {
        this.result = (int) Math.sqrt(n);        //Bug:死循环
    }

    public void clear() {  //将结果清零
        result = 0;
    }

    public static int getResult() {
        return result;
    }
}
```

> 单元测试用例

```
package cn.nanami52.unittest;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import static org.junit.Assert.*;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class CalculatorTest {

    public static Calculator calc = new Calculator();

    @Test
    public void a_add() {
        this.calc.add(5);
        assertEquals(5, this.calc.getResult());
    }

    @Test
    public void b_substract() {
        this.calc.substract(2);
        assertEquals(3, this.calc.getResult());
    }

    @Test
    public void c_multiply() {
        this.calc.multiply(2);
        assertEquals(6, this.calc.getResult());
    }

    @Test(expected = Exception.class)
    public void d_divide() throws Exception {
        this.calc.divide(0);
    }

    @Test
    public void d_divide2() throws Exception {
        this.calc.divide(2);
        assertEquals(3, this.calc.getResult());
    }

    @Test
    public void e_square() {
        this.calc.square(3);
        assertEquals(9, this.calc.getResult());
    }

    @Test
    public void f_squareRoot() {
        this.calc.squareRoot(9);
        assertEquals(3, this.calc.getResult());
    }

    @Test
    public void g_clear() {
        this.calc.clear();
        assertEquals(0, this.calc.getResult());
    }
}
```
