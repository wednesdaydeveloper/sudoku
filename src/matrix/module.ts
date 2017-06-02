import {createAction, handleActions, Action} from 'redux-actions';
import {SudokuState, SudokuCell} from '../State';

const FILL_CELL:    string = 'sudoku/fill_cell';
const SELECT_SELL:  string = 'sudoku/select_sell';
const TOGGLE_HINT:  string = 'sudoku/togle_hint';
const TOGGLE_TEACHER:  string = 'sudoku/toggle_teacher';

export type FillCellType = (col: number, row: number, val: number) => SudokuCell;

export const fillCell = createAction<number, number>(FILL_CELL, (val: number) => val);

export const selectCell = createAction<SudokuCell, SudokuCell>(SELECT_SELL, (cell: SudokuCell) => cell);

export const toggleHint = createAction<string>(TOGGLE_HINT, () => 'dummy');

export const toggleTeacher = createAction<string>(TOGGLE_TEACHER, () => 'dummy');

const InitialState: SudokuState = {
    initialCells: [
      {col: 0, row: 0, val: 2, initial: true},
      {col: 5, row: 0, val: 9, initial: true},
      {col: 7, row: 0, val: 8, initial: true},
      {col: 1, row: 1, val: 4, initial: true},
      {col: 2, row: 1, val: 6, initial: true},
      {col: 0, row: 2, val: 7, initial: true},
      {col: 3, row: 2, val: 4, initial: true},
      {col: 5, row: 2, val: 2, initial: true},
      {col: 6, row: 2, val: 1, initial: true},
      {col: 0, row: 3, val: 6, initial: true},
      {col: 5, row: 3, val: 1, initial: true},
      {col: 6, row: 3, val: 4, initial: true},
      {col: 8, row: 3, val: 8, initial: true},
      {col: 3, row: 4, val: 6, initial: true},
      {col: 4, row: 4, val: 3, initial: true},
      {col: 7, row: 4, val: 2, initial: true},
      {col: 0, row: 5, val: 9, initial: true},
      {col: 1, row: 5, val: 2, initial: true},
      {col: 2, row: 5, val: 7, initial: true},
      {col: 8, row: 5, val: 3, initial: true},
      {col: 0, row: 6, val: 1, initial: true},
      {col: 3, row: 6, val: 9, initial: true},
      {col: 6, row: 6, val: 8, initial: true},
      {col: 7, row: 6, val: 4, initial: true},
      {col: 1, row: 7, val: 9, initial: true},
      {col: 0, row: 8, val: 4, initial: true},
      {col: 7, row: 8, val: 6, initial: true},        
    ],
    resultCells: [],
    selectedCell: undefined,
    hint: false,
    teacher: false,
};
export default handleActions<SudokuState, SudokuCell>(
  {
    [SELECT_SELL]: (state: SudokuState, action: Action<SudokuCell>) => {
      return action.payload 
        ? Object.assign({}, state, {selectedCell: action.payload})
        : state;
    },
    [FILL_CELL]: (state: SudokuState, action: Action<number>) => {

      if (action.payload && state.selectedCell) {
        const s = state.resultCells
          .find(cell => cell.col === state.selectedCell!.col && cell.row === state.selectedCell!.row);
        if (s) {
          s.val = action.payload;
          return Object.assign({}, state, {
            selectedCell: undefined,
            resultCells: [...state.resultCells]});
        } else {
          return Object.assign({}, state, {
            selectedCell: undefined,
            resultCells: [...state.resultCells, {...state.selectedCell, val: action.payload}]});
        }
      }

      return action.payload && state.selectedCell
        ? Object.assign({}, state, {selectedCell: undefined, resultCells: [...state.resultCells, {...state.selectedCell, val: action.payload}]})
        : state;
    },
    [TOGGLE_HINT]: (state: SudokuState, action: Action<string>) => {
      return Object.assign({}, state, {hint: !state.hint});
    },
    [TOGGLE_TEACHER]: (state: SudokuState, action: Action<string>) => {
      return Object.assign({}, state, {teacher: !state.teacher});
    },
  },
  InitialState);
