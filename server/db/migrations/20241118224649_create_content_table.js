/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex
    .raw(
      "CREATE TYPE content_type_enum AS ENUM ('movie', 'tv_show', 'documentary')"
    )
    .then(() => {
      return knex.schema.createTable("content", (table) => {
        // Primary identifier
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        // Basic content information
        table.string("title").notNullable();
        table.text("synopsis");
        table.date("release_date");
        table.string("director");
        // Content metadata
        table.specificType("content_type", "content_type_enum").notNullable();
        table.integer("duration").notNullable(); // Duration in minutes
        table.decimal("average_rating", 2, 1); // Rating from 0.0 to 5.0
        // Media URLs
        table.string("thumbnail_url");
        table.string("video_url");
        // Timestamps
        table.timestamps(true, true);

        // Index for common queries
        table.index(["content_type", "release_date"]);
        table.index("title");
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("content").then(() => {
    return knex.raw("DROP TYPE content_type_enum");
  });
};
