#include<iostream>

int main() {


    //ASCII的128个字符够了
    int w[128] = {0};
    char s[128] = {' '};

    //文件名，可通过传参打开不同文件
    char fileName[200] = "file3.txt";
    //打开文件
    FILE* fp;
    errno_t err = fopen_s(&fp, fileName, "r");
    if (fp == NULL) {
        perror("文件打开失败");
        return 0;
    }
    else {
        printf("文件打开成功\n");
    }


    while(1){
        char charGet = fgetc(fp);
        if (charGet == EOF)break;
        //字符对应的ASICC值来当作字符数组的序号
        s[charGet] = charGet;
        w[charGet]++;
    }


    printf("\n---------以下为排序前---------\n\n");
    for (int i = 0; i < 128; i++) {
        if (w[i] == 0)continue;
        else {

            if (s[i] == '\t')  printf("字符:\\t 频率:%d\n", w[i]);
            else if (s[i] == '\n')  printf("字符:\\n 频率:%d\n", w[i]);
            else if (s[i] == ' ')  printf("字符:空格 频率:%d\n", w[i]);
            else if (s[i] == '\r')  printf("字符:回车 频率:%d\n", w[i]);
            else printf("字符:%c 频率:%d\n", s[i], w[i]);
        }
    }


    //排序，把没有出现的字符在数组中删除。
    //w1和s1数组里面是频度从高到低排序
    int w1[128] = { 0 };
    char s1[128] = { ' ' };

    int w1order = 0;
    while (1) {
        int max = 0;
        int suffix = 0;
        for (int i = 0; i < 128; i++) {
            if (max < w[i]) {
                max = w[i];
                suffix = i;
            }
        }
        if (max == 0)break;
        w1[w1order] = w[suffix];
        s1[w1order] = s[suffix];
        
        w[suffix] = 0;
        s[suffix] = NULL;

        max = 0;
        suffix = 0;
        w1order++;

    }

   
    printf("\n\n\n---------以下为排序后---------\n\n\n");

    for (int i = 0; i < 128; i++) {
        if (w1[i] == 0)continue;
        else {

            if (s1[i] == '\t')  printf("字符:\\t 频率:%d\n", w1[i]);
            else if (s1[i] == '\n')  printf("字符:\\n 频率:%d\n", w1[i]);
            else if (s1[i] == ' ')  printf("字符:空格 频率:%d\n", w1[i]);
            else if (s1[i] == '\r')  printf("字符:回车 频率:%d\n", w1[i]);
            else printf("字符:%c 频率:%d\n", s1[i], w1[i]);
        }
    }




    fclose(fp);
    return 0;

    
}