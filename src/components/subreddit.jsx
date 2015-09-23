var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var SubInput = require('./sub-input');
var SubList = require('./sub-list');
var rootUrl= "https://zimgur.firebaseio.com/";

module.exports = React.createClass({
  mixins: [ReactFire],
  getInitialState: function(){
    return {
      subs: {},
      loaded: false
    }
  },
  componentWillMount: function(){
    this.fb = new Firebase(rootUrl + 'subs/');
    this.bindAsObject(this.fb, 'subs');
    this.fb.on('value', this.handleDataLoaded)
  },
  render: function() {
    return (<div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          Add your favorite <a target="_blank" href="http://redditlist.com/sfw">SubReddits!</a>
        </h2>
        <hr/>
        <SubInput subredditStore={this.firebaseRefs.subs}/>
        <SubList subs={this.state.subs}/>
          <div className= {"content "+ (this.state.loaded ? 'loaded' : '')}>
          </div>
      </div>
    </div>);
  },
  handleDataLoaded: function(){
    this.setState({loaded:true});
  }
});
