import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    (await cookies()).set("session", "", { expires: new Date(0) });

    return NextResponse.json({ message: "Logout realizado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao fazer logout" }, { status: 500 });
  }
}
