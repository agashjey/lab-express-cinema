const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie.model')
/* GET /

This is a health check. It allows us to see that the API is running.
*/
router.get('/', (req, res, next) =>
  res.json({ success: true, name: 'lab-express-cinema' })
)

router.get('/movies', async (req, res) => {
  const movies = await Movie.find().select({title:1, director:1});
  res.json(movies);
});


router.get('/movies/:movieId', (req, res, next) => {
  const { movieId } = req.params;
 
  Movie.findById(movieId)
    .then(theMovie => res.status(200).json(theMovie))
    .catch(error => {
      console.log('Error while retrieving movie details: ', error);
 
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

module.exports = router
