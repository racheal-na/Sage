#include<iostream>
using namespace std;
int main(){
	int arra[5]={5,15,2,25,50};
	int max_value=arra[0];
	for(int i=1; i<5; ++i)
{
	if(arra[i]>max_value)
	{
		max_value=arra[i];
		
	}
}

cout<<"The largest number in the array is: "<<max_value<<endl;
return 0;
}