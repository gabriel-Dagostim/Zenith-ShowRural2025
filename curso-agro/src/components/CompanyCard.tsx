import Image from "next/image";

interface CompanyCardProps {
  logo: string;
}

const CompanyCard = ({ logo }: CompanyCardProps) => {
  return (
    <div className="flex items-center justify-center hover:scale-105 transition-transform w-16 md:w-20">
      <Image src={logo} alt="Empresa" width={60} height={60} className="rounded-lg" />
    </div>
  );
};

export default CompanyCard;
