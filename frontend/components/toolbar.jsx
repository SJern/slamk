const React = require('react');

const Toolbar = React.createClass({

  render() {
    return <h1>{this.props.title}</h1>;
  }
});

module.exports = Toolbar;
