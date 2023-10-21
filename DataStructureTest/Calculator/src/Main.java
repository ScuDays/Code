import java.util.Scanner;
import java.util.Stack;

import static java.lang.Math.pow;

// 按两次 Shift 打开“随处搜索”对话框并输入 `show whitespaces`，
// 然后按 Enter 键。现在，您可以在代码中看到空格字符。

public class Main {
    //符号栈和数字栈
    static Stack<Character> symbolStack = new Stack<Character>();
    static Stack<Double> numberStack = new Stack<Double>();

    //三位缓存来判断负数的情况，"（—3 " 和 "_-3 " 这两种情况。
    static char previousOne = ' ';
    static char previousTwo = ' ';
    static char previousThree = ' ';
    static int cache;
    static int max;
    static int getOrder = 0;
    static String input;
    public static void main(String[] args) {
            max = 0;
            //输入表达式
            Scanner scanner = new Scanner(System.in);
            input = scanner.next();
            //判断非法表达式
            //System.out.println(input);
            if (!isIllegal(input)) System.out.println("非法表达式");
            //开始计算
            algorithm();
            //打印答案
            char previousOne = ' ';
            char previousTwo = ' ';
            char previousThree = ' ';
            cache = 0 ;
            max = 0;
            getOrder = 0;

    }
    //判断是否是负数
    public static boolean isNegative(){
        //处理正负,负数只有两种情况，1：开头直接负号加数字。2：前括号加负号加数字
        if(previousTwo == '-' && isDight(previousOne)){
            if(previousThree == ' ' || previousThree == '(')
               return true;
            else{
                return false;
            }
        }
        return false;
    }
    public static void getNextNumber(){
    while(true) {
        while (cache < 3) {
            if(isDight(previousOne))break;
            else {
                getNextChar();
                if(isDight(previousOne))break;
                else if(previousOne == '='){
                    getNextOperator(previousTwo);
                    return;
                }
                else cache++;
            }
        }
         if(cache == 3){
             getNextOperator(previousThree);
             cache --;
            }
        if(isDight(previousOne))break;
    }
        boolean isNegative = isNegative();
        if(isNegative == false){
            if(cache == 2){
            getNextOperator(previousThree);
            getNextOperator(previousTwo);
            }
            else if(cache == 1){
                getNextOperator(previousTwo);
            }
        }
        //处理整数部分
        double finalNum = 0 ;
        while(true){
            int sum = (int)previousOne - (int)'0';
            finalNum = finalNum * 10 + sum;
            getNextChar();
            if(!isDight(previousOne)){
                break;
            }
        }
        //处理小数部分
        if(previousOne == '.') {
            double decNum = 0;
            int cycle = 0;
            getNextChar();
            while (true) {
                double sum = (int) previousOne - (int) '0';
                decNum = decNum * 10 + sum;
                cycle++;
                getNextChar();
                if (!isDight(previousOne)) {
                    cache++;
                    break;
                }
            }
            finalNum = finalNum + (decNum / (pow(10, cycle)));
        }
        //处理正负
        if(isNegative == true)finalNum = finalNum * (-1);
        //消除后括号影响
        if(isNegative == true && previousOne == ')' ) {
            getNextChar();
        }
        numberStack.push(finalNum);
        cache = 1;
    }
    public static void getNextOperator(char previous){
        boolean isOperator = isOperator(previous);
        if(isOperator) {
            int a = standardOutside(previous);
            if(symbolStack.empty()){
                symbolStack.push(previous);
                cache--;
            }
            else if (a > standardInside(symbolStack.peek())) {
                symbolStack.push(previous);
                cache--;
            }

            else {
                    calculate(previous);
                }
            }
        }
    public static char getNextChar(){
        if(getOrder >= input.length()) return ' ';
        else{
            previousThree = previousTwo;
            previousTwo = previousOne;
            previousOne = input.charAt(getOrder ++);
            return  previousOne;
        }
    }
    public static void algorithm() {
        do {
            getNextNumber();
        }while(previousOne != '=');
        calculate(previousOne);
        //while(!numberStack.empty()){
            System.out.println(numberStack.pop());
//        while(!symbolStack.empty()){
//            System.out.println(symbolStack.pop());}
    }
    public static void calculate(char previous){
        int nowPriority = standardOutside(previous);

        while(nowPriority < standardInside(symbolStack.peek())) {
            double backNumber = numberStack.pop();
            double frontNumber = numberStack.pop();
            char symbol = symbolStack.pop();
            double out = 0;
            if (symbol == '+') out = frontNumber + backNumber;
            else if (symbol == '-') out = frontNumber - backNumber;
            else if (symbol == '*') out = frontNumber * backNumber;
            else if (symbol == '/') out = frontNumber / backNumber;
            else if (symbol == '^') out = pow(frontNumber, backNumber);
            else if (symbol == '%') out = frontNumber % backNumber;
            else if (symbol == '&') out = pow(frontNumber, (1/backNumber));
            numberStack.push(out);
            if (symbolStack.empty())break;
        }

        if(previous == ')'){
            symbolStack.pop();
            cache--;
        }
        else {
            symbolStack.push(previous);
            cache--;
        }

    }
    //判断是否为数字
    public static boolean isDight(char ch){
        if(ch >= '0' && ch <= '9')return true;
        return false;
    }
    //判断是否为操作符
    public static boolean isOperator(char ch){
        if(ch == '.' || ch == '&' || ch == '^' || ch == '%' || ch == '(' || ch == ')' || ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '=' )
            return true;
        return false;
    }
    public static boolean isIllegal(String input){
        for(int i = 0; i < input.length(); i++){
            if(! ( isDight(input.charAt(i) )|| isOperator(input.charAt(i) ) ) )
                return false;
        }
        return true;
    }

    public static int standardOutside(char symbol) {
        if(symbol == ')') return 1;
        else if(symbol == '+' || symbol == '-' ) return 2;
        else if(symbol == '*' || symbol == '/' || symbol == '%') return 4;
        else if(symbol == '^' || symbol == '&') return 6;
        else if (symbol == '(') return 8;
        else if (symbol == '=') return 0;
        else return -1;
    }
    public static int standardInside(char symbol) {
        if(symbol == ')') return 8;
        else if(symbol == '+' || symbol == '-' ) return 3;
        else if(symbol == '*' || symbol == '/' || symbol == '%') return 5;
        else if(symbol == '^' || symbol == '&') return 7;
        else if (symbol == '(') return 1;
        else if (symbol == '=') return 0;
        else return -1;
    }
}