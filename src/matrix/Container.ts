import Counter, {StateProps, DispatchProps} from './Matrix';
import {selectCell} from './module';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {SudokuState, SudokuCell} from '../State';

function mapStateToProps(state: SudokuState): StateProps {
  return {
    data: [...state.initialCells, ...state.resultCells],
    selected: state.selectedCell,
  };
}

type DispatchType = (col: number, row: number, val: number) => void;

function mapDispatchToProps(dispatch: Dispatch<DispatchType>): DispatchProps {
  return {
     onSelectCell: (cell: SudokuCell) => dispatch(selectCell(cell)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);