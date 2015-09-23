var React = require('react');
var Firebase = require('firebase');
var rootUrl= "https://zimgur.firebaseio.com/";
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  componentWillMount: function(){
    this.fb = new Firebase(rootUrl + 'subs/' + this.props.sub.key);
  },
  render: function(){
    return(<li key={this.props.sub.sub}>
      <Link activeClassName="active" to={"gallery/r/" + this.props.sub.sub}>
        /r/{this.props.sub.sub}
      </Link>
    </li>);
  }
});
