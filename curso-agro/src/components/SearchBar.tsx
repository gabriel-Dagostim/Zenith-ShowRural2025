import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = () => {
  return (
    <div className="w-full flex items-center bg-gray-800 p-3 rounded-lg">
      <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
      <input
        type="text"
        placeholder="Pesquisar cursos..."
        className="ml-2 bg-transparent outline-none text-white w-full"
      />
    </div>
  );
};

export default SearchBar;
