namespace Sudoku {

    interface CellBase {
        row: number;
        col: number;
    }

    interface SolvedCell extends CellBase {
        blk: number;
        val: number;
    }

    interface UnsolvedCell extends CellBase {
        unused: number[];
    }

    class Solver {
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
                        const blk = Solver.SubBlockMask[row][col];
                        this.InitialCell.push({ row, col, val, blk });
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

        solve(results: SolvedCell[] = []): number[][] {

            const solvedCells: SolvedCell[] = [...this.InitialCell, ...results];

            const unsolvedCells: UnsolvedCell[] = [];
            for (let row = 0; row < Solver.Size; row++) {
                for (let col = 0; col < Solver.Size; col++) {
                    if (!solvedCells.some(cell => cell.row === row && cell.col === col)) {
                        const block = Solver.SubBlockMask[row][col];
                        const usedVals = solvedCells
                            .filter(cell => cell.row === row || cell.col === col || cell.blk === block)
                            .map(cell => cell.val);

                        const unused = Solver.AllValues
                            .filter((val: number) => usedVals.find(v => v === val) === undefined);

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
                            val: 0};
                        const answers = head.unused
                            .map(val => this.solve([...results, { ...solvedCell, val }]))
                            .filter(p => p.length !== 0);
                        if (answers.length === 1) {
                            return answers[0];
                        }
                    }
                }
            }
            return new Array<Array< number>>();
        }
    }

    // const array = [
    //     [2, 0, 0, 0, 0, 9, 0, 8, 0, ],
    //     [0, 4, 6, 0, 0, 0, 0, 0, 0, ],
    //     [7, 0, 0, 4, 0, 2, 1, 0, 0, ],
    //     [6, 0, 0, 0, 0, 1, 4, 0, 8, ],
    //     [0, 0, 0, 6, 3, 0, 0, 2, 0, ],
    //     [9, 2, 7, 0, 0, 0, 0, 0, 3, ],
    //     [1, 0, 0, 9, 0, 0, 8, 4, 0, ],
    //     [0, 9, 0, 0, 0, 0, 0, 0, 0, ],
    //     [4, 0, 0, 0, 0, 0, 0, 6, 0, ],
    // ];
    // var solver = new Solver(array);
    // var answer = solver.solve();
    // answer.forEach(row => console.log(row.join(' ')));
} 