// lib/routes.js

'use strict';
var middleware = require('./middleware'),
    index = require('./controllers/index'),
    posts = require('./controllers/posts');

module.exports = function(app) {
  // Server API Routes
  // -------
  // Posts
  // -------
  app.get('/api/posts', posts.query);
  app.get('/api/posts/:slug', posts.show);
  app.post('/api/posts/:slug', posts.create);
 
  // -------
  // Other
  // -------
  // 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });


  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/views/*', index.views);
  app.get('/*', index.index);
};