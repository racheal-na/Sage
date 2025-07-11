	#include<iostream>
using namespace std;
int main(){
	int i=0;
	
	char vowels[5]={'a','e','i','o','u'};

    vowels[2]='b';
    
	while( i<=4){
		cout<<vowels[i]<<endl;
		i++;
	}
	return 0;
}
