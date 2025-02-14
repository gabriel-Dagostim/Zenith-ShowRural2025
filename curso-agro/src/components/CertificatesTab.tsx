const CertificatesTab = () => {
    const certificates = [
      { title: "Agricultura Orgânica", link: "/certificates/agricultura.pdf" },
      { title: "Uso de Drones", link: "/certificates/drones.pdf" },
    ];
  
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-[#F37826]">Meus Certificados</h3>
        <ul className="mt-3">
          {certificates.map((cert, index) => (
            <li key={index} className="text-gray-600 text-sm mb-2">
              🎓 {cert.title} - <a href={cert.link} className="text-[#F37826] underline">Baixar</a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CertificatesTab;
  