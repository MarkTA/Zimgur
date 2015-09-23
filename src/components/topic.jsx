
var React = require('react');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var TopicStore = require('../stores/topic-store');
var Reflux = require('reflux');
var ImagePreview = require('./image-preview');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange'),
      Reflux.listenTo(TopicStore, 'onTopicChange')
  ],
  getInitialState: function(){
    return {
      topics: [],
      images: [],
      section: "/hot",
      sort: "/viral/",
      window: "",
      page: 1
    }
  },
  componentWillMount: function(){
    Actions.getTopics();
    Actions.getImages(this.props.params.id);
  },
  componentWillReceiveProps: function(nextProps) {
    Actions.getImages(nextProps.params.id);

  },
  render: function() {
    return (<div
      className="topic">
      {this.TopicTitle()}
      <span>Page {this.state.page} of the {this.findSection()} {this.findSort()} posts {this.findWindow()}</span>
      <div className="button-container">
        <ul className="left">
          <li onClick={this.handlePageDownClick}>
            <span className="glyphicon glyphicon-menu-left"></span>
          </li>
        </ul>
        <ul className="right" onClick={this.handlePageUpClick}>
          <li onClick={this.handlePageUpClick}>
            <span className="glyphicon glyphicon-menu-right"></span>
          </li>
        </ul>
        <ul onClick={this.handleSectionClick}>
          <li>
            <a>
              hot
            </a>
          </li>
          <li>
            <a>
              top
            </a>
          </li>
        </ul>
        <ul onClick={this.handleSortClick}>
          <li>
            <a>
              viral
            </a>
          </li>
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
  windowNav: function(){
    var link = this.props.params.id+ this.state.section + this.state.sort + this.state.window + this.state.page;
    if(this.state.section=="/top"){
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
  findSort: function(){
    if(this.state.sort == "/top/"){
      return "top"
    }else if(this.state.sort == "/viral/"){
      return "viral"
    }else{
      return "time"
    }
  },
  findSection: function(){
    if(this.state.section == "/hot"){
      return "hot"
    }else{
      return "top"
    }
  },
  findWindow: function(){
    var state=this.state.window;
            switch (state)
            {
               case '/all/': return "of all time";

               case '/day/': return "of the day";

               case '/week/': return "of the week";

               case '/month/': return "of the month";

               case '/year/': return "of the year";

               default: return"";
            }
  },
  handleSectionClick: function(e){
    if(e.target.text=="hot"){
      this.setState({
        window: ""
      });
    }else{
      this.setState({
        window: "/week/"
      });
    }
    this.setState({
      section: "/"+e.target.text
    });
    console.log(e.target.text);
    this.reRender();
  },
  handleWindowClick: function(e){
    this.setState({
      window: "/"+e.target.text+"/"
    });
    console.log(this.state);
    this.reRender();
  },
  handleSortClick: function(e){
    this.setState({
      sort: "/"+e.target.text+"/"
    });
    console.log(this.state);
    this.reRender();
  },
  handlePageUpClick: function(e){
    var num = this.state.page;
    num++;
    this.setState({
      page: num
    });
      console.log(this.state);
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
      console.log(this.state);
      this.reRender();
  },
  reRender: function(){
    var link = this.props.params.id+ this.state.section + this.state.sort + this.state.window + this.state.page;
    Actions.getImages(link);
  },
  TopicTitle: function(){
    var t= this.props.params.id;
      return this.state.topics.slice(0, 8).map(function(topic){
        if(topic.id==t){
          return <h1> {topic.name} </h1>
        }
      })
  },
  renderImages: function(){
    return this.state.images.map(function(image){
      return <ImagePreview key={image.id} {...image}/>
    });
  },
  onChange: function(event, images){
    this.setState({images: images})
  },
  onTopicChange: function(event, topics){
      this.setState({topics: topics})
  }

});
