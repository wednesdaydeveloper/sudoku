import Numbers from './Numbers';
import {StateProps, DispatchProps} from './NumberButton';

import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {fillCell} from '../../matrix/module';
import {SudokuState} from '../../State';

function mapStateToProps(state: SudokuState): StateProps {
  return {
    hint: state.hint,
    hintResult: state.hintResult,
    hasSelectedCell: state.selectedCell !== undefined,
  };
}

type DispatchType = (val: number) => void;

function mapDispatchToProps(dispatch: Dispatch<DispatchType>): DispatchProps {
  return {
     onFillCell: (val: number) => dispatch(fillCell(val)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Numbers);