var React = require('react');
var Sidebar = require('react-sidebar').default;

const FavoriteStore = require('../stores/favorite_store');
const FavoriteActions = require('../actions/favorite_actions');
const SessionStore = require('../stores/session_store');
const MessageStore = require('../stores/message_store');

var FavoriteSideBar = React.createClass({
  getInitialState: function() {
    return {sidebarOpen: false, favorites: []};
  },
  componentDidMount(){
    this.favoriteStoreListener = FavoriteStore.addListener(this.onChange);
  },
  componentWillUnmount(){
    this.favoriteStoreListener.remove();
  },
  onChange(){
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
        return <li>{favorite}</li>;
      })}
      </ul>
    );
  }


    return (
      <Sidebar sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               onSetOpen={this.onSetSidebarOpen}
               pullRight={true}>
        <b>Main content</b>
        {sidebarContent}
      </Sidebar>
    );
  }
});

module.exports = FavoriteSideBar;
