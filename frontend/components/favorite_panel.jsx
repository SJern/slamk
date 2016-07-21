const React = require('react');

const FavoritePanel = React.createClass({
  getInitialState(){
    return { visible: false};
  },
  show(){
    this.setState({ visible: true});
  }
});
