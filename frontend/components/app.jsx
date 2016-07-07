const React = require('react');
const SessionStore = require('../stores/session_store');

const App = React.createClass({

  componentDidMount() {
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  render() {
    return (
      <div id="app">
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
