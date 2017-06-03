import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Matrix from './matrix/Container';
import ToolBar from './toolbar/ToolBar';
import MessageContainer from './message/Container';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import store from './Store';

ReactDOM.render(
  <Provider store={store}>
  <div className="panel panel-default">
      <div className="panel-heading">
        <label>数独</label>
      </div>
      <div className="panel-body">
        <Matrix />
      </div>
      <div className="panel-footer">
        <ToolBar />
        <MessageContainer />
      </div>
      
    </div>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
