const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { Users, Articles } = require("./model/model.js");
const jwt = require("jsonwebtoken");
const jwtSecret = "secret@jwt#1290@kuchbhi&chalega$56733MAN";
const dotenv = require("dotenv");

dotenv.config();
app.use(
  cors({
    origin: ["https://bytejournal.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database successfully connected"))
  .catch((err) => {
    console.log(`Database connection error: ${err.message}`);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("This is a blog application. MERN + JWT authentication");
});

const checkEmailMiddleWare = async (req, res, next) => {
  const { email } = req.body;
  const isEmailTaken = async (email) => {
    const user = await Users.findOne({ email });
    return !!user;
  };
  try {
    const emailTaken = await isEmailTaken(email);
    if (emailTaken) {
      return res.status(400).json({ error: "Email is already taken." });
    }
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const checkUsernameMiddleWare = async (req, res, next) => {
  const { username } = req.body;
  const isUsernameTaken = async (username) => {
    const user = await Users.findOne({ username });
    return !!user;
  };
  try {
    const usernameTaken = await isUsernameTaken(username);
    if (usernameTaken) {
      return res.status(400).json({ error: "username is already taken." });
    }
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const authMiddleWare = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    jwt.verify(token, jwtSecret);
  } catch (error) {
    return res.status(400).json({ error: "Unauthorized Access" });
  }
  next();
};

app.get("/loginstatus", authMiddleWare, async (req, res) => {
  return res.status(200).json("user login session on");
});

app.post(
  "/registration",
  checkEmailMiddleWare,
  checkUsernameMiddleWare,
  async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
      const newUser = new Users({ name, username, email, password });
      await newUser.save();
      const data = await Users.find({ email: email });
      return res.json(data);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// find() return array of objects
// findOne() return particuler object, it has save() mthod

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const data = await Users.find({ email: email, password: password }).select(
    "-password"
  );

  if (data.length > 0) {
    const payload = {
      id: data[0]._id,
      name: data[0].name,
      username: data[0].username,
      email: data[0].email,
      password: data[0].password,
    };
    const expiresIn = 3600;
    const token = jwt.sign(payload, jwtSecret, { expiresIn });
    return res.status(200).json({ data, token, type: "Bearer" });
  } else {
    return res.status(404).json({ message: "User Not Found!" });
  }
});

app.post("/createArtilcle", authMiddleWare, async (req, res) => {
  const { title, content, username } = req.body;
  try {
    const newArticle = new Articles({ title, content });
    await newArticle.save();

    const user = await Users.findOne({ username: username });
    user.articles.push(newArticle._id);
    await user.save();

    return res.status(200).json({ message: "Article created successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/getArticles", async (req, res) => {
  try {
    const allUsersWithArticles = await Users.find()
      .populate("articles")
      .select("-email -password"); //excluding email and password(this is not public info)
    return res.status(200).json(allUsersWithArticles);
  } catch (error) {
    console.error("Error fetching all users with articles:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getArticles/:username", authMiddleWare, async (req, res) => {
  const username = req.params.username;
  const user = await Users.find({ username: username })
    .populate("articles")
    .select("-email -password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
});

app.get("/getArticle/:id", async (req, res) => {
  const articleId = req.params.id;
  const article = await Articles.findById(articleId).exec();
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  const user = await Users.findOne({ articles: articleId }).select(
    "-email -password -articles"
  );
  if (!user) {
    return res.status(404).json({ message: "User not found for this article" });
  }
  return res.json({ article, user });
});

app.delete("/deleteArticle/:articleId", authMiddleWare, async (req, res) => {
  const articleId = req.params.articleId;
  try {
    const article = await Articles.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await Articles.findByIdAndDelete(articleId);

    await Users.updateOne(
      { articles: articleId },
      { $pull: { articles: articleId } }
    );

    return res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "An error occurred" });
  }
});

app.put("/editArticle/:articleId", authMiddleWare, async (req, res) => {
  const articleId = req.params.articleId;
  const { title, content } = req.body;
  try {
    let article = await Articles.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.title = title;
    article.content = content;
    await article.save();

    return res
      .status(200)
      .json({ message: "Article updated successfully", article });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/articles/like-dislike", async (req, res) => {
  try {
    const { articleId, userId, action } = req.body;

    // Find the article
    const article = await Articles.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Check if the action is valid
    if (action !== "like" && action !== "dislike") {
      return res.status(400).json({
        message: "Invalid action. Please specify 'like' or 'dislike'.",
      });
    }

    // Check if the user already liked or disliked the article
    const userLiked = article.likedBy.includes(userId);
    const userDisliked = article.dislikedBy.includes(userId);

    if (action === "like") {
      // If the user already liked the article, return "already liked"
      if (userLiked) {
        return res
          .status(200)
          .json({ message: "You already liked this article" });
      }

      // If the user disliked the article, remove from dislikedBy list and decrease dislikeCount
      if (userDisliked) {
        const index = article.dislikedBy.indexOf(userId);
        article.dislikedBy.splice(index, 1);
        article.dislikeCount--;
      }

      // Add user ID to likedBy list and increase likeCount
      article.likedBy.push(userId);
      article.likeCount++;
    } else if (action === "dislike") {
      // If the user already disliked the article, return "already disliked"
      if (userDisliked) {
        return res
          .status(200)
          .json({ message: "You already disliked this article" });
      }

      // If the user liked the article, remove from likedBy list and decrease likeCount
      if (userLiked) {
        const index = article.likedBy.indexOf(userId);
        article.likedBy.splice(index, 1);
        article.likeCount--;
      }

      // Add user ID to dislikedBy list and increase dislikeCount
      article.dislikedBy.push(userId);
      article.dislikeCount++;
    }

    // Save the updated article
    await article.save();

    return res.status(200).json({
      message: "Action performed successfully",
      likeCount: article.likeCount,
      dislikeCount: article.dislikeCount,
    });
  } catch (error) {
    console.error("Error performing action on article:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5050, () => {
  console.log("server connected!");
});
