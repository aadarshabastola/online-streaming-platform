import { api } from '../utils/api';

export const contentService = {
  async getContentList(params = {}) {
    const response = await api.get('/contents', { params });
    return response.data;
  },

  async getContentDetails(id) {
    const response = await api.get(`/contents/${id}`);
    return response.data;
  },

  async getVideoUrl(id) {

    const token = localStorage.getItem('token');
    const response = await api.get(`/contents/${id}/video`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Video URL:', response.data.url);
    return response.data.url;
  },

  async getGenres() {
    const response = await api.get('/genres');
    return response.data.genres;
  }
};