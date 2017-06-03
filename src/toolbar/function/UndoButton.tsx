import * as React from 'react';

interface Props extends React.Props<{}> {
  disabled: boolean;
  onclick: () => void;
}

const UndoButton = (props: Props) => {
  return (
    <button
      className={'btn btn-default' + (props.disabled ? ' disabled' : '')}
      onClick={e => props.onclick()}>
      {props.children}
    </button>
  );
};

export default UndoButton;