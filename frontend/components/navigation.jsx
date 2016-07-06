const React = require('react');
const Menu = require('./menu');
const RoomsIndex = require('./rooms_index');

const Navigation = React.createClass({
  render() {
    return (
      <div>
        <Menu />
        <RoomsIndex currentRoom={this.props.room} />
      </div>
    );
  }
});

module.exports = Navigation;
