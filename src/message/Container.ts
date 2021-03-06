import MessageComponet, {StateProps, DispatchProps} from './Message';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {SudokuState} from '../State';

function mapStateToProps(state: SudokuState): StateProps {
  return {
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch: Dispatch<void>): DispatchProps {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageComponet);