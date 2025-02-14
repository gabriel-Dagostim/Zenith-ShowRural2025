import CertificadoBotao from "./CertificadoBotao";

const CursoPage = ({ curso, usuario }: { curso: any; usuario: any }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{curso.nomeProduto}</h1>
      <img src={curso.imagem} alt={curso.nomeProduto} className="w-full h-40 object-cover rounded-lg" />
      <p className="text-gray-600">Carga horária: {curso.cargaHoraria} horas</p>

      {/* Botão de Certificado */}
      {curso.progresso === 100 && <CertificadoBotao curso={curso} usuario={usuario} />}
    </div>
  );
};

export default CursoPage;
