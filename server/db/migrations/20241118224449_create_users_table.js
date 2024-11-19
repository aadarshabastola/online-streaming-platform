/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      // UUID primary key
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      // Username field (required in registration)
      table.string('username').notNullable().unique();
      // Email field (required in registration and login)
      table.string('email').notNullable().unique();
      // Password field (required in registration and login)
      table.string('password').notNullable();
      // Timestamps for record keeping
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };