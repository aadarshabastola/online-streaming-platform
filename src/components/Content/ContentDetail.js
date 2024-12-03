import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { contentService } from "../../services/contentService";
import VideoPlayer from "./VideoPlayer";
import ReactStars from "react-rating-stars-component";

const ContentDetail = () => {
  const [content, setContent] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const { id } = useParams();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchRating = () => {
      const rating = localStorage.getItem(`rating-${id}`);
      if (rating) {
        setRating(parseInt(rating));
      }
    };
    const fetchContent = async () => {
      try {
        const contentData = await contentService.getContentDetails(id);
        // const videoData = await contentService.getVideoUrl(id);
        setContent(contentData);
        setVideoUrl(contentData.video_url);
      } catch (error) {
        console.error("Failed to fetch content details", error);
      }
    };

    fetchContent();
    fetchRating();
  }, [id]);

  if (!content) return <div>Loading...</div>;

  const ratingChanged = (newRating) => {
    localStorage.setItem(`rating-${id}`, newRating);
    setRating(newRating);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-1 gap-6">
        <div>
          <VideoPlayer url={videoUrl} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{content.title}</h1>
          <p className="text-gray-600 mt-2">{content.synopsis}</p>
          <div className="mt-4">
            <p>
              <strong>Director:</strong> {content.director}
            </p>
            <p>
              <strong>Cast:</strong> {content.cast.join(", ")}
            </p>
            <p>
              <strong>Release Date:</strong> {content.release_date}
            </p>
            <p>
              <strong>Average Rating:</strong> {content.average_rating}/5
            </p>

            <div className="flex items-center space-x-2">
              <p>
                <strong>Your Rating:</strong>
              </p>
              <ReactStars
                count={5}
                value={rating}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
