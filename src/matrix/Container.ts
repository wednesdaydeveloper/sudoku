import Counter, {StateProps, DispatchProps} from './Matrix';
import {fillCell} from './module';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {SudokuState} from '../State';

function mapStateToProps(state: SudokuState): StateProps {
  return {
    data: state.data,
  };
}

type DispatchType = (col: number, row: number, val: number) => void;

function mapDispatchToProps(dispatch: Dispatch<DispatchType>): DispatchProps {
  return {
     onFillCell: (col: number, row: number, val: number) => dispatch(fillCell(col, row, val)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);