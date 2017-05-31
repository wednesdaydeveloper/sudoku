
export interface SudokuCell {
  col: number;
  row: number;
  val?: number;
};

export interface SudokuState {
  data: SudokuCell[];
};