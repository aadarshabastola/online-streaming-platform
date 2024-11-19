/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Clear existing entries
    await knex('content').del();
    
    // Get genre IDs
    const documentaryGenre = await knex('genres').where({ name: 'Documentary' }).first();
    const dramaGenre = await knex('genres').where({ name: 'Drama' }).first();
    const warGenre = await knex('genres').where({ name: 'War' }).first();
  
    // Insert content
    const [ourPlanet, bestYears] = await knex('content').insert([
      {
        title: 'Our Planet - Forests',
        synopsis: 'Examine the fragile interdependence that exists between forests\' wide variety of residents, including bald eagles, hunting dogs and Siberian tigers.',
        release_date: '2019-04-05',
        director: 'Jeff Wilson',
        cast: ['David Attenborough'],
        content_type: 'documentary',
        duration: 48,
        average_rating: 4.8, // totally made up for now
        thumbnail_url: 'https://img.youtube.com/vi/JkaxUblCGz0/maxresdefault.jpg',
        video_url: 'https://www.youtube.com/watch?v=JkaxUblCGz0'
      },
      {
        title: 'The Best Years of Our Lives',
        synopsis: 'Fred, Al and Homer are three World War II veterans facing difficulties as they re-enter civilian life.',
        release_date: '1946-12-25',
        director: 'William Wyler',
        cast: ['Fredric March', 'Myrna Loy', 'Dana Andrews', 'Teresa Wright'],
        content_type: 'movie',
        duration: 172, // Movie is 2h52m
        average_rating: 4.5, // Why not?
        thumbnail_url: 'https://img.youtube.com/vi/mAfM_1RirWY/maxresdefault.jpg',
        video_url: 'https://www.youtube.com/watch?v=mAfM_1RirWY'
      }
    ]).returning('id');
  
    // Insert genre relationships
    await knex('content_genres').insert([
      { content_id: ourPlanet.id, genre_id: documentaryGenre.id },
      { content_id: bestYears.id, genre_id: dramaGenre.id },
      { content_id: bestYears.id, genre_id: warGenre.id }
    ]);
  };