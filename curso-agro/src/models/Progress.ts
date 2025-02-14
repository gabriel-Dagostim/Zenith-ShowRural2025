import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  cursoNome: { type: String, required: true }, // 🔹 Adicionamos o cursoNome corretamente
  progresso: { type: Number, default: 0 },
  modulosConcluidos: { type: [String], default: [] }
});

const Progress = mongoose.models.Progress || mongoose.model("Progress", ProgressSchema);

export default Progress;
