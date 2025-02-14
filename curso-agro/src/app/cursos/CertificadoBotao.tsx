import { gerarCertificado } from "@/utils/certificado";

const CertificadoBotao = ({ curso, usuario }: { curso: any; usuario: any }) => {
  return (
    <button
      onClick={() => gerarCertificado(curso, usuario)}
      className="bg-[#F37826] text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center gap-2"
    >
      📜 Baixar Certificado
    </button>
  );
};

export default CertificadoBotao;
