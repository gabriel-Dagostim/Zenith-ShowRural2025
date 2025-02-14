import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { curso } = await req.json();
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const userEmail = "usuario@email.com"; // Pegue o email do usuário autenticado (deve ser dinâmico)

    await usersCollection.updateOne(
      { email: userEmail },
      { $addToSet: { cursosConcluidos: curso } } // Adiciona o curso sem duplicatas
    );

    return NextResponse.json({ message: "Curso marcado como concluído!" });
  } catch (error) {
    console.error("Erro ao marcar curso como concluído:", error);
    return NextResponse.json({ error: "Erro ao salvar curso concluído." }, { status: 500 });
  }
}
