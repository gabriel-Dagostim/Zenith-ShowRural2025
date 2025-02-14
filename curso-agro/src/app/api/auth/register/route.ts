import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { firstName, lastName, phone, birthDate, email, password } = await req.json();

    // Verifica se o e-mail já está cadastrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 400 });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário com os novos campos
    const newUser = new User({
      firstName,
      lastName,
      phone,
      birthDate,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: "Usuário cadastrado com sucesso!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao cadastrar usuário" }, { status: 500 });
  }
}
