/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sessions", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    // Link to user
    table.uuid("user_id").notNullable();
    // Token management
    table.string("token").notNullable().unique();
    table.boolean("is_valid").notNullable().defaultTo(true);
    table.timestamp("expires_at").notNullable();
    table.timestamps(true, true);

    // Foreign key constraint
    table.foreign("user_id").references("users.id").onDelete("CASCADE");

    // Index for token lookups
    table.index("token");
    // Index for cleanup of expired sessions
    table.index("expires_at");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("sessions");
};
