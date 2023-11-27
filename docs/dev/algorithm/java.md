---
title: Java 算法刷题笔记
---

## 常用函数

有个印象，用到想到就行。

```java
// 位运算
// 与（&）、非（~）、或（|）、异或（^）
int c = m^n;
int count = 0;
while(c!=0){
  count+= c&1;
  c = c >>1;
}
// 合并 a,b -> r
// a = 11111111 
// b =          11111111
// r = 11111111 11111111
a<<8|b

// 进制转换
// 16 -> 10
Integer.parseInt("0xAA".substring(2), 16);
Integer.valueOf("FFFF", 16)
// 10 -> 16
Integer.toHexString(int i);
// 10 -> 8
Integer.toOctalString(int i);
// 10 -> 2
Integer.toBinaryString(int i);

// 字符统计（技巧：标准ASCII字符在0~127位上，统计时创建一个128大小的数组即可【我的意思是：不需要map！！！】）
// 0~9=48~57,A~Z=65~90,a~z=97~122 （没必要记）
new int[128]

// 字符串
StringBuffer strb = new StringBuffer(str).reverse(); // 反转
// 字符串 - 前补0
// 1 // for数字only
  String.format("%07d",321);  
// 2 - 不好 // for非数字
  // String.format("%4s", "AA").replace(" ","0") 
// 3 // 00000abc
  String str = "00000000" + "abc";
  str.substring(str.length() - 8);
// 字符串 - 后补0 
// 1 // 12300000
  (123 + "00000000").substring(0, 8);

// 正则
String[] s = str.split("[^a-zA-Z]");
// matches()方法：匹配整个区域。
// find()方法：包含
Pattern.compile("[a-z]").matcher("021Abc9000").find()

// 集合类
import java.util.*;
new HashSet<>(); // 去重
new BitSet(); // 去重，小空间开销
new LinkedHashMap<String,Integer>(); // key 按存入顺序存储

// 遍历
// 获取集合后8位
    int count=0;
    for (String key:data.keySet()){
        count++;
        if(count>(data.size()-8)){
            System.out.println(key+" "+data.get(key));
        }
    }
```

## 经典

### 表达式计算

<https://www.nowcoder.com/share/jump/1639986681701001743459> \
<https://www.nowcoder.com/practice/9999764a61484d819056f807d2a91f1e>

调用工具

::: details
```java
import java.util.Scanner;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
 
// 注意类名必须为 Main, 不要有任何 package xxx 信息
public class Main {
   //简单方法，暂定
    public static void main(String[] args) throws ScriptException {
        Scanner sc = new Scanner(System.in);
        // e.g. -1*(-1+3-2)/3+2
        String expression = sc.nextLine();
        ScriptEngineManager engineManager = new ScriptEngineManager();
        ScriptEngine js = engineManager.getEngineByName("js");
        String result = String.valueOf(js.eval(expression));
        if (result.contains(".")){
            String sub = result.substring(0, result.indexOf("."));
            System.out.println(sub);
        }else {
            System.out.println(result);
        }
    }
}
```
:::

较好的实现

::: details
```java
import java.util.Scanner;

class Stack {
    int[] data;
    int i = -1;
    public Stack(int size) {
        data = new int[size];
    }
    public void push(int v) {
        data[++i] = v;
    }
    public int pop() {
        return data[i--];
    }
    public int size() {
        return i + 1;
    }
}

// (7+5*4*3+6) 73

// 注意类名必须为 Main, 不要有任何 package xxx 信息
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        // 注意 hasNext 和 hasNextLine 的区别
        // while (in.hasNextInt()) { // 注意 while 处理多个 case
        //     int a = in.nextInt();
        //     int b = in.nextInt();
        //     System.out.println(a + b);
        // }

        System.out.println(js(in.nextLine()));

    }

    public static int js(String line) {
        Stack stack = new Stack(line.length());

        // 
        for(int i=0; i<line.length(); i++) {
            char c = line.charAt(i);
            //
            int flag = 1, flag2 = 0;
            if(c == '*') {
                flag2 = 1;
                i++; c = line.charAt(i);
            } else if(c == '/') {
                flag2 = -1;
                i++; c = line.charAt(i);
            }
            if (c == '+') {
                flag = 1;
                i++; c = line.charAt(i);
            } else if(c == '-') {
                flag = -1;
                i++; c = line.charAt(i);
            }
            
            //
            int num = 0;
            if(Character.isDigit(c)) {
                do {
                    num = (num*10 + c - '0');
                    i++;
                    if (line.length() > i && Character.isDigit(line.charAt(i))) {
                        c = line.charAt(i);
                    } else {
                        i--;
                        break;
                    }
                } while(true);
            } else if(c == '(') {
                int count = 1;
                int r = i;
                while(count != 0) {
                    i++;
                    if(line.charAt(i) == '(') count++;
                    else if(line.charAt(i) == ')') count --;
                }
                num = js(line.substring(r+1, i));
            }
            // 
            if(flag == 1) {
                
            } else if(flag == -1) {
                num *= -1;
            }
            if(flag2 == 1) {
                num = stack.pop() * num;
            } else if(flag2 == -1) {
                num = stack.pop() / num;
            }
            stack.push(num);
        }

        // 
        int sum = 0;
        while(stack.size()>0) {
            sum += stack.pop();
        }
        return sum;
    }
}
```
:::

