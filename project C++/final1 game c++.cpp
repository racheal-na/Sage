#include <iostream>
#include <string>
#include <cctype> // for tolower()
#include <algorithm> // for transform()
#include <cstdlib>
using namespace std;

void playGame() {
    cout << "\t\t\t\t\t" << "Please insert 1 when ever you want to stop playing" << endl << endl << endl;

    string scrambledWords[5] = {"lleho", "ongera", "erte", "gelea", "emoh"};
    string correctWords[5] = {"hello", "orange", "tree", "eagle", "home"};
    int correctAnswers = 0;
    int i = 0;
    string answer;

    while (true) {
        cout << "\t\t\t\t\t" << scrambledWords[i] << endl;
        cin >> answer;
        cout << endl;

        // Convert answer to lowercase
        transform(answer.begin(), answer.end(), answer.begin(),
            [](unsigned char c){ return tolower(c); });

        if (answer == correctWords[i]) {
            correctAnswers++;
        }

        i++;

        if (i == sizeof(scrambledWords) / sizeof(scrambledWords[0])) {
            cout << "\t\t\t\t\t" << "Correct Answers: " << correctAnswers << "/" << sizeof(scrambledWords) / sizeof(scrambledWords[0]) << endl;
            if (correctAnswers >= 3) {
                system("cls");
                cout << "\t\t\t\t\t" << "Congratulation!!"<<endl;
                cout << "\t\t\t\t\t" << "Correct Answers: " << correctAnswers << "/" << sizeof(scrambledWords) / sizeof(scrambledWords[0]) << endl;
            } else {
                cout << "\t\t\t\t\t" << "Game over!"<<endl;
                cout << "\t\t\t\t\t" << "Correct Answers: " << correctAnswers << "/" << sizeof(scrambledWords) / sizeof(scrambledWords[0]) << endl;
            }
            break;
        } else if (answer == "1") {
              system("cls");
            cout << "\t\t\t\t\t" << "Game stopped by user. " << endl;
            cout << "\t\t\t\t\t" << "Correct Answers: " << correctAnswers << "/" << sizeof(scrambledWords) / sizeof(scrambledWords[0]) << endl;
            if (correctAnswers >= 3) {
                cout << "\t\t\t\t\t" << "Congratulation!!"<<endl;
                cout << "\t\t\t\t\t" << "Correct Answers: " << correctAnswers << "/" << sizeof(scrambledWords) / sizeof(scrambledWords[0]) << endl;
            } else {
                cout << "\t\t\t\t\t" << "Game over!"<<endl;
                cout << "\t\t\t\t\t" << "Correct Answers: " << correctAnswers << "/" << sizeof(scrambledWords) / sizeof(scrambledWords[0]) << endl;
            }
            break;
        }
    }
}

int main() {
    int start = 0;

    cout << "\t\t\t\t\t" << "*************************" << endl;
    cout << "\t\t\t\t\t" << "* Welcome To Sage Quiz*" << endl;
    cout << "\t\t\t\t\t" << "*************************" << endl;
    cout << "\t\t\t\t\t" << "1. Start" << endl;
    cin >> start;

    if (start == 1) {  // Fixed: changed = to == for comparison
        playGame();
    }
}