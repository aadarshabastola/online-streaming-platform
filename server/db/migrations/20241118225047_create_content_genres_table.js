/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("content_genres", (table) => {
    table.uuid("content_id").notNullable();
    table.uuid("genre_id").notNullable();
    // Foreign key constraints
    table.foreign("content_id").references("content.id").onDelete("CASCADE");
    table.foreign("genre_id").references("genres.id").onDelete("CASCADE");
    // Composite primary key
    table.primary(["content_id", "genre_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("content_genres");
};
