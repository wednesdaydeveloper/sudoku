import * as sudoku  from './lib/SudokuSolver';

export interface SudokuCell extends sudoku.Sudoku.SolvedCell {
  initial?: boolean;
};

export interface Message {
  messageString: string;
  messageType: string;
} 

export interface SudokuState {
  initialCells: SudokuCell[];
  resultCells: SudokuCell[];
  selectedCell: SudokuCell | undefined;
  hint: boolean;
  teacher: boolean;
  hintResult: number[];
  solved: boolean;
  messages: Message[];
};