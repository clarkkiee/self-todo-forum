const express = require("express");
const prisma = require("../db");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.use(isAuthenticated);

router.get("/", async (req, res) => {
  const token = req.cookies.access_token;
  const jwtDecode = jwt.decode(token, process.env.JWT_SECRET);
  const userLoginData = {
    username: jwtDecode.username,
    fullname: jwtDecode.fullname,
  };

  const getUserAllPosts = await prisma.post.findMany({
    where: {
      authorId: parseInt(jwtDecode.id),
    },
    include: {
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  const payload = {
    username: jwtDecode.username,
    fullname: jwtDecode.fullname,
    posts: getUserAllPosts,
  };

  res.send(payload);
});

router.delete("/delete", async (req, res) => {
  // console.log(req.query.postId);
  // console.log(req.query.userId);

  const existsLike = await prisma.likes.findMany({
    where: {
      postId: parseInt(req.query.postId),
    },
  });

  if (existsLike.length > 0) {
    await prisma.likes.deleteMany({
      where: {
        postId: parseInt(req.query.postId),
      },
    });
  }

  await prisma.post.delete({
    where: {
      idPost: parseInt(req.query.postId),
    },
    include: {
      likes: true,
    },
  });

  res.send("Delete post successfully");
});

router.get("/post", async (req, res) => {
  // console.log(req.query.userId);
  // console.log(req.query.postId);
  const post = await prisma.post.findFirst({
    where: {
      authorId: parseInt(req.query.userId),
      idPost: parseInt(req.query.postId),
    },
  });

  res.send(post);
});

router.put("/edit", async (req, res) => {
  const data = req.body;

  const updatePost = await prisma.post.update({
    where: {
      idPost: parseInt(data.postId),
    },
    data: {
      title: data.postUpdated.title,
      content: data.postUpdated.content,
      tag: data.postUpdated.tag,
      createdAt: new Date(Date.now()).toISOString(),
    },
  });

  // console.log(updatePost);
  res.send("Posts Updated Successfully");
});

module.exports = router;
