#include <stdio.h>

int main() {


	//char arr[100] = "ab";

	//printf("%d\n", strlen (arr));
	//printf("%s\n", arr);
	
	//char arr[100] = "A\0b";
	/*arr[0] = 'a';
	arr[1] = 'b';*/

	//printf("%d \n",strlen(arr));
	//printf("%d \n",sizeof(arr));
	//printf("%s\n", arr);

	char dest[256];
	dest[0] = '/';
	dest[1] = 'p';
	dest[2] = 'r';
	dest[3] = 'o';
	dest[4] = 'c';
	dest[5] = '/';
	dest[6] = '\0';

	char arr1[] = "1234";
	for (int i = 0; i <= strlen(arr1); i++) {
		dest[6 + i] = arr1[i];
	}
	printf("1:%d\n", strlen(dest));
}