#include<stdio.h>

int main() {

	int a = 3;
	int* a1 = &a;
	int b = *a1;

	printf("a=%d,b=%d\n", a, b);

	a = 4;
	printf("a=%d,b=%d\n", a, b);

	*a1 = 5;
	printf("a=%d,b=%d\n", a, b);
}