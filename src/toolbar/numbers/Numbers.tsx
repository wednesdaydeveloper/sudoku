import * as React from 'react';

export interface StateProps {
}

export interface DispatchProps {
    onFillCell: (val: number) => void;
}

const Numbers = (props: StateProps & DispatchProps) => {

    return (
        <div className="btn-group" role="group">
            {[1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9, ].map(num => <button className="btn btn-default" onClick={e => props.onFillCell(num)}>{num}</button>)}
        </div>
    );
};

export default Numbers;