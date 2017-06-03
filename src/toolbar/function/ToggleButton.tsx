import * as React from 'react';

interface Props extends React.Props<{}> {
  active: boolean;
  onclick: () => void;
}

const ToggleButton = (props: Props) => {
  return (
    <button
      className={'btn btn-default' + (props.active ? ' active' : '')}
      onClick={e => props.onclick()}>
      {props.children}
    </button>
  );
};

export default ToggleButton;