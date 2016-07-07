const React = require('react');

const LoginForm = require('./login_form');

const Splash = React.createClass({

  render() {
    return (
      <div id="splash-bg">
        <p id="splash-title">
          A messaging app for teams who serve the Indiana town of Pawnee!!
          <p>Find Your Team and Get to Work</p>
          <p>The Department of Parks and Recreation is one of tens of thousands of teams around the world using Slamk to make their working lives simpler, more pleasant, and more productive.</p>
        </p>
        <div id="login-container">
          <div id="login-background"></div>
          <LoginForm />
        </div>
      </div>
    );
  }
});

module.exports = Splash;
