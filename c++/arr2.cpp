#include<iostream>
using namespace std;
int main()
{
	int arr[5]={10,15,20,25,30};
	double sum=0;
	double average;
	for(int i=0; i<=4; ++1)
	{
		sum +=arr[i];
	}


	average=sum/5;
cout<<"The average number is: "<<average<<endl;

return 0;	
}