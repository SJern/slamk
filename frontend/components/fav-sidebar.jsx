var React = require('react');
var Sidebar = require('react-sidebar').default;

const FavoriteStore = require('../stores/favorite_store');
const FavoriteActions = require('../actions/favorite_actions');
const SessionStore = require('../stores/session_store');
const MessageStore = require('../stores/message_store');

const Favorites = require('./favorites');

const styling = {
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  sidebar: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    transition: 'left .3s ease-out, right .3s ease-out',
  },
  overlay: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease-out',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  dragHandle: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    bottom: 0,
  },
};

var FavoriteSideBar = React.createClass({
  getInitialState: function() {
    return {sidebarOpen: false, favorites: []};
  },
  componentDidMount(){
    this.favoriteStoreListener = FavoriteStore.addListener(this._onChange);
  },
  componentWillUnmount(){
    this.favoriteStoreListener.remove();
  },
  _onChange(){
    let currentUser = SessionStore.currentUser();
    this.setState({favorites: FavoriteStore.findByUser(currentUser.id)});
  },
  onSetSidebarOpen: function(open) {
    this.setState({sidebarOpen: open});
  },
  render: function() {
    var sidebarContent = "";

    if (this.props.favorite){
    sidebarContent = (
      <ul>
      {this.props.favorites.forEach( favorite => {
        return <li>Favorites </li>;
      })}
      </ul>
    );
  }

    return (
      <Sidebar styles={styling}
               sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               onSetOpen={this.onSetSidebarOpen}
               docked={false}
               transitions={true}
               pullRight={true}>
        <Favorites roomId={this.props.roomId}/>
      </Sidebar>
    );
  }
});

module.exports = FavoriteSideBar;
