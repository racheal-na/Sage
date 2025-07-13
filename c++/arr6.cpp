#include <iostream>
using namespace std;
long long power(int base, int exponent) {
    long long result = 1;
    for (int i = 0; i < exponent; ++i) {
        result *= base;
    }
    return result;
}

int main() {
    int base, exponent;
    cout << "Enter the base number: ";
    cin >> base;
    cout << "Enter the exponent: ";
    cin >> exponent;

    if (exponent < 0) {
    cout << "Exponent cannot be negative for this implementation." <<endl;
    } else {
        long long result = power(base, exponent);
    cout << base << " raised to the power of " << exponent << " is: " << result <<endl;
    }
    return 0;
}