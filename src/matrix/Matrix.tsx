import * as React from 'react';
import {SudokuCell} from '../State';

export interface StateProps {
  data: SudokuCell[];
}

export interface DispatchProps {
    onFillCell: (col: number, row: number, val: number) => void;
}

const Matrix = (props: StateProps) => {
    const array: SudokuCell[][] = new Array<Array<SudokuCell>>(9);
    for (let row = 0; row < 9; row++) {
        array[row] = new Array<SudokuCell>(9);
        for (let col = 0; col < 9; col++) {
            const cell = props.data.find(c => c.col === col && c.row === row);
            array[row][col] = cell ? cell : {col, row};
        }
    }

    return (
        <div>
            <table>
                <tbody>
{array.map(row => <tr>{row.map(cell => <td><p>{cell.val}</p></td>)}</tr>)}
                </tbody>
            </table>
        </div>
      );
};
export default Matrix;