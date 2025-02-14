import Image from "next/image";
import ProductCard from "./ProductCard";

interface CategoryProps {
  name: string;
  logo: string;
  products: { title: string; image: string; totalHours: string }[];
}

const Category = ({ name, logo, products }: CategoryProps) => {
  return (
    <div className="p-4">
      {/* Logo da Marca */}
      <div className="flex items-center gap-3 mb-4">
        <Image src={logo} alt={name} width={50} height={50} className="rounded-full" />
        <h2 className="text-xl font-bold">{name}</h2>
      </div>

      {/* Lista de Produtos */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            image={product.image}
            logo={logo} // Passamos a logo da empresa para os produtos
            totalHours={product.totalHours} // Passamos a duração dos tutoriais
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
