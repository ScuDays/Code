#define _CRT_SECURE_NO_WARNINGS 1
#include<iostream>
#include<bits/stdc++.h> 
using namespace std;


class complex1
{
public:
	complex1(double r = 0, double i = 0)
		: re(r), im(i)
	{}

public:
	double re, im;

};

int main() {
	complex1 c1(1, 3);

	cout << c1.im << " " << c1.re << endl;


}