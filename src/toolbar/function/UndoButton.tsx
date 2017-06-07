import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export interface Props extends React.Props<{}> {
  disabled: boolean;
  onclick: () => void;
}

const UndoButton = (props: Props) => {
  return (
    <RaisedButton
      disabled={props.disabled}
      onClick={e => props.onclick()}>
      {props.children}
    </RaisedButton>
  );
};

export default UndoButton;