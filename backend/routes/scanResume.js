const express = require("express");
const router = express.Router();
require("dotenv").config();
const { saveScoreToExcel } = require("../utils/excelUtils");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

router.post("/scanResume", async (req, res) => {
  try {
    const { userId, name, email, resumeContent, jobDesc } = req.body;

    if (!resumeContent || !jobDesc) {
      return res.status(400).json({ message: "Resume and Job Description are required" });
    }

    // const addOnPrompt = `
    //   Score the candidate's resume based on the following:
    //   1. Skills matched then give 5 points each skill
    //   2. Relevant experience matched then give 10 points each experience
    //   3. Achievements are good then give 5-15 points (based on achievements)
    //   4. If overall resume text is great, then give more points (10-20 points)
    //   Exclude any educational/academic details.
    //   Provide the score as a simple number (e.g., 75) without explanations or breakdowns.
    // `;

    // const { GoogleGenerativeAI } = require("@google/generative-ai");
    // const genAI = new GoogleGenerativeAI(process.env.GEN_AI_API_KEY);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const combinedText = `${jobDesc}\n\nResume:\n${resumeContent}\n\n${addOnPrompt}`;
    // const result = await model.generateContent(combinedText);
    // const rawResponse = await result.response.text();
    // const cleanedResponse = rawResponse.trim();
    // const score = parseFloat(cleanedResponse);

    // Save to Excel using utility function


    function scoreResume(resumeContent, jobDesc) {
    const resumeWords = tokenizer.tokenize(resumeContent.toLowerCase());
    const jobWords = tokenizer.tokenize(jobDesc.toLowerCase());

    const uniqueResumeWords = new Set(resumeWords);
    const uniqueJobWords = new Set(jobWords);

    let matchedSkills = 0;
    uniqueJobWords.forEach(word => {
      if (uniqueResumeWords.has(word)) matchedSkills++;
    });


   const score = Math.min(100, (matchedSkills / uniqueJobWords.size) * 100);
    return Math.round(score);
  }
    const score = scoreResume(resumeContent,jobDesc)

    const allData = saveScoreToExcel(userId, name, email,score);
    console.log(allData);

    res.status(200).json({ score, allData });
  } catch (error) {
    console.error("Error scanning resume:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
