// lib/controllers/posts.js

var mongoose = require('mongoose'),
    Post = mongoose.model('Post');

// List of post
exports.query = function(req, res) {
  Post.find().sort('-createdAt').exec(function(err, posts) {
    if (err) return res.json(500, err);
    res.json(posts);
  });
};

// Show a post
exports.show = function(req, res) {
  Post.findOne({ 'slug': req.params.slug }).exec(function(err, post) {
    if (err) return res.json(500, err);
    res.json(post);
  });
};

// Create a post
exports.create = function(req, res) {
  var post = new Post(req.body);
  post.save(function(err) {
    if (err) return res.json(500, err);
    res.json(post);
  });
};
