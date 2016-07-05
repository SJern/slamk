const React = require('react');

const Navigation = React.createClass({
  render() {
    return (
      <div>
        {this.props.check}
      </div>
    );
  }
});

module.exports = Navigation;
