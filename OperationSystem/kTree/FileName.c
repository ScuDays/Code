#include <stdio.h>
#include <assert.h>
#include <sys/types.h>
#include <stdlib.h>


struct tree;
struct dynArr {
    //K����
    struct tree* data;
    //�Ѵ�����
    size_t size;
    //������    
    size_t capacity;
};

struct tree
{
    int Pid;
    int PPid;
    struct dynArr* subtree;

};
//��������
void dynArr_Resize(struct dynArr* arr) {
    arr->capacity = arr->capacity * 2;
    struct tree* new_data = (struct tree*)realloc(arr->data, arr->capacity * sizeof(struct tree));

    if (new_data == NULL) {
        //����ʧ�ܣ��׳��쳣���ߴ������
        printf("Out of memory.\n");
    }
    arr->data = new_data;
}
//�������Ԫ��
void dynArr_Insert(struct dynArr* arr, struct tree *treeInsert) {
    if (arr->capacity <= arr->size) {
        dynArr_Resize(arr);
    }
    arr->data[arr->size] = *treeInsert;
    arr->size++;
}
//��ʼ��һ��dynArr�ṹ��
struct dynArr* dynArr_Create() {
    struct dynArr* Arr = (struct dynArr*)malloc(sizeof(struct dynArr));
    Arr->data = (struct tree*)malloc(5 * sizeof(struct tree));
    Arr->size = 0;
    Arr->capacity = 5;
    return Arr;
}
//��ʼ��һ��һ�������
struct tree *tree_Create(int Pid, int PPid) {
    struct tree *Tree = (struct tree*)malloc(sizeof(struct tree));
    if (Tree == NULL) {
        perror("cuowu");
        return;
    }
    //Ϊʲô����ͷ�ļ��ͻ����????
    Tree->Pid = Pid;
    Tree->PPid = PPid;
    Tree->subtree = dynArr_Create();
    return Tree;
}

//������ӡ�����������ǻ������淶
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
//��֤��ӡ�淶
int GetPidLong(int number) {
    int a = 1;
    do {
        a++;
        number = number / 10;
    } while (number >= 10);
    return a;
}
//Ѱ��PidΪĳ��ֵ�����ڵ�
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
//������������ӵĲ��������һ���������ڲ���
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