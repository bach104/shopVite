import { useState } from "react";
import products from "../data/products.json";
import { debounce } from "lodash";

const Search = ({ onResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = debounce(() => {
    const searchQuery = query.toLowerCase().trim();
    const keywords = searchQuery.split(/\s+/);

    let filtered = !searchQuery
      ? products
      : products.filter((product) =>
          ["name", "description", "category", "season"].some((field) => {
            const fieldValue = product[field]?.toLowerCase() || "";
            return keywords.some((keyword) => fieldValue.includes(keyword));
          })
        );

    onResults(filtered);
  }, 300);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="p-4 flex max-width bg__header justify-center w-full">
      <input
        id="search-input"
        name="search"
        className="w-5/6 p-3 relative rounded-sm"
        type="text"
        placeholder="Nhập từ khóa cần tìm kiếm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="on"
      />
      <button
        className="bg-black hover:opacity-80 text-white px-4 py-2"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
