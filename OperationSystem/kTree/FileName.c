#include <stdio.h>
#include <assert.h>
#include <sys/types.h>
#include <stdlib.h>


struct tree;
struct dynArr {
    //K叉树
    struct tree* data;
    //已存数量
    size_t size;
    //总容量    
    size_t capacity;
};

struct tree
{
    int Pid;
    int PPid;
    struct dynArr* subtree;

};
//数组扩容
void dynArr_Resize(struct dynArr* arr) {
    arr->capacity = arr->capacity * 2;
    struct tree* new_data = (struct tree*)realloc(arr->data, arr->capacity * sizeof(struct tree));

    if (new_data == NULL) {
        //扩容失败，抛出异常或者处理错误
        printf("Out of memory.\n");
    }
    arr->data = new_data;
}
//数组插入元素
void dynArr_Insert(struct dynArr* arr, struct tree *treeInsert) {
    if (arr->capacity <= arr->size) {
        dynArr_Resize(arr);
    }
    arr->data[arr->size] = *treeInsert;
    arr->size++;
}
//初始化一个dynArr结构体
struct dynArr* dynArr_Create() {
    struct dynArr* Arr = (struct dynArr*)malloc(sizeof(struct dynArr));
    Arr->data = (struct tree*)malloc(5 * sizeof(struct tree));
    Arr->size = 0;
    Arr->capacity = 5;
    return Arr;
}
//初始化一个一个树结点
struct tree *tree_Create(int Pid, int PPid) {
    struct tree *Tree = (struct tree*)malloc(sizeof(struct tree));
    if (Tree == NULL) {
        perror("cuowu");
        return;
    }
    //为什么不加头文件就会错误????
    Tree->Pid = Pid;
    Tree->PPid = PPid;
    Tree->subtree = dynArr_Create();
    return Tree;
}

//遍历打印整棵树，但是还不够规范
void traverse(struct tree* Tree, int lastGrade) {
    printf("%d", Tree->Pid);
    if (Tree->subtree->size == 0)return;

    int grade = lastGrade;
    printf("-+-");
    grade += 2;
    grade += GetPidLong(Tree->Pid);
    //space +=

   
    for (int i = 0; i < Tree->subtree->size; i++) {
        //printf("-");
        traverse(&Tree->subtree->data[i], grade);
        printf("\n");
        for (int i = 0; i < grade; i++) {
            printf(" ");
        }
        //printf("|");
    }
}
//保证打印规范
int GetPidLong(int number) {
    int a = 1;
    do {
        a++;
        number = number / 10;
    } while (number >= 10);
    return a;
}
//寻找Pid为某个值的树节点
struct tree* GetTree(struct tree* FindTree,int Pid) {
    if (Pid == FindTree->Pid)return FindTree;
    else {
        struct tree* find = NULL;
        for (int i = 0; i < FindTree->subtree->size; i++) {
            find = GetTree(&FindTree->subtree->data[i], Pid);
            if (find == NULL)continue;
            if (find->Pid == Pid)return find;
        }
    }
    return NULL;
}
//把往树里面添加的操作打包成一个函数便于操作
void AutoAdd(struct tree* FindTree,int Pid,int PPid) {

    struct tree* a = GetTree(FindTree, PPid);
    dynArr_Insert(a->subtree, tree_Create(Pid, PPid));

}
int main() {
   struct tree atree = *tree_Create(1, 0);
    struct tree* rootTree = &atree;
    //dynArr_Insert(rootTree->subtree,tree_Create(2,1));
    //dynArr_Insert(rootTree->subtree->data[0].subtree, tree_Create(21, 1));
    //dynArr_Insert(rootTree->subtree->data[0].subtree, tree_Create(22, 1));
    //dynArr_Insert(rootTree->subtree->data[0].subtree, tree_Create(23, 1));
    //dynArr_Insert(rootTree->subtree->data[0].subtree->data[0].subtree, tree_Create(233, 23));
    AutoAdd(rootTree,3, 1);

  /*  AutoAdd(rootTree,21, 1);
    AutoAdd(rootTree,22, 1);
    AutoAdd(rootTree,23, 1);
    AutoAdd(rootTree,233, 23);
    AutoAdd(rootTree, 3, 1);
    AutoAdd(rootTree, 31, 3);
    AutoAdd(rootTree, 32, 3);
    AutoAdd(rootTree, 322, 31);
    AutoAdd(rootTree, 321,31);
    AutoAdd(rootTree, 8,1);
    AutoAdd(rootTree, 88,8);
    AutoAdd(rootTree, 89,8);
    AutoAdd(rootTree, 888,88);*/



    //printf("%d", a->PPid);
    traverse(rootTree, 0);

    return 1;

}