#include <iostream>
using namespace std;
bool isEVEN(int num)
{
	if(num%2==0){ 
	return true;
	}else
	{
	return false;	
 }
}
int main(){

	int a;
	cout<<"Enter number to check : ";
	cin>>a;
	if(isEVEN(a)){
		cout<<a<<"is even"<<endl;
		
	}
	else{
		cout<<a<<"is odd"<<endl;
	}
	return 0;
}