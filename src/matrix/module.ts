import {createAction, handleActions, Action} from 'redux-actions';
import {SudokuState, SudokuCell} from '../State';

const FILL_CELL:    string = 'counter/fill_cell';

export type FillCellType = (col: number, row: number, val: number) => SudokuCell;

export const fillCell = createAction<SudokuCell, number, number, number>(
  FILL_CELL,
  (col: number, row: number, val: number) => ({col, row, val}));

const InitialState: SudokuState = {
    data: [
      {col: 0, row: 0, val: 2},
      {col: 5, row: 0, val: 9},
      {col: 7, row: 0, val: 8},
      {col: 1, row: 1, val: 4},
      {col: 2, row: 1, val: 6},
      {col: 0, row: 2, val: 7},
      {col: 3, row: 2, val: 4},
      {col: 5, row: 2, val: 2},
      {col: 6, row: 2, val: 1},
      {col: 0, row: 3, val: 6},
      {col: 5, row: 3, val: 1},
      {col: 6, row: 3, val: 4},
      {col: 8, row: 3, val: 8},
      {col: 3, row: 4, val: 6},
      {col: 4, row: 4, val: 3},
      {col: 7, row: 4, val: 2},
      {col: 0, row: 5, val: 9},
      {col: 1, row: 5, val: 2},
      {col: 2, row: 5, val: 7},
      {col: 8, row: 5, val: 3},
      {col: 0, row: 6, val: 1},
      {col: 3, row: 6, val: 9},
      {col: 6, row: 6, val: 8},
      {col: 7, row: 6, val: 4},
      {col: 1, row: 7, val: 9},
      {col: 0, row: 8, val: 4},
      {col: 7, row: 8, val: 6},        
    ],
};
export default handleActions<SudokuState, SudokuCell>(
  {
    [FILL_CELL]: (state: SudokuState, action: Action<number>) => {
      return action.payload 
        ? Object.assign({}, state, {data: [...state.data, action.payload]})
        : state;
    },
  },
  InitialState);
