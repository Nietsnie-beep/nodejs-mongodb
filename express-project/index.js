const express = require('express');
const app = express();

const {config} = require('./config/index');
const moviesApi = require('./routes/movies.js')

const {logErrors, errorHandler, wrapErrors} = require('./utils/middleware/errorHandler');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

//body parser
app.use(express.json());

//routes
moviesApi(app);
//Catch 404
app.use(notFoundHandler);
//manejadores de errores middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// app.get('/', (req,res)=>{
//     res.send("hello world")
// });

// app.get('/json', (req,res)=>{
//     res.json({hello: 'world'});
// });
app.listen(config.port, () => {
    console.log(`listening http://localhost:${config.port}`);
});