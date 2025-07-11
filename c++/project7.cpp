#include<iostream>
using namespace std;

void celsius_to_fehrenit(double c){
	double f;
	f=(c*1.8)+32;
	cout<<f<<endl;
	
	
}



 void fehrenit_to_celsius(double f){
	double c; 
	c=(f-32)*5/9;
	cout<<c<<endl;


}


int main(){
	celsius_to_fehrenit(32);
	fehrenit_to_celsius(8);
	return 0;
}