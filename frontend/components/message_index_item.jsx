const React = require('react');
const GistEmbed = require('../util/gist_embed');

const MessageIndexItem = React.createClass({

  render() {
    let info, body;
    const message = this.props.message;
    if (!this.props.showMessageOnly) {
      info = (<div>
        <div><b>{message.username}</b></div>
        <div>{(new Date(message.created_at)).toString().slice(4, 21)}</div>
      </div>);
    }
    if (/^https:\/\/gist\.github\.com\//.test(message.body)) {
      const gistId = message.body.match(/\w+$/)[0];
      body = <GistEmbed gistId={gistId}/>;
    } else {
      body = <div>{message.body}</div>;
    }
    return (
        <div>
          {info}
          {body}
        </div>
    );
  }
});

module.exports = MessageIndexItem;
