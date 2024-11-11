import React from "react";

const ContentCard = ({ content }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={content.thumbnail} alt={content.title} />
      <div className="p-4">
        <h3 className="font-semibold text-xl mb-2">{content.title}</h3>
        <p className="text-sm text-gray-600">{content.description}</p>
      </div>
    </div>
  );
};

export default ContentCard;
