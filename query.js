const pool = require("./config.js");
const express = require("express");
const router = express.Router();

//rest api

//get

//status code
// 200 = berhasil
// 201 = berhasil create
// 400 = bad request
// 404 = not found
// 401 = unauthorize

// get all film localhost:3000/film
router.get("/film", (req, res) => {
  const query = `
        SELECT * FROM film
    `;

  pool.query(query, (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

// get film by id localhost:3000/film/:id
router.get("/film/:id", (req, res) => {
  const { id } = req.params;

  const findQuery = `
        SELECT 
            *
        FROM film
            WHERE film_id = $1
    `;

  pool.query(findQuery, [id], (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows[0]);
  });
});

// get all category localhost:3000/category
router.get("/category", (req, res) => {
  const query = `
          SELECT * FROM category
      `;

  pool.query(query, (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

// get film by category localhost:3000/category/:category/film
router.get("/category/:category/film", (req, res) => {
  const { category } = req.params;
  const query = `
                     SELECT
                         film.film_id AS film_id,
                         category.name AS category,
                         film.title AS title,
                         film.description AS description,
                         film.last_update AS last_update
                      FROM film
                          INNER JOIN
                              film_category ON film.film_id = film_category.film_id
                          INNER JOIN
                              category ON film_category.category_id = category.category_id
                      WHERE
                          category.category_id = $1
       `;

  //option 2 film by category
  //   const query = `
  //                   SELECT
  //                       film.*,
  //                       category.name AS category_name
  //                   FROM film
  //                   JOIN
  //                       film_category ON film.film_id = film_category.film_id
  //                   JOIN
  //                       category ON film_category.category_id = category.category_id
  //                   WHERE
  //                       category.category_id = $1
  //           `;

  pool.query(query, [category], (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

module.exports = router;
