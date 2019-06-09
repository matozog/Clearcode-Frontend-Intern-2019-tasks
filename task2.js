const board = [
    [ 7, 7, 7, 5, 1, 7 ],
    [ 1, 8, 1, 1, 1, 4 ],
    [ 3, 2, 3, 9, 7, 6 ],
    [ 9, 9, 3, 3, 6, 2 ],
    [ 1, 9, 3, 1, 8, 7 ],
    [ 5, 9, 2, 2, 4, 8 ]
];

// [ 0, 0, 0, 0, 0, 7 ],
// [ 1, 8, 0, 5, 1, 4 ],
// [ 3, 2, 3, 9, 7, 6 ],
// [ 9, 9, 3, 3, 6, 2 ],
// [ 1, 9, 3, 1, 8, 7 ],
// [ 5, 9, 2, 2, 4, 8 ]

// [ 0, 0, 0, 0, 0, 7 ],
// [ 1, 0, 0, 0, 1, 4 ],
// [ 3, 0, 0, 5, 7, 6 ],
// [ 9, 0, 0, 9, 6, 2 ],
// [ 1, 0, 0, 3, 8, 7 ],
// [ 5, 8, 0, 1, 4, 8 ]

function riddleSolver(board){
    board.map((row, rowIndex, board) => {
        row.map((number, numberIndex) => {
            if(numberIndex<row.length-2)
                checkHorizontally(board, row, numberIndex, number, rowIndex)
            if(rowIndex<board.length-2)
                checkVertically(board, row, board[rowIndex+1], board[rowIndex+2], numberIndex, number )
        })
    })
    console.log(board)
}

function checkHorizontally(board, row, numberIndex, number, rowIndex){
    if(row[numberIndex+1]===number && row[numberIndex+2]===number){
        row[numberIndex] = 0
        row[numberIndex+1] = 0
        row[numberIndex+2] = 0
        if(rowIndex>0)
            dropIntegersHorizontally(board, numberIndex, rowIndex)
    }
}

function dropIntegersHorizontally(board, numberIndex, rowIndex){
    let tmpRowIndex = rowIndex
    while(tmpRowIndex-1 >= 0){
        swap(board,rowIndex, numberIndex)
        tmpRowIndex=tmpRowIndex-1
    }
}

function swap(board, rowIndex, numberIndex){
    let tmp = ''
    for(i=0; i<3; i++){
        tmp = board[rowIndex][numberIndex+i]
        board[rowIndex][numberIndex+i] = board[rowIndex-1][numberIndex+i]
        board[rowIndex-1][numberIndex+i]=tmp
    }
}

function checkVertically(board, firstRow, secondRow, thirdRow, numberIndex, number){
    if(secondRow[numberIndex] === number && thirdRow[numberIndex] == number){
        console.log("drop vertically")
    }
}

console.log(riddleSolver(board))