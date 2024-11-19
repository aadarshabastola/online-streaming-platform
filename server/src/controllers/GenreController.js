const GenreModel = require('../models/GenreModel');
const AppError = require('../errors/AppError');

class GenreController {
  static async list(req, res, next) {
    try {
      const genres = await GenreModel.list();
      res.json({ genres });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GenreController;