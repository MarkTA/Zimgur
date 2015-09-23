var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return{
        sub: ""
      }
    },
  render: function(){
    return (<div className="input-group">
      <span className="input-group-addon reddit">/r/</span>
      <input
        value={this.state.sub}
        onChange={this.handleInputChange}
        type="text"
        className="form-control"/>
      <span className="input-group-btn">
      <button
        onClick={this.handleClick}
        className="btn btn-default"
        type="button">
        Add
      </button>
      </span>
    </div>);
  },

  handleClick: function(){
    this.props.subredditStore.push({
      sub: this.state.sub
    });
    this.setState({sub: ''});
  },

  handleInputChange: function(){
    this.setState({sub: event.target.value});
  }
});
