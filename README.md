# Frontend-Intern-2019-tasks

### Task 1
To run the solution you need a browser and then you can run task1.html file.

### Task 2
#### Assumptions:
* <p style='text-align: justify;'>Function that will receive a two-dimensional array of integers in range [1, 1000]. </p>
* <p style='text-align: justify;'>The numbers of columns and rows should be in range [3, 50].</p>
* <p style='text-align: justify;'>If there are three or more of the same integers adjacent vertically or horizontally, "remove" them from the board.</p>
* <p style='text-align: justify;'>Removed integers are represented by the value 0. If an empty space has integers on top of itself, drop integers until they hit a non-zero value or the very bottom of the board.</p>
* <p style='text-align: justify;'>The function should be repeated until there are no integers left to be removed.After that, a stable board should be returned.</p>

<p style='text-align: justify;'>To run the solution, in the place where the task2.js file is located, create a new javascript file and place the code from the example below.</p>

```javascript
var riddleSolver = require('./task2').riddleSolver;

const board = [
    [ 7, 7, 7, 5, 1, 7 ],
    [ 1, 8, 1, 1, 1, 4 ],
    [ 3, 2, 3, 9, 7, 6 ],
    [ 9, 9, 3, 3, 6, 2 ],
    [ 1, 9, 3, 1, 8, 7 ],
    [ 5, 9, 2, 2, 4, 8 ]
];
```

And you can see the result by running function.

```javascript
console.log(riddleSolver(board))
```

