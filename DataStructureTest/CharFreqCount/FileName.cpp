#include<iostream>

int main() {


    //ASCII��128���ַ�����
    int w[128] = {0};
    char s[128] = {' '};

    //�ļ�������ͨ�����δ򿪲�ͬ�ļ�
    char fileName[200] = "file3.txt";
    //���ļ�
    FILE* fp;
    errno_t err = fopen_s(&fp, fileName, "r");
    if (fp == NULL) {
        perror("�ļ���ʧ��");
        return 0;
    }
    else {
        printf("�ļ��򿪳ɹ�\n");
    }


    while(1){
        char charGet = fgetc(fp);
        if (charGet == EOF)break;
        //�ַ���Ӧ��ASICCֵ�������ַ���������
        s[charGet] = charGet;
        w[charGet]++;
    }


    printf("\n---------����Ϊ����ǰ---------\n\n");
    for (int i = 0; i < 128; i++) {
        if (w[i] == 0)continue;
        else {

            if (s[i] == '\t')  printf("�ַ�:\\t Ƶ��:%d\n", w[i]);
            else if (s[i] == '\n')  printf("�ַ�:\\n Ƶ��:%d\n", w[i]);
            else if (s[i] == ' ')  printf("�ַ�:�ո� Ƶ��:%d\n", w[i]);
            else if (s[i] == '\r')  printf("�ַ�:�س� Ƶ��:%d\n", w[i]);
            else printf("�ַ�:%c Ƶ��:%d\n", s[i], w[i]);
        }
    }


    //���򣬰�û�г��ֵ��ַ���������ɾ����
    //w1��s1����������Ƶ�ȴӸߵ�������
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

   
    printf("\n\n\n---------����Ϊ�����---------\n\n\n");

    for (int i = 0; i < 128; i++) {
        if (w1[i] == 0)continue;
        else {

            if (s1[i] == '\t')  printf("�ַ�:\\t Ƶ��:%d\n", w1[i]);
            else if (s1[i] == '\n')  printf("�ַ�:\\n Ƶ��:%d\n", w1[i]);
            else if (s1[i] == ' ')  printf("�ַ�:�ո� Ƶ��:%d\n", w1[i]);
            else if (s1[i] == '\r')  printf("�ַ�:�س� Ƶ��:%d\n", w1[i]);
            else printf("�ַ�:%c Ƶ��:%d\n", s1[i], w1[i]);
        }
    }




    fclose(fp);
    return 0;

    
}