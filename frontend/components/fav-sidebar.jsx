var React = require('react');

const FavoriteStore = require('../stores/favorite_store');
const FavoriteActions = require('../actions/favorite_actions');
const SessionStore = require('../stores/session_store');
const MessageStore = require('../stores/message_store');

const Favorites = require('./favorites');

const FavoriteSideBar = React.createClass({
  getInitialState(){
    return { hidden: true , buttonText: "☆"};
  },
  togglePanel(e){
    e.preventDefault();
      if (this.state.hidden === true) {
        this.setState({hidden: false, buttonText: "	★"});
      } else {
        this.setState({hidden: true, buttonText: "☆"});
      }
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
      <div className="favorite-container">
        <button className="favorite-star" onClick={this.togglePanel}>{this.state.buttonText}</button>
        {content}
      </div>
    );
  }
});

module.exports = FavoriteSideBar;
