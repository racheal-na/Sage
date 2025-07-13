#include<iostream>
using namespace std;
int main(){
	int i;
	int sum=0;
cout<<"Enter numbers: "<<endl;
do{
	cin>>i;
	sum+=i;
}
	while(i!=0);
cout<<"The sum of all entered numbers is: "<<sum<<endl;

return 0;
}