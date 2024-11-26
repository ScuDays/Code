#include<stdio.h>
int main(){
    int b = 0xcc;
    int c = !b;
    int d = ~b;
    printf("b:%p\nc:%p\nd:%p",b,c,d);
}