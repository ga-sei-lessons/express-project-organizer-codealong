let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categtories READ and render all categories
router.get('/', (req, res) => {
  db.category.findAll()
  .then(categories => {
    res.render('categories/index.ejs', { categories })
  })
  .catch(error => {
    res.status(400).render('main/404')
  })
})

// GET /categories/:id READ all projects in one category
router.get('/:id', (req, res) => {
  db.category.findOne({
    where: {
      id: req.params.id
    },
    include: [db.project]
  })
  .then(category => {
    res.render('categories/show.ejs', { category })
  })
})

module.exports = router