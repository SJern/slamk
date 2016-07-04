const React = require('react');
const ReactDOM = require('react-dom');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const App = require('./components/app');
const Splash = require('./components/splash');

const Room = require('./components/room');

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Splash } />
      <Route path="/messages" component={ Room } />
    </Route>
  </Router>
);

window.SessionStore = require('./stores/session_store');
window.MessageApiUtil = require('./util/message_api_util');

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('content');
  ReactDOM.render(appRouter, root);
});
