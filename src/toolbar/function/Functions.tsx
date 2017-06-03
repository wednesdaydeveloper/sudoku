import * as React from 'react';
import ToggleButton from './ToggleButton';
import UndoButton from './UndoButton';

export interface StateProps {
    hint: boolean;
    teacher: boolean;
    canUndo: boolean;
}

export interface DispatchProps {
    onToggleHint: () => void;
    onToggleTeacher: () => void;
    onUndo: () => void;
}

const Functions = (props: StateProps & DispatchProps) => {

    return (
        <div>
          <div className="btn-group" data-toggle="buttons">
            <ToggleButton active={props.hint} onclick={props.onToggleHint} >hint</ToggleButton>
            <ToggleButton active={props.teacher} onclick={props.onToggleTeacher} >teacher</ToggleButton>
          </div>

          <div className="btn-group" role="group">
            <UndoButton disabled={!props.canUndo} onclick={props.onUndo} >Undo</UndoButton>
          </div>

        </div>
    );
};

export default Functions;