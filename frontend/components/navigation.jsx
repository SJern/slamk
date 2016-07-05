const React = require('react');

const Navigation = React.createClass({
  render() {
    return (
      <div>
        {this.props.room.title}
      </div>
    );
  }
});

module.exports = Navigation;
