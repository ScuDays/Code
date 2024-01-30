#include <iostream>

int data[] = { 1, 2, 1, 2, 3, 2 };
int last;
int Now;

void handling() {
    for (int i = 0; i < sizeof(data) / sizeof(data[0]); i++) {
        // 模拟一次读取
        Now = data[i];
        if (Now == 3) {
            if (last == 1) std::cout << "2 ";
            if (last == 2) std::cout << "12 ";
        }
        else if (last == 3) {
            if (Now == 2) std::cout << "12 ";
        }
        else std::cout << Now << " ";
        
        last = Now;
    }
}
int main() {
    handling();
    return 0;
}