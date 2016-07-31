const React = require('react');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const Navigation = require('./navigation');
const Room = require('./room');
const RoomApiUtil = require('../util/room_api_util');

const FavBar = require('./fav-sidebar');
const Shepherd = require('tether-shepherd');

const Chat = React.createClass({
  getInitialState() {
    return { room: {id: 1} };
  },
  setRoom(room) {
    this.setState({room: room});
  },
  componentWillMount() {
    RoomApiUtil.fetchSingleRoomByTitle(this.props.params.roomTitle,
      this.setRoom,
      () => hashHistory.push("/messages/general")
    );
  },
  componentDidMount() {
    this.tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-dark',
        scrollTo: true,
        showCancelLink: true
      }
    });
    this.tour.addStep('welcome', {
      showCancelLink: false,
      text: ['Hi there!', 'Slamk is a real-time-messaging application built with React.js and WebSockets. Let me give you a quick tour around.'],
      buttons: [
        {
          text: 'Next',
          action: this.tour.next,
        }
      ]
    });
    this.tour.addStep('join', {
      title: 'Join a Channel',
      text: 'You can click to join many different channels.',
      attachTo: '.menu-title right',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: this.tour.back
        }, {
          text: 'Next',
          action: this.tour.next
        }
      ]
    });
    this.tour.addStep('create-channels', {
      title: 'Open New Channels',
      text: 'You can create your own channels that other users can join.',
      attachTo: '.channels-menu svg right',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: this.tour.back
        }, {
          text: 'Next',
          action: this.tour.next
        }
      ]
    });
    this.tour.addStep('leave-channels', {
      title: 'Leave Channels',
      text: 'Click to leave a room. If you were the last member of a room, that room would be removed from database as well.',
      attachTo: '.delete-button svg right',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: this.tour.back
        }, {
          text: 'Next',
          action: this.tour.next
        }
      ]
    });
    this.tour.addStep('create-DMs', {
      title: 'Start Private Chats',
      text: 'You can start private conversations and invite team members to join.',
      attachTo: '.dms-menu svg right',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: this.tour.back
        }, {
          text: 'Next',
          action: this.tour.next
        }
      ]
    });
    this.tour.addStep('star', {
      title: 'Star Messages',
      text: 'Click to add/remove favorite messages.',
      attachTo: '#msgs_scroller_div  > div:last-child > .message-body .favorite-button right',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: this.tour.back
        }, {
          text: 'Next',
          action: this.tour.next
        }
      ]
    });
    this.tour.addStep('snippet', {
      title: 'Source Code Editor',
      text: 'You can click here to create and send source code snippets to other team members. Snippets will be generated through jQuery AJAX requests to the GitHub API.',
      attachTo: '#messages-input-container .input-group-addon top',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: this.tour.back
        }, {
          text: 'Next',
          action: this.tour.next
        }
      ]
    });
    this.tour.addStep('favorites', {
      title: 'Favorite Messages',
      text: 'You can view or hide your favorite messages by toggling the star icon near the upper-right corner.',
      attachTo: '.favorite-container left',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: this.tour.back
        }, {
          text: 'Next',
          action: this.tour.next
        }
      ]
    });
    this.tour.addStep('favorites', {
      showCancelLink: false,
      text: [
        'Slamk was built using WebSockets, so everything is real-time. Feel free to open another Slamk in an incognito window to message yourself for fun!',
        "And that's about it, Ladies and Gentlemen.",
        'Now, go find your team and get to work!'
      ],
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: this.tour.back
        }, {
          text: 'Done',
          action: this.tour.next
        }
      ]
    });

    this.tour.start();
  },
  componentWillReceiveProps(nextProps) {
    RoomApiUtil.fetchSingleRoomByTitle(nextProps.params.roomTitle,
      this.setRoom,
      () => hashHistory.push("/messages/general")
    );
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return ((this.state.room.id === 1) || (nextState.room.id !== this.state.room.id) || (nextState.room.size > this.state.room.size));
  },
  componentWillUnmount() {
    this.tour.cancel();
  },
  render() {
    return (
      <div id="client-ui">
        <Navigation room={this.state.room} />
        <Room room={this.state.room} />
        <FavBar roomId={this.state.room.id} />
      </div>
    );
  }
});

module.exports = Chat;
