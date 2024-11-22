const post = require("../models/postSchema");

exports.createPost = async (req, res) => {
  try {
    const userId = req.payload;
    const { title, description, image } = req.body;
    const newPost = new post({
      title: title,
      description: description,
      image: req.file.filename,
      createdBy: userId,
    });
    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await post.find();
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
};

exports.editPost = async (req, res) => {
  try {
    const userId = req.payload;
    const postId = req.params.id;
    const currentPost = await post.findById(postId);

    if (!currentPost) {
      return res.status(404).json("Post not found");
    }

    if (currentPost.createdBy != userId) {
      return res.status(401).json("Unauthorized Access");
    }

    const { title, description } = req.body;

    let image;
    if (req.file) {
      image = req.file.filename;
    } else {
      image = currentPost.image;
    }

    const updatedPost = await post.findByIdAndUpdate(
      postId,
      {
        title: title,
        description: description,
        image: image,
      },
      { new: true }
    );

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

exports.deletePost = async (req, res) => {
  try {
    const userId = req.payload;
    const postId = req.params.id;
    const currentPost = await post.findById(postId);

    if (!currentPost) {
      return res.status(404).json("Post not found");
    }

    if (currentPost.createdBy != userId) {
      return res.status(401).json("Unauthorized Access");
    }

    await post.findByIdAndDelete(postId);

    return res.status(200).json(currentPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};
