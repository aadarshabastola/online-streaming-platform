import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      className="w-1/2 p-2 border rounded-md"
      value={query}
      onChange={handleSearch}
      placeholder="Search movies, shows, documentaries..."
    />
  );
};

export default SearchBar;
