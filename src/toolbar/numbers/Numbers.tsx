import * as React from 'react';

export interface StateProps {
  hint: boolean;
  hasSelectedCell: boolean;
  hintResult: number[];
}

export interface DispatchProps {
  onFillCell: (val: number) => void;
}

type Props = StateProps & DispatchProps;

interface ButtonProps extends Props {
  num: number;
}

const getClassName = (props: ButtonProps) => {
  return !props.hasSelectedCell || !props.hint || props.hintResult.some(n => n === props.num)
    ? 'btn btn-default '
    : 'btn btn-default disabled';
};

const Button = (props: ButtonProps) => {
  return (
    <button className={getClassName(props)} onClick={e => props.onFillCell(props.num)}>
      {props.num}
    </button>
  );
};

const Numbers = (props: Props) => {
  return (
    <div className="btn-group" role="group">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, ].map(num => <Button {...props} num={num} />)}
    </div>
  );
};

export default Numbers;