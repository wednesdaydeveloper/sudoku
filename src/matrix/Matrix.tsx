import * as React from 'react';
import { SudokuCell } from '../State';
import './Matrix.css';

export interface StateProps {
  data: SudokuCell[];
  selected: SudokuCell | undefined;
}

export interface DispatchProps {
  onSelectCell: (cell: SudokuCell) => void;
}

export type Props = StateProps & DispatchProps;

const Matrix = (props: Props) => {
  const array: SudokuCell[][] = new Array<Array<SudokuCell>>(9);
  for (let row = 0; row < 9; row++) {
    array[row] = new Array<SudokuCell>(9);
    for (let col = 0; col < 9; col++) {
      const cell = props.data.find(c => c.col === col && c.row === row);
      array[row][col] = cell ? cell : { col, row, val: 0 };
    }
  }

  const isSelected = (cell: SudokuCell) => {
    return props.selected && cell.row === props.selected.row && cell.col === props.selected.col;
  };

  const _click = (e: React.MouseEvent<HTMLTableDataCellElement>, cell: SudokuCell) => {
//    e.preventDefault();
    if (!cell.initial) {
      props.onSelectCell(cell);
    }
  };

  const getClassName = (cell: SudokuCell): string => {
    let className = '';
    if (isSelected(cell)) {
      className = className + 'selected ';
    }
    if (cell.initial) {
      className = className + 'initial ';
    }
    return className;
  };
  return (
    <div>
      <table className="sudokuTable" >
        <tbody>
          {array.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} onClick={e => _click(e, cell)} className={getClassName(cell)}>
                  <p >{cell.val < 1 ? '' : cell.val}</p>
                </td>))}
            </tr>))}
        </tbody>
      </table>
    </div>
  );
};
export default Matrix;