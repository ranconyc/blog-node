const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postsRoutes");

// express app
const app = express();
const PORT = 3000;

// connect to mongoDB
const dbURI =
  "mongodb+srv://ranco:ranco24@cluster0.bppfs.mongodb.net/NeonLight?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// Middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// GET method
app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// POSTS ROUTES
app.use("/posts", postRoutes);

// redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

// 404 page need to always on the bottom of other requests
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
