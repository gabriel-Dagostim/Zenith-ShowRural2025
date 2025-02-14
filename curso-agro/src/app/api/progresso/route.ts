import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Progress from "@/models/Progress";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cursoNome = searchParams.get("cursoNome"); // 🔹 Pegar o nome do curso da URL

    if (!cursoNome) {
      return NextResponse.json({ error: "Nome do curso é obrigatório!" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const sessionCookie = await cookieStore.get("session");

    if (!sessionCookie) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    const decoded = jwt.verify(sessionCookie.value, process.env.JWT_SECRET!);

    await connectToDatabase();
    const userProgress = await Progress.findOne({ userId: decoded.id, cursoNome });

    return NextResponse.json(userProgress || { progresso: 0, modulosConcluidos: [] });
  } catch (error) {
    console.error("Erro ao buscar progresso:", error);
    return NextResponse.json({ error: "Erro ao buscar progresso" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { cursoNome, progresso, modulosConcluidos } = await req.json();

    if (!cursoNome) {
      return NextResponse.json({ error: "Nome do curso é obrigatório!" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const sessionCookie = await cookieStore.get("session");

    if (!sessionCookie) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    const decoded = jwt.verify(sessionCookie.value, process.env.JWT_SECRET!);

    await connectToDatabase();

    await Progress.findOneAndUpdate(
      { userId: decoded.id, cursoNome }, // 🔹 Agora identifica pelo curso também
      { $set: { progresso, modulosConcluidos } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Progresso atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    return NextResponse.json({ error: "Erro ao salvar progresso" }, { status: 500 });
  }
}
