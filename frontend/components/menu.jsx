const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const Menu = React.createClass({
  handleSignOut(e) {
    e.preventDefault();
    SessionActions.logOut();
  },
  render() {
    return (
      <div>
        <h4>Parks and App::creation</h4>
        <h3>Hi, {SessionStore.currentUser().username}</h3>
        <button onClick={this.handleSignOut} >Sign out</button>
      </div>
    );
  }
});

module.exports = Menu;
