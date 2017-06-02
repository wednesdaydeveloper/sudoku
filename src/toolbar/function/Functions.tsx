import * as React from 'react';

export interface StateProps {
    hint: boolean;
    teacher: boolean;
}

export interface DispatchProps {
    onToggleHint: () => void;
    onToggleTeacher: () => void;
}

const Functions = (props: StateProps & DispatchProps) => {

    const getClassName  = (b: boolean): string => 'btn btn-default' + (b ? 'active' : '');

    return (
          <div className="btn-group" data-toggle="buttons">
            <button className={getClassName(props.hint)}    onClick={e => props.onToggleHint()}   >hint</button>
            <button className={getClassName(props.teacher)} onClick={e => props.onToggleTeacher()}>teacher</button>
          </div>
    );
};

export default Functions;