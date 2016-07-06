const React = require('react');

const Toolbar = React.createClass({

  render() {
    const room = this.props.room;
    let title = (room.channel) ? `#${room.title}` : `@${room.title}${(room.size > 2) ? ',...' : ''}`;
    return (
      <div>
        <div>{title}</div>
        <div>{room.size} members</div>
      </div>
    );
  }
});

module.exports = Toolbar;
