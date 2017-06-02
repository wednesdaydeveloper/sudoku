import * as React from 'react';
import {SudokuCell} from '../State';

export interface StateProps {
  data: SudokuCell[];
  selected: SudokuCell | undefined;
}

export interface DispatchProps {
    onSelectCell: (cell: SudokuCell) => void;
}

const Matrix = (props: StateProps & DispatchProps) => {
    const array: SudokuCell[][] = new Array<Array<SudokuCell>>(9);
    for (let row = 0; row < 9; row++) {
        array[row] = new Array<SudokuCell>(9);
        for (let col = 0; col < 9; col++) {
            const cell = props.data.find(c => c.col === col && c.row === row);
            array[row][col] = cell ? cell : {col, row, val: 0};
        }
    }

    const isSelected = (cell: SudokuCell) => {
        return props.selected && cell.row === props.selected.row && cell.col === props.selected.col;
    };

    const _click = (e: React.MouseEvent<HTMLTableDataCellElement>, cell: SudokuCell) => {
        e.preventDefault();
        props.onSelectCell(cell);
    };

    const getClassName = (cell: SudokuCell) : string => {
        let className = '';
        if (isSelected(cell)) {
            className = className + 'selected ';
        }
        if (cell.initial) {
            className = className + 'initial ' ;
        }
        return className;
    };
    return (
        <div>
            <table className="sudokuTable" >
                <tbody>
{array.map(row => <tr>{row.map(cell => <td onClick={e => _click(e, cell)} className={getClassName(cell)}><p >{cell.val < 1 ? '' : cell.val}</p></td>)}</tr>)}
                </tbody>
            </table>
        </div>
      );
};
export default Matrix;