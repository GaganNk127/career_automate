const mongoose = require("mongoose");

const assessmentTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    jobTags: [{ type: String }],
    questions: [
      {
        que: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctIndex: { type: Number, required: true },
        weight: { type: Number, default: 1 },
      },
    ],
    scoringRules: {
      correct: { type: Number, default: 1 },
      wrong: { type: Number, default: 0 },
      skip: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.AssessmentTemplate ||
  mongoose.model("AssessmentTemplate", assessmentTemplateSchema);
