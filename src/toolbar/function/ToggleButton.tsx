import * as React from 'react';
import Toggle from 'material-ui/Toggle';

export interface Props extends React.Props<{}> {
  active: boolean;
  label: string;
  onclick: () => void;
}

const ToggleButton = (props: Props) => {
  return (
    <Toggle
      label={props.label}
      defaultToggled={props.active}
      onClick={e => props.onclick()} />
  );
};

export default ToggleButton;