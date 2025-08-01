function makeMove(turn,board){
    while(true){
    const row = parseInt(prompt("Enter row: "))
    const column =parseInt(prompt("Enter column: "))
    if(row<1|| isNaN(row)||row>3) console.log('invalid row')
    else if(isNaN(column)||column<1||column>3)console.log('invalid column')
    else if(board[row-1][column-1]!==" ")console.log("invalid position")
    else{
    board[row-1][column-1]=turn
break
}
    }
}



const board = [
    [" "," "," "],
    [" "," "," "],
    [" "," ",""]
]
makeMove("X",board)
console.log(board)
makeMove("O",board)
console.log(board)