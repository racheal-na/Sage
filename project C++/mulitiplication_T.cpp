#include<iostream>
using namespace std;

void Multiplication_table(int s=12){
	cout<<"|";
	for (int i = 1; i <= s; i++) {
        cout << " " << i << " |";
        }
    cout << endl;
    
    cout << "|";
	for(int i=1; i<=s; i++){
		cout<<"---|";
	}
	cout<<endl;
	for(int i=1; i<=s ; i++){
		cout<<"|" << i << "|";
		for(int j=1; j<=s ; j++){
			cout<<" "<< i*j << "|";
		} 
		cout<<endl;
	}
}
int main(){
	Multiplication_table();
	return 0;
}