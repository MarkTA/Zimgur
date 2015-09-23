var React = require('react');
var SubHeadItem = require('./sub-head-item');

module.exports = React.createClass({
  render: function(){
    return (<ul className="nav navbar-nav navbar-right border">
      {this.renderList()}
    </ul>);
    },
  renderList: function(){
    if(!this.props.subs) {
      return 
    }else{
      var children=[];

      for(var key in this.props.subs){
        var sub = this.props.subs[key];
        sub.key = key;
        children.push(
          <SubHeadItem sub = {sub} key = {key}/>
        )};
      return children;
    }
  }
});
