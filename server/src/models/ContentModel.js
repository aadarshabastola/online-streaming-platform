const knex = require('../../db/knex');
const GenreModel = require('./GenreModel');

class ContentModel {
  static buildBaseQuery() {
    return knex('content')
      .select([
        'content.id',
        'content.title',
        'content.synopsis',
        'content.release_date',
        'content.director',
        'content.content_type',
        'content.duration',
        'content.average_rating',
        'content.thumbnail_url',
        'content.video_url',
        'content.cast'
      ]);
  }

  static formatContentItem(item) {
    return {
      ...item,
      release_date: item.release_date ? item.release_date.toISOString().split('T')[0] : null,
      cast: item.cast || []
    };
  }

  static async list({
    search,
    genre,
    actor,
    content_type,
    release_year,
    sort_by = 'title',
    order = 'asc',
    page = 1,
    limit = 20
  } = {}) {
    let query = this.buildBaseQuery();

    // Apply filters
    if (search) {
      query = query.whereILike('title', `%${search}%`);
    }

    if (content_type) {
      query = query.where('content_type', content_type);
    }

    if (release_year) {
      query = query.whereRaw('EXTRACT(YEAR FROM release_date) = ?', [release_year]);
    }

    if (genre) {
      query = query
        .join('content_genres as cg', 'content.id', 'cg.content_id')
        .join('genres as g', 'cg.genre_id', 'g.id')
        .where('g.name', genre);
    }

    if (actor) {
      query = query.whereRaw('? = ANY(cast)', [actor]);
    }

    // Get total count
    const countQuery = knex('content')
      .count('* as count')
      .first();

    // Apply sorting
    const sortMapping = {
      title: 'content.title',
      release_date: 'content.release_date',
      average_rating: 'content.average_rating'
    };
    query = query.orderBy(sortMapping[sort_by] || 'content.title', order);

    // Apply pagination
    query = query
      .offset((page - 1) * limit)
      .limit(limit);

    // Execute queries
    const [items, countResult] = await Promise.all([
      query,
      countQuery
    ]);

    // Get genres for all content items efficiently
    const contentIds = items.map(item => item.id);
    const genres = contentIds.length > 0 ? await knex('genres as g')
      .join('content_genres as cg', 'g.id', 'cg.genre_id')
      .whereIn('cg.content_id', contentIds)
      .select(['g.name', 'cg.content_id']) : [];

    // Map genres to content items and format them
    const itemsWithGenres = items.map(item => ({
      ...this.formatContentItem(item),
      genres: genres
        .filter(g => g.content_id === item.id)
        .map(g => g.name)
    }));

    const total = parseInt(countResult.count);
    const total_pages = Math.ceil(total / limit);

    return {
      page,
      total_pages,
      total_items: total,
      items: itemsWithGenres
    };
  }

  static async getById(id) {
    const content = await this.buildBaseQuery()
      .where('content.id', id)
      .first();

    if (!content) {
      return null;
    }

    // Get genres
    content.genres = await GenreModel.getByContentId(id);

    // Get reviews
    const reviews = await knex('reviews as r')
      .join('users as u', 'r.user_id', 'u.id')
      .where('r.content_id', id)
      .select([
        'u.id as user_id',
        'u.username',
        'r.rating',
        'r.comment',
        'r.created_at'
      ])
      .orderBy('r.created_at', 'desc');

    content.reviews = reviews.map(review => ({
      user: {
        id: review.user_id,
        username: review.username
      },
      rating: review.rating,
      comment: review.comment,
      created_at: review.created_at
    }));

    return this.formatContentItem(content);
  }
}

module.exports = ContentModel;