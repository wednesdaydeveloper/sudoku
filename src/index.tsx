import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Matrix from './matrix/Container';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Provider} from 'react-redux';
import store from './Store';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Matrix />
    </div>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
