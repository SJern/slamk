const React = require('react');

const MessageIndexItem = React.createClass({

  render() {
    let info;
    if (!this.props.showMessageOnly) {
      info = <div><b>{this.props.message.username}</b></div>;
    }
    return (
        <div>
          {info}
          <div>{this.props.message.body}</div>
        </div>
    );
  }
});

module.exports = MessageIndexItem;
