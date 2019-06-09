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
// [ 1, 0, 0, 5, 1, 4 ],
// [ 3, 0, 0, 9, 7, 6 ],
// [ 9, 0, 0, 3, 6, 2 ],
// [ 1, 8, 0, 1, 8, 7 ],
// [ 5, 2, 2, 2, 4, 8 ]

// [ 0, 0, 0, 0, 0, 7 ],
// [ 1, 0, 0, 0, 1, 4 ],
// [ 3, 0, 0, 5, 7, 6 ],
// [ 9, 0, 0, 9, 6, 2 ],
// [ 1, 0, 0, 3, 8, 7 ],
// [ 5, 8, 0, 1, 4, 8 ]

function riddleSolver(board){
    board.map((row, rowIndex, board) => {
        row.map((number, numberIndex) => {
            if(number!==0){
                if(numberIndex<row.length-2)
                    checkHorizontally(board, row, numberIndex, number, rowIndex)
                if(rowIndex<board.length-2)
                    checkVertically(board, row, board[rowIndex+1], board[rowIndex+2], numberIndex, number, rowIndex )
            }
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
        for(let i=0; i<3; i=i+1){
            swap(board, tmpRowIndex, numberIndex+i)
        }
        tmpRowIndex=tmpRowIndex-1
    }
}

function swap(board, rowIndex, numberIndex){
    let tmp = board[rowIndex][numberIndex]
    board[rowIndex][numberIndex] = board[rowIndex-1][numberIndex]
    board[rowIndex-1][numberIndex]=tmp
}

function checkVertically(board, firstRow, secondRow, thirdRow, numberIndex, number, rowIndex){
    if(secondRow[numberIndex] === number && thirdRow[numberIndex] == number){
        firstRow[numberIndex] = 0
        secondRow[numberIndex] = 0
        thirdRow[numberIndex] = 0
        if(board[rowIndex-1][numberIndex]!=0){
            dropIntegersVertically(board, numberIndex, rowIndex)
        }
    }
}

function dropIntegersVertically(board, numberIndex, rowIndex){
    let tmpRowIndex = rowIndex
    while(tmpRowIndex-1 >=0 && board[tmpRowIndex-1][numberIndex] !== 0){
        let tmpI = 0
        do{
            swap(board, tmpRowIndex + tmpI, numberIndex  )
            tmpI = tmpI + 1
        }while((tmpRowIndex + tmpI) < board.length && board[tmpRowIndex+tmpI][numberIndex] === 0)
        tmpRowIndex = tmpRowIndex - 1
    }
}

console.log(riddleSolver(board))