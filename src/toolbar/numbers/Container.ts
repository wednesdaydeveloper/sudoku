import Numbers, {StateProps, DispatchProps} from './Numbers';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {fillCell} from '../../matrix/module';
import {SudokuState} from '../../State';

function mapStateToProps(state: SudokuState): StateProps {
  return {};
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