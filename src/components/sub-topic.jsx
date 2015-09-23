
var React = require('react');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var Reflux = require('reflux');
var SubImagePreview = require('./sub-image-preview');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange')
  ],
  getInitialState: function(){
    return {
      images: [],
      sort: "/top/",
      window: "all/",
      page: 1,
      link: "/top/all/1"
    }
  },
  componentWillMount: function(){
    var link = this.props.params.subreddit + "/top/all/1";
    console.log(link);
    Actions.getSubImages(link);
  },
  componentWillReceiveProps: function(nextProps) {
    var link = this.props.params.subreddit + this.state.sort+this.state.window+this.props.page;
      Actions.getSubImages(link);

  },
  render: function() {
    var link = this.props.params.subreddit + this.state.sort + this.state.window + this.state.page;
    console.log(link);
    return (<div className="topic">
      <h1>/r/{this.props.params.subreddit}</h1>
      <span>Page {this.state.page} of the {this.findSort()} posts {this.findWindow()}</span>
      <div className="button-container">
        <ul className="left" onClick={this.handlePageDownClick}>
          <li>
            <a>
              <span className="glyphicon glyphicon-menu-left"></span>
            </a>
          </li>
        </ul>
        <ul className="right" onClick={this.handlePageUpClick}>
          <li>
            <a>
              <span className="glyphicon glyphicon-menu-right"></span>
            </a>
          </li>
        </ul>
        <ul onClick={this.handleSortClick}>
          <li>
            <a>
              top
            </a>
          </li>
            <li>
              <a>
              time
            </a>
          </li>
        </ul>
        {this.windowNav()}
      </div>
      {this.renderImages()}
    </div>);

  },
  findSort: function(){
    if(this.state.sort == "/top/"){
      return "highest rated"
    }else{
      return "most recent"
    }
  },
  findWindow: function(){
    var state=this.state.window;
            switch (state)
            {
               case 'all/': return "of all time";

               case 'day/': return "of the day";

               case 'week/': return "of the week";

               case 'month/': return "of the month";

               case 'year/': return "of the year";

               default: return"";
            }
  },
  renderImages: function(){console.log(this.state.images.length);
    var Sub = this.props.params.subreddit;
    if(this.state.images.length==0){
      return (<div className="error">
        <h1 className="red">"r/{this.props.params.subreddit}"</h1>
        <h1>does not have any images on Imgur.</h1>
        <h1>Did you enter the name correctly?</h1>
        </div>);
    }else{
    return this.state.images.map(function(image){
      return <SubImagePreview sub={Sub} key={image.id} {...image}/>
    });
  }
    console.log(this.state.images);
  },
  windowNav: function(){
    if(this.state.sort=="/top/"){
      var link = this.props.params.subreddit + this.state.sort+this.state.window+this.props.page;
      return (
      <ul onClick={this.handleWindowClick}>
        <li>
          <a>
            all
          </a>
        </li>
        <li>
          <a>
            day
          </a>
        </li>
        <li>
          <a>
            week
          </a>
        </li>
        <li>
          <a>
            month
          </a>
        </li>
        <li>
          <a>
            year
          </a>
        </li>
      </ul>);
    }
  },
  handleWindowClick: function(e){
    this.setState({
      window: e.target.text+"/"
    });
    this.reRender();
  },
  handleSortClick: function(e){
    if(e.target.text=="time"){
      this.setState({
        window: ""
      });
    }else{
      this.setState({
        window: "week/"
      });
    }
    this.setState({
      sort: "/"+e.target.text+"/"
    });
    console.log(this.state.sort);
    this.reRender();
  },
  handlePageUpClick: function(e){
    var num = this.state.page;
    num++;
    this.setState({
      page: num
    });
      this.reRender();
  },
  handlePageDownClick: function(e){
    if(this.state.page>1){
      var num = this.state.page;
      num--;
      this.setState({
        page: num
      });
    }
      this.reRender();
  },
  reRender: function(){
    var link = this.props.params.subreddit + this.state.sort + this.state.window + this.state.page;
    Actions.getSubImages(link);
    Actions.getSubImages(link);
  },
  onChange: function(event, images){
    this.setState({images: images})
  }

});
