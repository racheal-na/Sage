#include <iostream>
using namespace std;
int main() {
	int a;
	
	cout << "Enter number of height rows: "<<endl;
	cin>>a;
    int row = a;


for (int i = row - 1; i >= 0; --i) {
        
        for (int j = 0; j < row - i; ++j) {
            cout << " ";
        }
    
        for (int k = 0; k < 2 * i + 1; ++k) {
           cout << "*";
        }
      cout << std::endl;
    }

    return 0;
}