/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Clear existing entries
    await knex('content_genres').del();
    await knex('genres').del();
    
    // Insert genres
    await knex('genres').insert([
      { name: 'Documentary' },
      { name: 'Drama' },
      { name: 'War' }
    ]);
  };