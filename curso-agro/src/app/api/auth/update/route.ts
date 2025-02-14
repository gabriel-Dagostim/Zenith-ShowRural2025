import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { email, firstName, lastName, phone, birthDate } = await req.json();

    await connectToDatabase();

    // Encontra e atualiza o usuário pelo e-mail
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { firstName, lastName, phone, birthDate },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}
