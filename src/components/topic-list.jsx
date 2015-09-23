var React = require('react');
var Reflux = require('reflux');
var TopicStore = require('../stores/topic-store');
var Actions = require('../actions');
var Router = require('react-router');
var Link = Router.Link;

module.exports =  React.createClass({
  mixins: [
    Reflux.listenTo(TopicStore, ('onChange'))
  ],
  getInitialState: function() {
    return {
      topics: []
    }
  },
  componentWillMount: function() {
    TopicStore.getTopics()
  },
  render: function() {
    return (<div
      className="listgroup">
      <span className="click"><span className="glyphicon glyphicon-arrow-left"></span> click here to add a topic</span>
      <span className="click2"><span className="glyphicon glyphicon-arrow-up"></span> click here to add a topic</span>
      <h3>Default Topic List</h3>
      {this.renderTopics()}
    </div>);
  },
  renderTopics:function () {
    return this.state.topics.map(function (topic) {
      return (<Link to={"topics/"+topic.id} className="list-group-item" key={topic.id}>
        <h4>{topic.name}</h4>
        <p>{topic.description}</p>
      </Link>);
    });
  },
  onChange: function(event, topics){
    this.setState({topics:topics});
  }
});
