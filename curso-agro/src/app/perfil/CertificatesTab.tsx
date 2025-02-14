"use client";
import { useEffect, useState } from "react";

const CertificatesTab = () => {
  const [certificados, setCertificados] = useState<string[]>([]);

  useEffect(() => {
    const storedCertificates = JSON.parse(localStorage.getItem("certificados") || "[]");
    setCertificados(storedCertificates);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#F37826] mb-3">Certificados Conquistados</h2>

      {certificados.length > 0 ? (
        <ul className="space-y-2">
          {certificados.map((cert, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded-lg flex justify-between items-center">
              <span>{cert}</span>
              <a href={`/certificados/${cert}.pdf`} className="text-[#F37826] font-semibold">
                📜 Ver Certificado
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Nenhum certificado ainda.</p>
      )}
    </div>
  );
};

export default CertificatesTab;
