const React = require('react');

const MessageIndexItem = React.createClass({

  render() {
    let info;
    const message = this.props.message;
    if (!this.props.showMessageOnly) {
      info = (<div>
        <div><b>{message.username}</b></div>
        <div>{(new Date(message.created_at)).toString().slice(4, 21)}</div>
      </div>);
    }
    return (
        <div>
          {info}
          <div>{message.body}</div>
        </div>
    );
  }
});

module.exports = MessageIndexItem;
