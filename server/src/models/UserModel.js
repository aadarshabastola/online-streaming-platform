const knex = require("../../db/knex");

class UserModel {
  static async findByEmail(email) {
    return knex("users").where({ email }).first();
  }

  static async create(userData) {
    const [user] = await knex("users")
      .insert(userData)
      .returning(["id", "username", "email"]);
    return user;
  }

  static async findById(id) {
    return knex("users")
      .select(["id", "username", "email"])
      .where({ id })
      .first();
  }
}

module.exports = UserModel;
