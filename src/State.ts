import * as sudoku  from './lib/SudokuSolver'

export interface SudokuCell extends sudoku.Sudoku.Cell {
  val: number;
  initial?: boolean;
};

export interface SudokuState {
  initialCells: SudokuCell[];
  resultCells: SudokuCell[];
  selectedCell: SudokuCell | undefined;
  hint: boolean;
  teacher: boolean;
};