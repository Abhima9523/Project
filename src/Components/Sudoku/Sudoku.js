import React,{useState} from "react";
import './Sudoku.css'

const initial=[
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];
const getDeepCopy=(arr)=>{
    return JSON.parse(JSON.stringify(arr));
};
const isSafe=(grid,row,col,num)=>{
    for(let x=0; x<9; x++)
    {
        if(grid[row][x]===num || grid[x][col]===num) return false;
        const startRow=3*Math.floor(row/3);
        const startCol=3*Math.floor(col/3);
        if(grid[startRow + Math.floor(x/3)][startCol + (x%3)]=== num) return false;

    }
    return true;
};
const findEmptyLocation=(grid,loc)=>{
    for(let row=0; row<9; row++)
    {
        for(let col =0; col<9; col++)
        {
           if(grid[row][col]===0)
           {
            loc[0]=row;
            loc[1]=col;
            return true;
           }
        }
    }
    return false;
};
const solver=(grid)=>{
    const loc=[0,0];
    if(!findEmptyLocation(grid,loc)) return true;
    const row = loc[0];
    const col = loc[1];
    for (let num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
          grid[row][col] = num;
          if (solver(grid)) return true;
          grid[row][col] = 0; // Backtrack
        }
      }
      return false;
    };
    
    const Sudoku = () => {
      const [arr, setArr] = useState(getDeepCopy(initial));
    
      const onInputChange = (e, row, col) => {
        const val = parseInt(e.target.value) || 0;
        const grid = getDeepCopy(arr);
    
        if (val >= 1 && val <= 9) {
          grid[row][col] = val;
          if (!isSafe(grid, row, col, val)) {
            alert("Invalid move! This number causes a duplicate in the row, column, or 3x3 grid.");
          }
          setArr(grid);
        } else {
          grid[row][col] = 0;
          setArr(grid);
        }
      };
    
      const solveSudoku = () => {
        const sudoku = getDeepCopy(arr);
        solver(sudoku);
        setArr(sudoku);
      };
    
      const compareSudokus = (currentSudoku, solvedSudoku) => {
        let res = {
          isComplete: true,
          isSolved: true,
        };
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
              res.isSolved = false;
            }
            if (currentSudoku[i][j] === 0) {
              res.isComplete = false;
            }
          }
        }
        return res;
      };
    
      const checkSudoku = () => {
        let sudoku = getDeepCopy(initial);
        solver(sudoku);
        let compare = compareSudokus(arr, sudoku);
    
        if (compare.isComplete) {
          alert("Congratulations! You have solved the Sudoku.");
        } else if (compare.isSolved) {
          alert("Keep going!");
        } else {
          alert("Sudoku can't be solved. Try again.");
        }
      };
    
      return (
        <div className='App'>
          <div className='App-header'>
            <h3>Sudookuu Solver</h3>
            <table>
              <tbody>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rindex) => {
                  return (
                    <tr key={rindex} className={(row + 1) % 3 === 0 ? 'Rowborder' : ''}>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cindex) => {
                        return (
                          <td key={rindex + cindex} className={(col + 1) % 3 === 0 ? 'Colborder' : ''}>
                            <input
                              onChange={(e) => onInputChange(e, row, col)}
                              value={arr[row][col] === 0 ? '' : arr[row][col]}
                              className='cellInput'
                              disabled={initial[row][col] !== 0}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className='btncontainer'>
              <button className='checkbtn btn' onClick={checkSudoku}>Check</button>
              <button className='solvebtn btn' onClick={solveSudoku}>Solve</button>
              <button className='resetbtn btn' onClick={() => setArr(getDeepCopy(initial))}>Reset</button>
            </div>
          </div>
        </div>
      );
    };
    
    export default Sudoku;
