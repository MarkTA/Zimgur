var React = require('react');
var Firebase = require('firebase');
var rootUrl= "https://zimgur.firebaseio.com/";
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  getInitialState: function(){
    return {
    }
  },
  componentWillMount: function(){
    this.fb = new Firebase(rootUrl + 'subs/' + this.props.sub.key);
  },
  render: function(){
    return(<div>
          <Link to={"gallery/r/" + this.props.sub.sub}
            className="list-group-item"
            key={this.props.sub.sub}>
          <h4>/r/{this.props.sub.sub}</h4>
        </Link>
        <button
            className="btn btn-default closethis"
            onClick={this.handleDeleteClick}>remove
          </button></div>);
  },
  handleDeleteClick: function(){
    this.fb.remove();
  }
});
