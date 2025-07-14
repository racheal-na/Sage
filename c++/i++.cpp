#include <iostream>
using namespace std;
void display(int x){
	cout<<"int: "<<x<<endl;
}
void display(string rachel){
	cout<<"string: "<<rachel<<endl;
}
void display(double y){
	cout<<"double: "<<y<<endl;
}
int main(){
	display(1);
	display(2.56);
	display("rachel");
	return 0;
}