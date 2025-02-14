import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 400 });
    }

    return NextResponse.json({ 
      message: "Login bem-sucedido!", 
      user: { 
        id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        phone: user.phone, 
        birthDate: user.birthDate,
        email: user.email 
      }
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}
