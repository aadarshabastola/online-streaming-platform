const Joi = require('joi');
const AppError = require('../../errors/AppError');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query, { abortEarly: false });
    if (error) {
      throw new AppError(
        'INVALID_QUERY_PARAMETERS',
        error.details.map(detail => detail.message).join(', '),
        400
      );
    }
    next();
  };
};

const contentQuerySchema = Joi.object({
  search: Joi.string(),
  genre: Joi.string(),
  actor: Joi.string(),
  content_type: Joi.string().valid('movie', 'tv_show', 'documentary'),
  release_year: Joi.number().integer(),
  sort_by: Joi.string().valid('title', 'release_date', 'average_rating'),
  order: Joi.string().valid('asc', 'desc').default('asc'),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
}).unknown(false);

module.exports = {
  validateContentQuery: validate(contentQuerySchema)
};