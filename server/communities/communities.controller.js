const express = require("express");
const router = express.Router();
const prisma = require("../db");

router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  res.send(posts);
});

router.post("/create-post", async (req, res) => {
  const post = await prisma.user.update({
    where: { id: req.body.authorId },
    data: {
      posts: {
        create: {
          title: req.body.title,
          content: req.body.content,
          tag: req.body.tag,
        },
      },
    },
    include: { posts: true },
  });
  res.send("Create post successfully")
  // console.log(post);
}); 

router.post("/likePost", async (req, res) => {
  const existingLike = await prisma.likes.findUnique({
    where: {
      userId_postId: {
        userId: req.body.userId,
        postId: req.body.likedPost,
      },
    },
  });

  if (!existingLike) {
    await prisma.likes.create({
      data: {
        userId: req.body.userId,
        postId: req.body.likedPost,
      },
    });
    return res.send({ success: true, message: "Like added successfully"})
  } else {
    await prisma.likes.delete({
      where: {
        id: existingLike.id,
      },
    });
    return res.send({ success: true, message: "Like removed successfully" })
  }
});

router.get("/user/:user", async (req, res) => {
  const usernameSearch = req.params.user;
  const getDataPosts = await prisma.post.findMany({
    where: {
      author: {
        username: {
          search: usernameSearch,
          mode: "insensitive",
        },
      },
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (getDataPosts.length === 0) {
    return res.status(404).send("User not found");
  }

  res.send(getDataPosts);
});

module.exports = router;
