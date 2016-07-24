var React = require('react');
var Sidebar = require('react-sidebar').default;

const FavoriteStore = require('../stores/favorite_store');
const FavoriteActions = require('../actions/favorite_actions');
const SessionStore = require('../stores/session_store');
const MessageStore = require('../stores/message_store');

const Favorites = require('./favorites');

const FavoriteSideBar = React.createClass({
  getInitialState(){
    return { hidden: true , buttonText: "Show Favorites"};
  },
  togglePanel(e){
    e.preventDefault();
      if (this.state.hidden === true) {
        this.setState({hidden: false, buttonText: "Hide Favorites"});
    // $("#nav").stop().animate({marginTop:"-100px"}, 200);
      } else {
        this.setState({hidden: true, buttonText: "Show Favorites"});
    // $("#nav").stop().animate({marginTop:"0px"}, 200);
      }
    // this.setState( {hidden: false} );
},
  render: function() {
    let content;
    if (this.state.hidden === true){
      content = "";
    } else {
      content = (
        <Favorites roomId={this.props.roomId}/>
      );
    }
    return (
      <div>
        <button onClick={this.togglePanel}>{this.state.buttonText}</button>
        {content}
      </div>
    );
  }
});

module.exports = FavoriteSideBar;
