import Functions, {StateProps, DispatchProps} from './Functions';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {toggleHint, toggleTeacher} from '../../matrix/module';
import {SudokuState} from '../../State';

function mapStateToProps(state: SudokuState): StateProps {
  return {
    hint: state.hint,
    teacher: state.teacher,
  };
}

type DispatchType = () => void;

function mapDispatchToProps(dispatch: Dispatch<DispatchType>): DispatchProps {
  return {
     onToggleHint: () => dispatch(toggleHint()),
     onToggleTeacher: () => dispatch(toggleTeacher()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Functions);