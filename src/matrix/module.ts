import {createAction, handleActions, Action} from 'redux-actions';
import {SudokuState, SudokuCell, Message} from '../State';
import * as Sudoku from '../lib/SudokuSolver';

const FILL_CELL:    string = 'sudoku/fill_cell';
const SELECT_SELL:  string = 'sudoku/select_sell';
const TOGGLE_HINT:  string = 'sudoku/togle_hint';
const TOGGLE_TEACHER:  string = 'sudoku/toggle_teacher';
const UNDO:  string = 'sudoku/undo';

export type FillCellType = (col: number, row: number, val: number) => SudokuCell;

export const fillCell = createAction<number, number>(FILL_CELL, (val: number) => val);

export const selectCell = createAction<SudokuCell, SudokuCell>(SELECT_SELL, (cell: SudokuCell) => cell);

export const toggleHint = createAction<string>(TOGGLE_HINT, () => 'dummy');

export const toggleTeacher = createAction<string>(TOGGLE_TEACHER, () => 'dummy');

export const undo = createAction<string>(UNDO, () => 'dummy');

const array: number[][] = [
  [ 2, 0, 0, 0, 0, 9, 0, 8, 0, ],
  [ 0, 4, 6, 0, 0, 0, 0, 0, 0, ],
  [ 7, 0, 0, 4, 0, 2, 1, 0, 0, ],
  [ 6, 0, 0, 0, 0, 1, 4, 0, 8, ],
  [ 0, 0, 0, 6, 3, 0, 0, 2, 0, ],
  [ 9, 2, 7, 0, 0, 0, 0, 0, 3, ],
  [ 1, 0, 0, 9, 0, 0, 8, 4, 0, ],
  [ 0, 9, 0, 0, 0, 0, 0, 0, 0, ],
  [ 4, 0, 0, 0, 0, 0, 0, 6, 0, ],
];
// const array: number[][] = [
//  [ 2, 3, 1, 7, 6, 9, 5, 8, 4],
//  [ 5, 4, 6, 3, 1, 8, 2, 9, 7],
//  [ 7, 8, 9, 4, 5, 2, 1, 3, 6],
//  [ 6, 5, 3, 2, 9, 1, 4, 7, 8],
//  [ 8, 1, 4, 6, 3, 7, 9, 2, 5],
//  [ 9, 2, 7, 5, 8, 4, 6, 1, 3],
//  [ 1, 6, 5, 9, 7, 3, 8, 4, 2],
//  [ 3, 9, 2, 8, 4, 6, 7, 5, 1],
//  [ 4, 7, 8, 1, 2, 5, 3, 6, 0],
// ];
const solver = new Sudoku.Sudoku.Solver(array);

const InitialState: SudokuState = {
    initialCells: solver.InitialCell.map((cell: SudokuCell) => ({...cell, initial: true})),
    resultCells: [],
    selectedCell: undefined,
    hint: false,
    teacher: false,
    hintResult: [],
    solved: false,
    messages: []
};

const getHint = (selectedCell: SudokuCell,  state: SudokuState) => {
  return solver.unUsedValues(selectedCell!, [...state.initialCells, ...state.resultCells]); 
};

export default handleActions<SudokuState, SudokuCell>(
  {
    [SELECT_SELL]: (state: SudokuState, action: Action<SudokuCell>) => {
      if (action.payload) {
        const hintResult = getHint(action.payload!, state);
        return Object.assign({}, state, {selectedCell: action.payload, hintResult});
      }

      return state;
    },
    [FILL_CELL]: (state: SudokuState, action: Action<number>) => {

      if (action.payload && state.selectedCell) {
        const selectedCell = state.resultCells
          .find(cell => cell.col === state.selectedCell!.col && cell.row === state.selectedCell!.row);

        let resultCells;
        if (selectedCell) {
          selectedCell.val = action.payload;
          resultCells = [...state.resultCells];
        } else {
          resultCells = [...state.resultCells, {...state.selectedCell, val: action.payload}];
        }

        const filled = solver.isFilled(resultCells);
        let solved = false;
        let messages: Message[] = [];
        if (filled) {
          solved = solver.isSolved(resultCells);
          if (solved) {
            messages.push({messageType: 'alert-success', messageString: 'Congraturation!!'});
          } else {
            messages.push({messageType: 'alert-danger', messageString: 'That is　incorrect.'});
          } 
        }

        return Object.assign({}, state, {
          selectedCell: undefined,
          resultCells,
          solved,
          messages,
        });
      }

      return state;
    },
    [TOGGLE_HINT]: (state: SudokuState, action: Action<string>) => {
      return Object.assign({}, state, {hint: !state.hint});
    },
    [TOGGLE_TEACHER]: (state: SudokuState, action: Action<string>) => {
      return Object.assign({}, state, {teacher: !state.teacher});
    },
    [UNDO]: (state: SudokuState, action: Action<string>) => {
      const selectedCell = state.resultCells.pop();
      return Object.assign({}, state, {selectedCell, resultCells: state.resultCells, messages: []});
    },
  },
  InitialState);
