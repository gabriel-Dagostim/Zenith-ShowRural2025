import Navbar from "@/components/Navbar";
import CompanyCard from "@/components/CompanyCard";
import ProductCard from "@/components/ProductCard";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <div className="bg-[#FDFDFD] text-black min-h-screen pb-20">
      <Navbar />

      <div className="h-16"></div>

      {/* Seção de Empresas Mais Pesquisadas */}
      <div className="p-4 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#F37826] mb-4">Empresas Mais Pesquisadas</h2>
        <div className="flex justify-center gap-3 md:gap-5 flex-wrap">
          <CompanyCard logo="/logos/dji.png" />
          <CompanyCard logo="/logos/john_deere.png" />
          <CompanyCard logo="/logos/stihl.png" />
          <CompanyCard logo="/logos/new_holland.png" />
        </div>
      </div>



      {/* Seção de Cursos Disponíveis */}
      <div className="p-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#F37826] mb-3">Cursos Disponíveis</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          <ProductCard title="Drone Agrícola T30" image="/products/dji_t30.jpg" logo="/logos/dji.png" totalHours="5" company="DJI" />
          <ProductCard title="Trator 8R" image="/products/john_8r.jpg" logo="/logos/john_deere.png" totalHours="4.2" company="John Deere" />
          <ProductCard title="Motosserra MS 881" image="/products/stihl_ms881.jpg" logo="/logos/stihl.png" totalHours="2.8" company="Stihl" />
          <ProductCard title="Plantadeira ExactEmerge" image="/products/john_exactemerge.jpg" logo="/logos/john_deere.png" totalHours="5" company="John Deere" />
        </div>
      </div>


      {/* Seção Top Cursos */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-[#F37826]">🔥 Top Cursos</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mt-3">
          <ProductCard title="Trator 8R" image="/products/john_8r.jpg" logo="/logos/john_deere.png" totalHours="4.2" company="John Deere" />
          <ProductCard title="Drone Agrícola T30" image="/products/dji_t30.jpg" logo="/logos/dji.png" totalHours="5" company="DJI" />
          <ProductCard title="Motosserra MS 881" image="/products/stihl_ms881.jpg" logo="/logos/stihl.png" totalHours="2.8" company="Stihl" />
          <ProductCard title="Plantadeira ExactEmerge" image="/products/john_exactemerge.jpg" logo="/logos/john_deere.png" totalHours="5" company="John Deere" />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
