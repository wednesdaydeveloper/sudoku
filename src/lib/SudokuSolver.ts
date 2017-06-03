export namespace Sudoku {

  export interface Cell {
    row: number;
    col: number;
  }

  export interface SolvedCell extends Cell {
    val: number;
  }

  interface UnsolvedCell extends Cell {
    unused: number[];
  }

  export class Solver {
    static readonly Size: number = 9;

    static readonly AllValues = Array.from({ length: Solver.Size }, (v, k) => k + 1);

    static readonly SubBlockMask = [
      [0, 0, 0, 1, 1, 1, 2, 2, 2],
      [0, 0, 0, 1, 1, 1, 2, 2, 2],
      [0, 0, 0, 1, 1, 1, 2, 2, 2],
      [3, 3, 3, 4, 4, 4, 5, 5, 5],
      [3, 3, 3, 4, 4, 4, 5, 5, 5],
      [3, 3, 3, 4, 4, 4, 5, 5, 5],
      [6, 6, 6, 7, 7, 7, 8, 8, 8],
      [6, 6, 6, 7, 7, 7, 8, 8, 8],
      [6, 6, 6, 7, 7, 7, 8, 8, 8],
    ];

    readonly InitialCell: SolvedCell[];

    constructor(input: number[][]) {
      this.InitialCell = [];
      for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
          const val = input[row][col];
          if (val > 0) {
            this.InitialCell.push({ row, col, val });
          }
        }
      }
    }

    answerArray(results: SolvedCell[]): number[][] {
      const answer = new Array<Array<number>>(Solver.Size);
      for (let row = 0; row < Solver.Size; row++) {
        answer[row] = new Array<number>(Solver.Size);
        for (let col = 0; col < Solver.Size; col++) {
          const cell = results.find(c => c.row === row && c.col === col);
          if (cell) {
            answer[row][col] = cell.val;
          }
        }
      }
      return answer;
    }

    unUsedValues(currentCell: Cell, solvedCells: SolvedCell[]) {
      const block = Solver.SubBlockMask[currentCell.row][currentCell.col];
      const usedValues = solvedCells
        .filter(cell =>
          cell.row === currentCell.row ||
          cell.col === currentCell.col ||
          Solver.SubBlockMask[cell.row][cell.col] === block)
        .map(cell => cell.val);

      return Solver.AllValues.filter((val: number) => usedValues.find(v => v === val) === undefined);
    }
    solve(results: SolvedCell[] = []): number[][] {

      const solvedCells: SolvedCell[] = [...this.InitialCell, ...results];

      const unsolvedCells: UnsolvedCell[] = [];
      for (let row = 0; row < Solver.Size; row++) {
        for (let col = 0; col < Solver.Size; col++) {
          if (!solvedCells.some(cell => cell.row === row && cell.col === col)) {
            const unused = this.unUsedValues({ row, col }, solvedCells);
            unsolvedCells.push({ row, col, unused });
          }
        }
      }

      if (unsolvedCells.length === 0) {
        return this.answerArray(solvedCells);
      } else {
        if (unsolvedCells.every(cell => cell.unused.length > 0)) {

          const head = unsolvedCells
            .reduce((cell1, cell2) => cell1.unused.length < cell2.unused.length ? cell1 : cell2);
          if (head) {
            const solvedCell = {
              row: head.row,
              col: head.col,
              blk: Solver.SubBlockMask[head.row][head.col],
              val: 0
            };
            const answers = head.unused
              .map(val => this.solve([...results, { ...solvedCell, val }]))
              .filter(p => p.length !== 0);
            if (answers.length === 1) {
              return answers[0];
            }
          }
        }
      }
      return new Array<Array<number>>();
    }

    isOK(solvedCells: SolvedCell[], pred: (cell: Cell) => boolean) {
      const array = solvedCells.filter(pred)
        .map(cell => cell.val)
        .sort();

      if (array.length !== Solver.Size) {
        return false;
      } else {
        for (let i = 0; i < Solver.Size; i++) {
          if (array[i] !== (i + 1)) {
            return false;
          }
        }
      }
      return true;
    }

    isFilled(results: SolvedCell[]): boolean {
      const solvedCells: SolvedCell[] = [...this.InitialCell, ...results];

      if (solvedCells.length !== Solver.Size * Solver.Size) {
        return false;
      }
      for (let row = 0; row < Solver.Size; row++) {
        for (let col = 0; col < Solver.Size; col++) {
          if (!solvedCells.some(cell => cell.row === row && cell.col === col)) {
            return false;
          }
        }
      }
      return true;
    }

    isSolved(results: SolvedCell[]): boolean {
      const solvedCells: SolvedCell[] = [...this.InitialCell, ...results];

      for (let row = 0; row < Solver.Size; row++) {
        if (!this.isOK(solvedCells, (cell: Cell) => cell.row === row)) {
          return false;
        }
      }
      for (let col = 0; col < Solver.Size; col++) {
        if (!this.isOK(solvedCells, (cell: Cell) => cell.col === col)) {
          return false;
        }
      }
      for (let blk = 0; blk < Solver.Size; blk++) {
        if (!this.isOK(solvedCells, (cell: Cell) => Solver.SubBlockMask[cell.row][cell.col] === blk)) {
          return false;
        }
      }
      return true;
    }
  }
} 