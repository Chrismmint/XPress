//initial setup

const express = require('express');
const artistsRouter = express.Router();

//database
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

artistsRouter.param('articleId', (req, res, next, articleId) => {
  const sql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';
  const values = {$artistId: artistId};
  db.get(sql, values, (error, artist) => {
    if (error) {
      next(error);
    } else if (artist) {
      req.artist = artist;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

/*
/api/artists
- GET
  - Returns a 200 response containing all saved currently-employed artists (`is_currently_employed` is equal to `1`) on the `artists` property of the response body
- POST
  - Creates a new artist with the information from the `artist` property of the request body and saves it to the database. Returns a 201 response with the newly-created artist on the `artist` property of the response body
  - If any required fields are missing, returns a 400 response
*/
artistsRouter.get('/', (req, res, next) => {
  console.log('fjdskl')
  db.all('SELECT * FROM Artist WHERE Artist.is_currently_employed = 1',
    (err, artists) => {
      if (err) {
        next(err);
      } else {
        console.log(artists);
        res.status(200).json({artists: artists});
      }
    }
  );
});

artistsRouter.post('/', (req, res, next) => {
  const name = req.body.artist.name,
        dateOfBirth = req.body.artist.dateOfBirth,
        biography = req.body.artist.biography,
        isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed === 0 ? 0 : 1;
  if (!name || !dateOfBirth || !biography) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed)' +
      'VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)';
  const values = {
    $name: name,
    $dateOfBirth: dateOfBirth,
    $biography: biography,
    $isCurrentlyEmployed: isCurrentlyEmployed
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM Artist WHERE Artist.id = ${this.lastID}`,
        (error, artist) => {
          res.status(201).json({artist: artist});
        });
    }
  });
});

/*
** /api/artists/:artistId**
- GET
  - Returns a 200 response containing the artist with the supplied artist ID on the `artist` property of the response body
  - If an artist with the supplied artist ID doesn't exist, returns a 404 response
- PUT
  - Updates the artist with the specified artist ID using the information from the `artist` property of the request body and saves it to the database. Returns a 200 response with the updated artist on the `artist` property of the response body
  - If any required fields are missing, returns a 400 response
  - If an artist with the supplied artist ID doesn't exist, returns a 404 response
- DELETE
  - Updates the artist with the specified artist ID to be unemployed (`is_currently_employed` equal to `0`). Returns a 200 response.
  - If an artist with the supplied artist ID doesn't exist, returns a 404 response
*/
artistsRouter.get('/:artistId', (req, res, next) => {
  res.sendStatus(404);
});

artistsRouter.put('/:artistId', (req, res, next) => {
  res.sendStatus(404);
});

artistsRouter.delete('/:artistId', (req, res, next) => {
  res.sendStatus(404);
});

//router export

module.exports = artistsRouter;
