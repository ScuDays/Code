#define _CRT_SECURE_NO_WARNINGS
#define _CRT_SECURE_NO_WARNINGS 1
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <windows.h>
#include <math.h>
#include <stdio.h>

	int main() {
		int a = 3;
		void* b = &a;
		printf("%d",(int *)b);
	
	}