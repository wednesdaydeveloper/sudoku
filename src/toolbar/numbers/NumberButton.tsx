import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './NumberButton.css';

export interface StateProps {
  hint: boolean;
  hasSelectedCell: boolean;
  hintResult: number[];
}

export interface DispatchProps {
  onFillCell: (val: number) => void;
}

export type Props = StateProps & DispatchProps;

export interface NumberButtonProps extends Props  {
  num: number;
}

const disabled = (props: NumberButtonProps) => {
  return props.hasSelectedCell && props.hint && props.hintResult.every(n => n !== props.num);
};

const NumberButton = (props: NumberButtonProps) => {
  return (
    <RaisedButton
      disabled={disabled(props)}
      className="numberButton"
      onClick={e => props.onFillCell(props.num)} >{props.num}</RaisedButton>
  );
};

export default NumberButton;
