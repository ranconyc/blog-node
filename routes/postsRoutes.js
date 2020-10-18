const express = require("express");
const postsController = require("../controllers/postController");

const router = express.Router();

// INDEX
router.get("/", postsController.post_index);
// CREATE
router.post("/", postsController.post_create_get);
router.get("/create", postsController.post_create_post);
// SHOW
router.get("/:id", postsController.post_show);
// DELETE
router.delete("/:id", postsController.post_delete);

module.exports = router;
