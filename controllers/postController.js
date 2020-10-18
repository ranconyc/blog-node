const express = require("express");
const Post = require("../models/post");

const router = express.Router();

// INDEX
const post_index = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("posts/index", { title: "All Posts", posts: result })
    )
    .catch((err) => {
      console.log(err);
    });
};

// CREATE
const post_create_get = (req, res) => {
  const post = new Post(req.body);

  post
    .save()
    .then((result) => res.redirect("/posts").catch((err) => console.log(err)));
};

// CREATE POST
const post_create_post = (req, res) => {
  res.render("posts/create", { title: "Create post" });
};

// SHOW
const post_show = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((result) => {
      res.render("posts/show", { title: "post details", post: result });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "post not found" });
    });
};

// DELETE
const post_delete = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: "/posts" }))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  post_index,
  post_create_get,
  post_create_post,
  post_show,
  post_delete,
};
