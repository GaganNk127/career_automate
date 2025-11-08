const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Quiz = require("../models/quizModel");
const User = require("../models/userModel");

router.get("/getQuiz", async (req, res) => {
  const userIdRaw = req.query.userId;
  const userId = typeof userIdRaw === "string" ? userIdRaw.trim() : userIdRaw;

  try {
    let quizzes;

    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid userId format" });
      }
      // If userId is provided, get the user's allAptitudes
      const user = await User.findById(userId); // Correct method to fetch a single document
      if (!user) {
        return res.status(404).send("User not found");
      }
      quizzes = user.allAptitudes; // Access the user's allAptitudes array
    } else {
      // If userId is not provided,
      quizzes = await Quiz.find();
    }

    // Map through quizzes if they exist
    const modifiedQuizzes = quizzes?.map((quiz) => {
      quiz.id = quiz._id;

      return quiz;
    });

    res.status(200).json(modifiedQuizzes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong from backend");
  }
});

module.exports = router;
