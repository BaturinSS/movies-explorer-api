const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  deleteMovie, getMovies, createMovie,
} = require('../controllers/movies');

router
  .get('/', getMovies)
  .post('/', celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
      trailerLink: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
      thumbnail: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
      owner: Joi.string().required().hex().length(24),
      movieId: Joi.string().required().hex(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }), createMovie)
  .delete('/:id', celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  }), deleteMovie);

module.exports = router;
