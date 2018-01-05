import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';

import App from './App';
import CreatePost from './components/CreatePost';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App path="/" exact />
      <CreatePost path="/create-post" exact />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