最好的实现（不需要用栈，性能最佳，但是想不通就是想不到！）

::: details
```java
import java.io.IOException;
import java.io.InputStream;

public class Main{
    public static void main(String[] args) throws IOException {
        InputStream in = System.in;
        System.out.println(new ExprDemo().expr(in));
    }

    public static class ExprDemo {
        public char lastsign1 = 0, lastsign2 = 0;
        public int temp1 = 0, temp2 = 0;
        private static final char TEMPCHAR = 0;

        public int expr(InputStream in) throws IOException {
            int result = 0;
            char c;
            a: while((c = (char)in.read()) != '\n') {
                switch (c) {
                    case ')':
                    case ']':
                    case '}': break a;
                    case '(':
                    case '[':
                    case '{': temp2 = new ExprDemo().expr(in); break;
                    case '+':
                    case '-':
                        jisuan1(TEMPCHAR);
                        result = jisuan2(c, result);
                        break;
                    case '*':
                    case '/':
                        jisuan1(c);
                        break;
                    default: temp2 = temp2 * 10 + c - '0'; break;
                }
            }
            jisuan1(TEMPCHAR);
            result = jisuan2(TEMPCHAR, result);
            return result;
        }

        private void jisuan1(char c) {
            switch (lastsign2) {
                case 0: temp1 = temp2; break;
                case '*': temp1 *= temp2; break;
                case '/': temp1 /= temp2; break;
                default: break;
            }
            temp2 = 0;
            lastsign2 = c;
        }

        private int jisuan2(char c, int result) {
            switch (lastsign1) {
                case 0: result = temp1; break;
                case '-': result -= temp1; break;
                case '+': result += temp1; break;
                default: break;
            }
            temp1 = 0;
            lastsign1 = c;
            return result;
        }
    }
}
```
:::

我的（常规实现：双栈）【不是最简洁的，有非常大优化空间】

::: details
```java
import java.util.Scanner;

class Stack {
    Object[] data;;
    int index =-1;
    public Stack(int size) {
        data = new Object[size];
    }
    public void reverse() {
        for(int i=0; i<size()/2; i++) {
            Object t = data[i];
            int e = size()-1-i;
            data[i] = data[e];
            data[e] = t;
        }
    }
    public void clean() {
        index = -1;
    }
    public int size() {
        return index+1;
    }
    public boolean isEmpty() {
        return size()==0;
    }

    public void push(Object v) {
        index ++;
        data[index] = v;
    }
    public Object pop() {
        index --;
        return data[index+1];
    }
    public Object peek() {
        return data[index];
    }
}

// 注意类名必须为 Main, 不要有任何 package xxx 信息
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        // 注意 hasNext 和 hasNextLine 的区别
        // while (in.hasNextInt()) { // 注意 while 处理多个 case
        //     int a = in.nextInt();
        //     int b = in.nextInt();
        //     System.out.println(a + b);
        // }

        System.out.println(calc(in.nextLine()));

    }

// 3*5+8-0*3-6+0+0 17
// -1*(-1-1) 2

    public static int calc(String line) {

        Stack stack = new Stack(100);
        Stack xxx = new Stack(100); // 后缀

        // push 
        for (int i=0; i<line.length(); i++) {
            char c = line.charAt(i);
            if(Character.isDigit(c)) {
                int num = c - '0';
                for(int j=i+1; j<line.length(); j++) {
                    char c2 = line.charAt(j);
                    if(Character.isDigit(c2)) {
                        num = num*10 + (c2 -'0');
                    } else {
                        i = j-1;
                        break;
                    }
                }
                xxx.push(num);
            } else {
                switch (c) {
                    case '*':
                    case '/': stack.push(c); break;
                    case '(': 
                        if(line.charAt(i+1) == '-') {
                            xxx.push(0);
                        }
                        stack.push(c); 
                        break;
                    case ')': 
                        a: while(true) { // exception
                            Object c2 = stack.pop();
                            if(c2.equals('(')) {
                                break a;
                            } else {
                                xxx.push(c2);
                            }
                        }
                        break;
                    case '-':
                        if(xxx.isEmpty()) {
                            xxx.push(0);
                        }
                    case '+':
                        a: while(!stack.isEmpty()) {
                            Object c2 = stack.pop();
                            if(c2.equals('(')) {
                                stack.push(c2);
                                break a;
                            } else {
                                xxx.push(c2);
                            }
                        }
                        stack.push(c);
                        break;
                }
            }
        }
        while(!stack.isEmpty()) {
            xxx.push(stack.pop());
        }




        // calc
        xxx.reverse();
        stack.clean();
        while(!xxx.isEmpty()) {
            Object o = xxx.pop();
            if(o instanceof Integer) {
                stack.push(o);
            } else {
                Integer a = (Integer)stack.pop();
                Integer b = (Integer)stack.pop();
                if(o.equals('+')) {
                    stack.push(a + b);
                } else if(o.equals('-')) {
                    stack.push(b - a);
                } else if (o.equals('*')) {
                    stack.push(b * a);
                } else if (o.equals('/')) {
                    stack.push(b / a);
                } else {
                    throw new RuntimeException("??? "+o);
                }
            }
        }

        return (Integer)stack.pop();
    }
}
```
:::

![AE1736890A920A56B874763AA45BE62D.gif](https://s2.loli.net/2023/11/27/7K6k1dTCOiYE4lD.gif)
