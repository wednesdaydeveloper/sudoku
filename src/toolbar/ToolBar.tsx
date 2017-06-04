import * as React from 'react';

import Numbers from './numbers/Container';
import Functions from './function/Container';

export interface StateProps {
}

export interface DispatchProps {
}

const ToolBar = (props: StateProps & DispatchProps) => {
  return (
    <div className="btn-toolbar toolbox" role="toolbar">
      <Numbers />

      <Functions />
    </div>
  );
};

export default ToolBar;