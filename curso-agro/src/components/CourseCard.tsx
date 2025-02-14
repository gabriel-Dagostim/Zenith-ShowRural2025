import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  nome: string;
  empresa: string;
  capa: string;
  modulos: { nome: string; duracao: string }[] | null;
}

const CourseCard = ({ nome, empresa, capa, modulos }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-black">
      {/* Capa do Curso */}
      <Image src={capa} alt={nome} width={300} height={200} className="w-full h-40 object-cover rounded-lg" />

      {/* Nome e Empresa */}
      <h3 className="text-lg font-bold mt-2">{nome}</h3>
      <p className="text-sm text-gray-500">{empresa}</p>

      {/* Aulas Disponíveis */}
      {modulos && modulos.length > 0 ? (
        <>
          <p className="text-sm text-gray-600 mt-2 font-semibold">📖 Aulas Disponíveis:</p>
          <ul className="text-sm text-gray-700">
            {modulos.slice(0, 3).map((modulo, index) => (
              <li key={index}>
                {modulo.nome} - <span className="text-gray-500">{modulo.duracao}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-sm text-gray-500 mt-2">Nenhum módulo disponível.</p>
      )}

      {/* Botão para ver detalhes */}
      <Link href={`/curso/${encodeURIComponent(nome)}`}>
        <button className="mt-3 w-full bg-[#4CAF50] text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition">
          📖 Ver Curso
        </button>
      </Link>
    </div>
  );
};

export default CourseCard;
