import Functions, {StateProps, DispatchProps} from './Functions';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {toggleHint, toggleTeacher, undo} from '../../matrix/module';
import {SudokuState} from '../../State';

function mapStateToProps(state: SudokuState): StateProps {
  return {
    hint: state.hint,
    teacher: state.teacher,
    canUndo: state.resultCells.length > 0
  };
}

type DispatchType = () => void;

function mapDispatchToProps(dispatch: Dispatch<DispatchType>): DispatchProps {
  return {
     onToggleHint: () => dispatch(toggleHint()),
     onToggleTeacher: () => dispatch(toggleTeacher()),
     onUndo: () => dispatch(undo()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Functions);