import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4">
      <div className="flex items-center justify-between px-4 max-w-6xl mx-auto">
        {/* Logo e Link para Página de Cursos */}
        <Link href="/cursos">
          <button className="bg-[#F37826] text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
            📚 Conteudo baixado
          </button>
        </Link>

        {/* Barra de Pesquisa */}
        <div className="flex items-center bg-gray-200 px-3 py-2 rounded-lg w-full max-w-md">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Pesquisar cursos..."
            className="ml-2 bg-transparent outline-none w-full text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
