const { moviesMock } = require('../utils/mocks/movies')

const MongoLib = require('../lib/mongo');
const { query } = require('express');
class MoviesService{
    constructor(){
        this.collection = 'movies'
        this.mongoDB = new MongoLib();
    }
    async getMovies({ tags }){
        const query = tags && {tags : { $in: tags }};
        // const movies = await Promise.resolve(moviesMock);
        const movies = await this.mongoDB.getAll(this.collection, query);

        return movies || [];
    }

    async getMovie({movieId}){
        // const movies = await Promise.resolve(moviesMock[0]);
        const movies = await this.mongoDB.get(this.collection, movieId);

        return movies || {};
    }

    async createMovie({movie}){
        // const createMovieId = await Promise.resolve(moviesMock[0].id);
        const createMovieId = await this.mongoDB.create(this.collection, movie);

        return createMovieId;
    }

    async updateMovie({movieId, movie} = {}){
        //const updateMovie = await Promise.resolve(moviesMock[0].id);
        const updateMovie = await this.mongoDB.create(this.collection, movieId, movie);

        return updateMovie;
    }
    
    async deleteMovie({movieId}){
        //const deleteMovieId = await Promise.resolve(moviesMock[0].id);
        const deleteMovieId = await this.mongoDB.delete(this.collection, movieId);
        

        return deleteMovieId;
    }
}

module.exports = MoviesService;
