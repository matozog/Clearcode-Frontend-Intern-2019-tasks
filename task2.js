/**
 * Main function, if board dimensions are right it run function checkBoard which solve riddle.
 * @param {Array.<integer[]>} board 
 * @returns {Array.<integer[]> | string}
 * @see checkBoard
 */
function riddleSolver(board){
    if(boardIsInRange(board)){
        while(checkBoard(board)){}
        return board
    }else{
        return "The board is out of size"
    }
}

/**
 * Checks whether board has the right size, return verification result.
 * @param {Array.<integer[]>} board 
 * @returns {boolean}
 */
const boardIsInRange = board => {
    return (board.length >= 3 && board.length <=50 && board[0].length>=3 && board[0].length<=50)?true:false
}

/**
 * Iterate two dimensional array of integers (from the upper left corner to lower right) and check if two elements are on the right horizontally
 * or they are down vertically from the currently checked integer. If it is true, execute functions that remove integers (assing value 0)
 * and drop elements above them.
 * @example
 * var board = [[1,2,3], [1, 1, 1], [3,4,5]]
 * console.log(checkBoard(bard)) // [[0, 0, 0], [1,2,3], [3,4,5]]
 * @param {Array.<integer[]>} board 
 * @returns {boolean} If board was modified return true otherwise false. It helps to finish checking.
 */
function checkBoard(board){
    let isChanged = false
    board.map((row, rowIndex) => {
        row.map((integer, integerIndex) => {
            if(isPossibleHorizontalyReduction(row, integerIndex)){
                if(checkAndRemoveHorizontally(board, rowIndex, integerIndex)){
                    (rowIndex > 0) && dropIntegersHorizontally(board, rowIndex, integerIndex)
                    isChanged = true
                }
            }
            if(isPossibleVerticallyReduction(rowIndex, board.length, integer)){
                if(checkAndRemoveVertically(board, rowIndex, integerIndex)){
                    if(rowIndex!==0 && board[rowIndex-1][integerIndex]!==0)
                        dropIntegersVertically(board, integerIndex, rowIndex)
                    isChanged = true
                }
            }
        })
    })
    return isChanged;
}

/**
 * Checks possibility to horizontally reducing elements. 
 * @param {Array.<integer>} row 
 * @param {integer} integerIndex 
 * @returns {boolean} If reduction is possible return true otherwise false.
 */
const isPossibleHorizontalyReduction = (row, integerIndex) =>{
    return (row[integerIndex] !== 0 && integerIndex<row.length-2)?true:false
}

/**
 * Checks possibility to vertically reducing elements. 
 * @param {integer} rowIndex 
 * @param {integer} boardLength 
 * @param {integer} integer 
 * @returns {boolean} If reduction is possible return true otherwise false.
 */ 
const isPossibleVerticallyReduction = (rowIndex, boardLength, integer) => {
    return (integer !== 0 && rowIndex<boardLength-2)?true:false
}

/**
 * If two elements next to actual integer are the same it reduces they.
 * @param {Array.<integer[]>} board 
 * @param {integer} rowIndex 
 * @param {integer} integerIndex 
 * @returns {boolean} If reduced return true otherwise false.
 * @see horizontallyCondition
 */
function checkAndRemoveHorizontally(board, rowIndex, integerIndex){
    if(horizontallyCondition(board, rowIndex, integerIndex)){
        for(i=0; i<3; i++){
            board[rowIndex][integerIndex+i] = 0
        }
        return true
    }
    return false
}

/**
 * Checks horizontal condition for reduction (two elements on the right next to checked).
 * @param {Array.<integer[]>} board 
 * @param {integer} rowIndex 
 * @param {integer} integerIndex 
 * @returns {boolean} If condition elements are equals return true otherwise false.
 */
const horizontallyCondition = (board, rowIndex, integerIndex) =>{
    let checkedInteger = board[rowIndex][integerIndex]
    return (board[rowIndex][integerIndex+1]===checkedInteger && board[rowIndex][integerIndex+2]===checkedInteger)?true:false
}

/**
 * Drops elements (from above) for three column in which we have reduced the elements until the row index is greater than or equal to 0.
 * @param {Array.<integer[]>} board 
 * @param {integer} rowIndex 
 * @param {integer} integerIndex 
 */
function dropIntegersHorizontally(board,rowIndex, integerIndex){
    while(rowIndex-1 >= 0){
        for(i=0; i<3; i=i+1){
            swap(board, rowIndex, integerIndex+i)
        }
        rowIndex=rowIndex-1
    }
}

/**
 * Swap two elements (current and one above it) in two-dimensional array.
 * @param {Array.<integer[]>} board 
 * @param {integer} rowIndex 
 * @param {integer} integerIndex 
 */
const swap = (board, rowIndex, integerIndex) =>{
    let tmp = board[rowIndex][integerIndex]
    board[rowIndex][integerIndex] = board[rowIndex-1][integerIndex]
    board[rowIndex-1][integerIndex]=tmp
}

/**
 * If two elements below actual integer are the same (verticallyCondition) it reduces they.
 * @param {Array.<integer[]>} board 
 * @param {integerIndex} rowIndex 
 * @param {integer} integerIndex 
 * @returns {boolean} If reduced return true otherwise false.
 * @see verticallyCondition
 */
function checkAndRemoveVertically(board, rowIndex, integerIndex){
    if(verticallyCondition(board, rowIndex, integerIndex)){
        for(i=0; i<3; i++){
            board[rowIndex+i][integerIndex] = 0
        }
        return true
    }
    return false
}

/**
 * Checks vertical condition for reduction (two elements below to checked).
 * @param {Array.<integer[]>} board 
 * @param {integer} rowIndex 
 * @param {integer} integerIndex 
 * @returns {boolean} If condition elements are equals return true otherwise false.
 */
const verticallyCondition = (board, rowIndex, integerIndex) => {
    let checkedInteger = board[rowIndex][integerIndex]
    return (board[rowIndex+1][integerIndex] === checkedInteger && board[rowIndex+2][integerIndex] == checkedInteger)?true:false
}

/**
 * Drops elements for one column in which we have reduced the elements until the element above is 0 or the row index is equal to 0.
 * @param {Array.<integer[]>} board 
 * @param {integer} numberIndex 
 * @param {integer} rowIndex 
 */
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

module.exports = {
    riddleSolver: riddleSolver
}