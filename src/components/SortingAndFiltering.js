import React from "react";

const SortingAndFiltering = ({ onFilterChange, onSortChange }) => {
  return (
    <div className="flex space-x-4">
      <select
        className="p-2 border rounded-md"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="release_date">Release Date</option>
        <option value="rating">Rating</option>
      </select>

      <select
        className="p-2 border rounded-md"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="movie">Movies</option>
        <option value="tv">TV Shows</option>
        <option value="documentary">Documentaries</option>
      </select>
    </div>
  );
};

export default SortingAndFiltering;
