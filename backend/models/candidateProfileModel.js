const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, index: true },
    phone: { type: String },
    resumeUrl: { type: String },
    appliedJobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    currentRound: { type: String, default: "Aptitude" },
    status: { type: String, enum: ["in_progress", "passed", "failed"], default: "in_progress" },
    aptitudeResultId: { type: mongoose.Schema.Types.ObjectId, ref: "AptitudeResult" },
    latestCodingSubmissionId: { type: mongoose.Schema.Types.ObjectId, ref: "CodingSubmission" },
    interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interview" }],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.CandidateProfile ||
  mongoose.model("CandidateProfile", candidateProfileSchema);
