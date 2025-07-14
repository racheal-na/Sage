#include <iostream>
using namespace std;
int main(){
	int i,j;
	int a;
	
	cout<<"enter number that makes tringle: "<<endl;
	cin>>a;
	for( i=a;i>=1;i--)
	{
	 for(j=i;j>=1;j--)
    cout<<"*";
	cout<<endl;
	}	
	return 0;
	
}