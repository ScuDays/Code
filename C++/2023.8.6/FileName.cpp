#define _CRT_SECURE_NO_WARNINGS 1
#include<iostream>
#include<bits/stdc++.h> 
using namespace std;



int& display() {
	int a = 3;
	int& b = a;

	return b;

}

class people {
public:
	people(int year1 = 0, double grade1 = 1)
		: year(year1), grade(grade1){}

	int year;
	double grade;
};
int main() {
	/*int a = 3;
	int b = 4;
	int& c = a;
	cout << c<<endl;
	c = 4;
	cout << c<<"  "<<a;*/

	//cout << &c << " " << &a;


	/*cout << int(3);
	int a = int(4);
	cout << -a;*/

	cout << people().grade;



}

