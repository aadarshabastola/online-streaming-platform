import React, { useState, useEffect } from 'react';
import { contentService } from '../../services/contentService';
import { useNavigate } from 'react-router-dom';

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentData = await contentService.getContentList(filters);
        const genreData = await contentService.getGenres();
        setContents(contentData.items);
        setGenres(genreData);
      } catch (error) {
        console.error('Failed to fetch content', error);
      }
    };

    fetchData();
  }, [filters]);

  const handleContentClick = (id) => {
    navigate(`/content/${id}`);
  }; 

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <select 
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {contents.map((content) => (
          <div 
            key={content.id} 
            onClick={() => handleContentClick(content.id)}
            className="cursor-pointer hover:scale-105 transition-transform"
          >
            <img 
              src={content.thumbnail_url} 
              alt={content.title} 
              className="w-full h-64 object-cover rounded"
            />
            <h3 className="mt-2 text-lg font-semibold">{content.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentList;