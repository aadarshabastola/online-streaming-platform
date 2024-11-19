/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    // Foreign keys
    table.uuid("user_id").notNullable();
    table.uuid("content_id").notNullable();
    // Review data
    table.integer("rating").notNullable().checkPositive();
    table.text("comment");
    table.timestamps(true, true);

    // Foreign key constraints
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.foreign("content_id").references("content.id").onDelete("CASCADE");

    // Ensure one review per user per content
    table.unique(["user_id", "content_id"]);

    // Index for aggregating ratings
    table.index(["content_id", "rating"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};
