import mongoose from "mongoose";

const CourseProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cursoNome: { type: String, required: true },
  modulosConcluidos: { type: [String], default: [] },
  cursoCompletoBaixado: { type: Boolean, default: false },
  progresso: { type: Number, default: 0 }, // Progresso em porcentagem
});

const CourseProgress = mongoose.models.CourseProgress || mongoose.model("CourseProgress", CourseProgressSchema);
export default CourseProgress;
