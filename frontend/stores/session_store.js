const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const SessionConstants = require('../constants/session_constants');

const SessionStore = new Store(AppDispatcher);

let _currentUser = {};

const _login = function(currentUser) {
  _currentUser = currentUser;
  SessionStore.__emitChange();
};

const _logout = function() {
  _currentUser = {};
  SessionStore.__emitChange();
};

SessionStore.__onDispatch = payload => {
  switch(payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.currentUser);
      break;
    case SessionConstants.LOGOUT:
    	_logout();
      break;
  }
};

SessionStore.currentUser = function() {
  return Object.assign({}, _currentUser);
};

SessionStore.isUserLoggedIn = function() {
  return !!_currentUser.id;
};

module.exports = SessionStore;
