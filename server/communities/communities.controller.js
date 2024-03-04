const express = require("express");
const router = express.Router();
const prisma = require("../db");

router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true }
  });
  res.send(posts);
});

router.post("/create-post", async (req, res) => {
  // console.log(req.body);
  const post = await prisma.user.update({
    where: { id: req.body.authorId },
    data: {
      posts: {
        create: {
          title: req.body.title,
          content: req.body.content,
          tag: req.body.tag
          },
        },
      },
    include: { posts: true },
  });
  // console.log(post);
});

module.exports = router;
