const React = require('react');
const ReactDOM = require('react-dom');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const SessionActions = require('./actions/session_actions');
const App = require('./components/app');
const Splash = require('./components/splash');
const Chat = require('./components/chat');



const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Splash } />
      <Route path="/messages/:roomTitle" component={ Chat } />
    </Route>
  </Router>
);



window.SessionStore = require('./stores/session_store');
window.MessageApiUtil = require('./util/message_api_util');
window.RoomApiUtil = require('./util/room_api_util');


document.addEventListener('DOMContentLoaded', () => {
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }

  const root = document.getElementById('content');
  ReactDOM.render(appRouter, root);
});
