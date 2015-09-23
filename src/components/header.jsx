var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');
var Reflux = require('reflux');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl= "https://zimgur.firebaseio.com/";
var SubHeader = require('./sub-header');

module.exports  = React.createClass({
  mixins:[ReactFire,
    Reflux.listenTo(TopicStore, 'onChange')
  ],
  getInitialState: function(){
    return {
      topics: [],
      subs: {}
    };
  },
  componentWillMount: function(){
    Actions.getTopics();
    this.fb = new Firebase(rootUrl + 'subs/');
    this.bindAsObject(this.fb, 'subs');
  },
  render: function() {
    return (<div>
      <nav className="navbar navbar-default header" ref="xHeader">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand logo">
            Imgur Browser
          </Link>
          <ul className="nav navbar-nav navbar-right default-topics">
            {this.renderTopics()}
          </ul>
        </div>
        <div className="container-fluid">
        <Link to="subreddit" className="navbar-brand subreddit">
          subReddit
        </Link>
          <SubHeader subs = {this.state.subs}/>
        </div>
      </nav>
    </div>
    );
  },
  renderTopics: function(){
    return this.state.topics.slice(0, 8).map(function(topic){
      return (<li key={topic.id}>
        <Link activeClassName="active" to={"topics/" + topic.id}>
          {topic.name}
        </Link>
      </li>
      );
    })
  },
  onChange: function(event, topics){
    this.setState({
      topics: topics
    });
  }
});
