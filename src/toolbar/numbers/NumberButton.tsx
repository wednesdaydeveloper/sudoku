import * as React from 'react';

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

const getClassName = (props: NumberButtonProps) => {
  return !props.hasSelectedCell || !props.hint || props.hintResult.some(n => n === props.num)
    ? 'btn btn-default'
    : 'btn btn-default disabled';
};

 const NumberButton = (props: NumberButtonProps) => {
  return (
    <button className={getClassName(props)} onClick={e => props.onFillCell(props.num)}>
      {props.num}
    </button>
  );
};

export default NumberButton;
