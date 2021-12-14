const express = require('express');
const moviesService = require('../services/movies');
//const { moviesMock } = require('../utils/mocks/movies')
const MoviesService = require('../services/movies');
const { movieIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService


    router.get('/', async function (req, res, next) {
        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags });

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });
        } catch (err) {
            next(err);
        }
    });


    router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;
        try {
            // const movies = await Promise.resolve(moviesMock[0])
            const movies = await moviesService.getMovie({ movieId })
            res.status(200).json({
                data: movies,
                message: 'movie retrieved'
            });

        } catch (error) {
            next(error)
        }
    })


    router.post('/', validationHandler(createMovieSchema), async function (req, res, next) {
        const { body: movie } = req;
        try {
            // const createMovieId = await Promise.resolve(moviesMock[0].id)
            const createMovieId = await moviesService.createMovie({ movie })

            res.status(201).json({
                data: createMovieId,
                message: 'movies created'
            });

        } catch (error) {
            next(error)
        }
    })


    router.put('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;

        try {
            // const upddateMovieId = await Promise.resolve(moviesMock[0].id)
            const upddateMovieId = await moviesService.updateMovie({ movieId, movie })
            res.status(200).json({
                data: upddateMovieId,
                message: 'movies updated'
            });

        } catch (error) {
            next(error)
        }
    })


    router.delete('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;

        try {
            const deleteMovieId = await moviesService.deleteMovie({ movieId });
            // const deleteMovie = await Promise.resolve(moviesMock[0].id)
            res.status(200).json({
                data: deleteMovie,
                message: 'movie deleted'
            });

        } catch (error) {
            next(error)
        }
    })
}

module.exports = moviesApi