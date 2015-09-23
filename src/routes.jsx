var React = require('react');
var ReactRouter = require('react-router');
var HashHistory = require('react-router/lib/hashhistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require('./components/main');
var SubReddit = require('./components/subreddit');
var Topic = require('./components/topic');
var SubTopic = require('./components/sub-topic');
var ImageDetail = require('./components/image-detail');
var RImageDetail = require('./components/sub-image-detail');

module.exports = (
  <Router history={new HashHistory}>
    <Route path="/" component={Main}>
      <Route path="subreddit" component={SubReddit}/>
      <Route path="gallery/r/:subreddit" component={SubTopic}/>

      <Route path="topics/:id" component={Topic}/>
      <Route path="images/:id" component={ImageDetail}/>
        <Route path="gallery/r/images/:id" component={RImageDetail}/>
    </Route>
  </Router>
)
