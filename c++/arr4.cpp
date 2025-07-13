#include <iostream>
using namespace std;
int square(int num){
	return num*num;
}
int main() {
    int userinput;
    cout<<"Enter an integer to find it square: "<<endl;
    cin>>userinput;
    int result=square(userinput);
    cout<<"The square of "<<userinput<<"is"<<result<<endl;
    return 0;
    
}
    