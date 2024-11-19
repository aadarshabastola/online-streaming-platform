const ContentModel = require('../models/ContentModel');
const AppError = require('../errors/AppError');
const { validateContentQuery } = require('../middleware/validation/contentValidation');

class ContentController {
  static async list(req, res, next) {
    try {
      const result = await ContentModel.list(req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getDetails(req, res, next) {
    try {
      const content = await ContentModel.getById(req.params.id);
      
      if (!content) {
        throw new AppError(
          'CONTENT_NOT_FOUND',
          'Content with the specified ID was not found.',
          404
        );
      }

      res.json(content);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ContentController;