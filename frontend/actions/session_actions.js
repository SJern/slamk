const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');
const SessionApiUtil = require('../util/session_api_util');
const ErrorActions = require('./error_actions');
const hashHistory = require('react-router').hashHistory;

const SessionActions = {

  signUp(formData){
    SessionApiUtil.signUp(formData,
      this.receiveCurrentUser,
      ErrorActions.setErrors);
  },

  logIn(formData){
    SessionApiUtil.logIn(formData,
      this.receiveCurrentUser,
      ErrorActions.setErrors);
  },

  demoIn() {
    SessionApiUtil.demoIn(this.receiveCurrentUser,
    ErrorActions.setErrors);
  },

  logOut() {
    SessionApiUtil.logOut(this.removeCurrentUser);
    window.currentUser = undefined;
  },

  receiveCurrentUser(currentUser) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: currentUser
    });
  },

  removeCurrentUser() {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
    hashHistory.push("/");
  }

};

module.exports = SessionActions;
