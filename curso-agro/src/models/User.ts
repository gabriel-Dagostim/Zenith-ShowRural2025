import mongoose from "mongoose";

const CursoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  modulosConcluidos: { type: [String], default: [] }, // Lista de módulos concluídos
  cursoCompletoBaixado: { type: Boolean, default: false }, // Se baixou o curso completo
  progresso: { type: Number, default: 0 } // Progresso total
});

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  birthDate: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  cursos: { type: [CursoSchema], default: [] } // Lista de cursos e progresso
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
