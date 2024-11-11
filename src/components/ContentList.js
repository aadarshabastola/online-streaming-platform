import React, { useEffect, useState } from "react";
import ContentCard from "./ContentCard";

const ContentList = ({ searchQuery, filter, sortBy }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Replace with your API endpoint for content
      const response = await fetch(`/api/content?search=${searchQuery}&filter=${filter}&sort=${sortBy}`);
      const data = await response.json();
      setContent(data);
    };
    const staticData = [
      { id: 1, title: "Content 1", description: "Description 1" },
      { id: 2, title: "Content 2", description: "Description 2" },
      { id: 3, title: "Content 3", description: "Description 3" },
      { id: 4, title: "Content 4", description: "Description 4" },
    ];
    setContent(staticData);

    fetchData();
  }, [searchQuery, filter, sortBy]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {content.map((item) => (
        <ContentCard key={item.id} content={item} />
      ))}
    </div>
  );
};

export default ContentList;
