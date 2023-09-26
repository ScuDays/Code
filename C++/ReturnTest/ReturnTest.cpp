#include <stdio.h>
#include <iostream>
class people {
public: int a;
	  double b;

};
people& display() {
	people a;
	a.a = 1;
	a.b = 3.0;
	return a;


}
int main() {
	
	people b=display();
	printf("%d", b.a);
}



