var React = require('react');
var SubListItem = require('./sub-list-item');

module.exports = React.createClass({
  render: function(){
    return (<div className="listgroup group-margin">
      {this.renderList()}
    </div>);
    },
  renderList: function(){
    if(!this.props.subs) {
      return (<h4
        className="text-center">
      Click the link in the title for a list of subreddits.
      </h4>);
    }else{
      var children=[];

      for(var key in this.props.subs) {
        var sub = this.props.subs[key];
        sub.key = key;

        children.push(
          <SubListItem
            sub={sub}
            key={key}
            >
          </SubListItem>
        )
      }

      return children;
    }
  }
});
