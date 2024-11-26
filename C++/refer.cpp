#include <iostream>
using namespace std;

int main(void){
    int n = 8;      /* 定义一个int变量 */
    int& refer = n;    /* 声明int引用rn, 初始化为变量n */
    cout << "n的值：" <<n << " \nrefer的值：" << refer;
    cout << "\n&n的值：" << &n;
    cout << "\n&refer的值：" << &refer;
    return 0;
}