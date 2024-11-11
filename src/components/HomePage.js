import React, { useState } from "react";
import ContentList from "./ContentList";
import SearchBar from "./SearchBar";
import SortingAndFiltering from "./SortingAndFiltering";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("release_date");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold">Arizona Prime</h1>
      </div>

      <div className="flex justify-between mb-6">
        <SearchBar onSearch={handleSearch} />
        <SortingAndFiltering
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
      </div>

      <ContentList
        searchQuery={searchQuery}
        filter={filter}
        sortBy={sortBy}
      />
    </div>
  );
};

export default HomePage;
