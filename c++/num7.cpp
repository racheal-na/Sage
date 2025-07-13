#include<iostream>
using namespace std;
int main(){ 

	int arr[5]={5,15,25,35,45};
	int sum=0;
	for(int i=0;i<5;i++)
	{
		sum += arr[i];
	
	}
	cout<<"The sum of the array elements is: "<<sum<<endl;
	return 0;
}