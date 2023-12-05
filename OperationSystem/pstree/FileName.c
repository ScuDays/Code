#include <stdio.h>
#include <assert.h>
#include <sys/types.h>
#include <unistd.h>
#include <dirent.h>
#include <sys/stat.h>
#include <stdlib.h>
#include <string.h>

struct tree;
struct dynArr
{
    // K叉树
    struct tree* data;
    // 已存数量
    size_t size;
    // 总容量
    size_t capacity;
};

struct tree
{
    int Pid;
    int PPid;
    struct dynArr* subtree;
};
// 数组扩容
void dynArr_Resize(struct dynArr* arr)
{
    arr->capacity = arr->capacity * 2;
    struct tree* new_data = (struct tree*)realloc(arr->data, arr->capacity * sizeof(struct tree));

    if (new_data == NULL)
    {
        // 扩容失败，抛出异常或者处理错误
        printf("Out of memory.\n");
    }
    arr->data = new_data;
}
// 数组插入元素
void dynArr_Insert(struct dynArr* arr, struct tree* treeInsert)
{
    if (arr->capacity <= arr->size)
    {
        dynArr_Resize(arr);
    }
    arr->data[arr->size] = *treeInsert;
    arr->size++;
}
// 初始化一个dynArr结构体
struct dynArr* dynArr_Create()
{
    struct dynArr* Arr = (struct dynArr*)malloc(sizeof(struct dynArr));
    Arr->data = (struct tree*)malloc(5 * sizeof(struct tree));
    Arr->size = 0;
    Arr->capacity = 5;
    return Arr;
}
// 初始化一个一个树结点
struct tree* tree_Create(int Pid, int PPid)
{
    struct tree* Tree = (struct tree*)malloc(sizeof(struct tree));
    if (Tree == NULL)
    {
        perror("cuowu");
        return NULL;
    }
    // 为什么不加头文件就会错误????
    Tree->Pid = Pid;
    Tree->PPid = PPid;
    Tree->subtree = dynArr_Create();
    return Tree;
}
// 保证打印规范
int GetPidLong(int number)
{
    int a = 1;
    do
    {
        a++;
        number = number / 10;
    } while (number >= 10);
    return a;
}
// 遍历打印整棵树，但是还不够规范
void traverse(struct tree* Tree, int lastGrade)
{
    printf("%d", Tree->Pid);
    if (Tree->subtree->size == 0)
        return;

    int grade = lastGrade;
    printf("-+-");
    grade += 2;
    grade += GetPidLong(Tree->Pid);

    for (int i = 0; i < Tree->subtree->size; i++)
    {
        // printf("-");
        traverse(&Tree->subtree->data[i], grade);
        printf("\n");
        for (int i = 0; i < grade; i++)
        {
            printf(" ");
        }
        // printf("|");
    }
}

// 寻找Pid为某个值的树节点
struct tree* GetTree(struct tree* FindTree, int Pid)
{
    if (Pid == FindTree->Pid)
        return FindTree;
    else
    {
        struct tree* find = NULL;
        for (int i = 0; i < FindTree->subtree->size; i++)
        {
            find = GetTree(&FindTree->subtree->data[i], Pid);
            if (find == NULL)
                continue;
            if (find->Pid == Pid)
                return find;
        }
    }
    return NULL;
}
// 把往树里面添加的操作打包成一个函数便于操作
void AutoAdd(struct tree* FindTree, int Pid, int PPid)
{

    struct tree* a = GetTree(FindTree, PPid);
    dynArr_Insert(a->subtree, tree_Create(Pid, PPid));
}
int main(int argc, char* argv[])
{
    DIR* dir;     // 第一层目录/proc
    DIR* dirNext; // 第一层目录/proc/数字
    struct dirent* entry;
    struct dirent* entryNext;
    struct tree atree = *tree_Create(0, 0);
    struct tree* rootTree = &atree;

    // 目录源是"/proc"
    dir = opendir("/proc");
    if (dir == NULL)
    {
        perror("opendir");
        return 1;
    }

    // 遍历每一个文件名为数字的文件夹，Linux哲学"一切皆文件"，每个进程都是一个文件
    // 先循环第一层 /proc/
    while ((entry = readdir(dir)) != NULL)
    {
        if (entry->d_name[0] < '0' || entry->d_name[0] > '9')
            continue;
        // printf("目录：%s\n", entry->d_name);
        char dest[256];
        dest[0] = '/';
        dest[1] = 'p';
        dest[2] = 'r';
        dest[3] = 'o';
        dest[4] = 'c';
        dest[5] = '/';
        // /proc/+数字
        for (int i = 0; i <= strlen(entry->d_name); i++)
        {
            dest[6 + i] = entry->d_name[i];
        }
        dirNext = opendir(dest);
        if (dirNext == NULL)
        {
            continue;
        }
        // else{
        //      printf("%s",entry->d_name);
        // }
        char destCopy[256];
        for (int i = 0; i <= strlen(dest); i++)
        {
            destCopy[i] = dest[i];
        }

        // 循环第二层 /proc/../
        while ((entryNext = readdir(dirNext)) != NULL)
        {

            if (
                entryNext->d_name[0] == 's' &&
                entryNext->d_name[1] == 't' &&
                entryNext->d_name[2] == 'a' &&
                entryNext->d_name[3] == 't' &&
                entryNext->d_name[4] == 'u' && entryNext->d_name[5] == 's')
            {

                int i = strlen(dest);
                destCopy[i] = '/';
                destCopy[i + 1] = 's';
                destCopy[i + 2] = 't';
                destCopy[i + 3] = 'a';
                destCopy[i + 4] = 't';
                destCopy[i + 5] = 'u';
                destCopy[i + 6] = 's';
                destCopy[i + 7] = '\0';
                // printf("destCopy为：%s\n",destCopy);
                // printf("destCopy字符数量为：%zu\n",strlen(destCopy));
                FILE* fp = fopen(destCopy, "r");
                // 防止错误打开文件
                if (fp == NULL)
                {
                    printf("NULL");
                    fclose(fp);
                    continue;
                }
                else
                {
                    char PPid[256];
                    char Pid[256];
                    //获取Pid
                    while (1)
                    {
                        fgets(Pid, 256, fp);
                        if (Pid[0] == 'P' && Pid[1] == 'i' && Pid[2] == 'd')
                            break;
                    }
                    int Pidnum = 0;
                    int a = 5;
                    while (1)
                    {
                        Pidnum = Pid[a] - '0' + Pidnum * 10;
                        a++;
                        if (Pid[a] == '\n')
                            break;
                    }
                    //printf("Pid为：%d  ", Pidnum);

                    //if(Pidnum == 1)continue;
                    //获取PPID
                    while (1)
                    {
                        fgets(PPid, 256, fp);
                        if (PPid[0] == 'P' && PPid[1] == 'P' && PPid[2] == 'i' && PPid[3] == 'd')
                            break;
                    }
                    int PPidnum = 0;
                    a = 6;
                    while (1)
                    {
                        PPidnum = PPid[a] - '0' + PPidnum * 10;
                        a++;
                        if (PPid[a] == '\n')
                            break;
                    }
                    //printf("Pid为：%d PPid为：%d \n",Pidnum,PPidnum);
                    AutoAdd(rootTree, Pidnum, PPidnum);

                    // printf("\n");

                }
            }
        }
        closedir(dirNext);
    }
    closedir(dir);
    traverse(rootTree, 0);

    printf("\n%d", count);
    return 0;
}

