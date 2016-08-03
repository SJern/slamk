const React = require('react');
const ReactDOM = require('react-dom');
const MessageStore = require('../stores/message_store');
const MessageActions = require('../actions/message_actions');
const MessageIndexItem = require('./message_index_item');

const GistEmbed = require('../util/gist_embed');

const MessagesIndex = React.createClass({
  getInitialState() {
    return { messages: MessageStore.all() };
  },
  componentDidMount() {
    this.messagesListener = MessageStore.addListener(this.handleChange);
    MessageActions.fetchRoomMessages(this.props.roomId);
    this.pusher = new Pusher('0d04cf841bc3ee166b79', {
      encrypted: true
    });
    let channel = this.pusher.subscribe(`room_${this.props.roomId}`);
    channel.bind('message_created', function(data) {
      const message = data.message;
      message.username = data.username
      MessageActions.receiveSingleMessage(message);
    });
  },
  componentDidUpdate: function() {
    const node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  },
  componentWillReceiveProps(nextProps) {
    MessageActions.fetchRoomMessages(nextProps.roomId);
    this.pusher.unsubscribe(`room_${this.props.roomId}`);
    let channel = this.pusher.subscribe(`room_${nextProps.roomId}`);
    channel.bind('message_created', function(data) {
      const message = data.message;
      message.username = data.username
      MessageActions.receiveSingleMessage(message);
    });
  },
  componentWillUnmount() {
    this.messagesListener.remove();
    this.pusher.unsubscribe(`room_${this.props.roomId}`);
  },
  handleChange() {
    this.setState({ messages: MessageStore.all() });
  },
  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  },
  render() {
    return (
      <div id="msgs_scroller_wrapper">
        <div id="msgs_scroller_div">
          {this.state.messages.map((message, idx) => {
            const showMessageOnly = (idx && (this.state.messages[idx - 1].user_id === message.user_id));
            return <MessageIndexItem scroll={this.scrollToBottom} message={message}
              showMessageOnly={showMessageOnly} key={message.id} />;
          })}
        </div>
      </div>
    );
  }
});

module.exports = MessagesIndex;
