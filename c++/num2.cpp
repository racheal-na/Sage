#include<iostream>
using namespace std;
int main(){
	float score;
	cout<<"Enter student's mark (0-100): "<<endl;
	cin>>score;
	if(score>=50){
		cout<<"You pass"<<endl;
	}else{
		cout<<"You fail"<<endl;
	}
	return 0;
}