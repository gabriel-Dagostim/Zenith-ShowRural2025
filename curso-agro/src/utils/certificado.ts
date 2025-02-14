import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

export const gerarCertificado = async (curso: any, usuario: any) => {
  const { nomeProduto, logoEmpresa, cargaHoraria } = curso;
  const { firstName, lastName } = usuario;

  // Criar um novo documento PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  // Cores e estilos
  const corPrincipal = rgb(0.95, 0.58, 0.15); // Laranja do site
  const corTexto = rgb(0, 0, 0);

  // Adicionar título
  page.drawText("Certificado de Conclusão", { x: 150, y: 350, size: 20, color: corPrincipal });

  // Adicionar nome do usuário
  page.drawText(`Certificamos que ${firstName} ${lastName}`, { x: 100, y: 300, size: 14, color: corTexto });

  // Adicionar nome do curso
  page.drawText(`concluiu com êxito o curso:`, { x: 100, y: 280, size: 12, color: corTexto });
  page.drawText(nomeProduto, { x: 100, y: 260, size: 16, color: corPrincipal });

  // Adicionar carga horária e data de conclusão
  const dataConclusao = new Date().toLocaleDateString("pt-BR");
  page.drawText(`Carga Horária: ${cargaHoraria} horas`, { x: 100, y: 240, size: 12, color: corTexto });
  page.drawText(`Data de Conclusão: ${dataConclusao}`, { x: 100, y: 220, size: 12, color: corTexto });

  // Carregar e adicionar a logo da empresa no certificado
  if (logoEmpresa) {
    const logoBytes = await fetch(logoEmpresa).then((res) => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoBytes);
    page.drawImage(logoImage, { x: 450, y: 300, width: 100, height: 100 });
  }

  // Salvar o PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });

  // Baixar o certificado
  saveAs(blob, `Certificado_${nomeProduto}.pdf`);
};
