#include <iostream>
using namespace std;
int main() {
	int a;
	
	cout << "Enter number of height rows: "<<endl;
	cin>>a;
    int height = a;
    int mid_row = a / 2;


    for (int i = 0; i <= mid_row; ++i) {
        
        for (int j = 0; j < mid_row - i; ++j) {
            cout << " ";
        
		}
        
        for (int k = 0; k < 2 * i + 1; ++k) {
            cout << "*";
        }
        cout << endl;
    }


    for (int i = mid_row - 1; i >= 0; --i) {
        
        for (int j = 0; j < mid_row - i; ++j) {
            cout << " ";
        }
    
        for (int k = 0; k < 2 * i + 1; ++k) {
           cout << "*";
        }
      cout << std::endl;
    }

    return 0;
}
