const knex = require('../../db/knex');

class GenreModel {
  static async list() {
    const genres = await knex('genres')
      .select('name')
      .orderBy('name', 'asc');
    
    return genres.map(genre => genre.name);
  }

  static async getByName(name) {
    return knex('genres')
      .where({ name })
      .first();
  }

  static async getByContentId(contentId) {
    const genres = await knex('genres as g')
      .join('content_genres as cg', 'g.id', 'cg.genre_id')
      .where('cg.content_id', contentId)
      .select('g.name');
    
    return genres.map(genre => genre.name);
  }
}

module.exports = GenreModel;