import * as React from 'react';

import Numbers from './numbers/Container';
import Functions from './function/Container';

export interface StateProps {
}

export interface DispatchProps {
}

const ToolBar = (props: StateProps & DispatchProps) => {
    return (
    <div className="panel-footer">
        <div className="btn-toolbar" role="toolbar">
          <Numbers />

          <Functions />
          <div className="btn-group" role="group">
            <button className="btn btn-default">give up</button>
          </div>
        </div>
      </div>
    );
};

export default ToolBar;