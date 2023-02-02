import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onNavigate, defaultHistory }) => {
  // this history is for routing inside of marketing app
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  // this object gets sent to the container
  // then we can use the callback so the container can commuicate
  // the browser url path to the marketing app
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  }
}

// situation 1
// if we are in development and in isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    // Use browser history when in development, instead of memory history
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// situation 2
// we are running through container
export { mount };