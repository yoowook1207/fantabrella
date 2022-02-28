const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize = require('../../config/connection')

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll().then(dbCategoryData => res.json(dbCategoryData)).catch(err =>{
    console.log(err);
    res.status(500).json(err)
  })
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name',
      [sequelize.literal('(SELECT product_name FROM product WHERE category.id = product.category_id)'), 'products']
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData)).catch(err =>{
    console.log(err);
    res.status(500).json(err)
  })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData)).catch(err =>{
    console.log(err);
    res.status(500).json(err)
  })
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => res.json(dbCategoryData)).catch(err =>{
    console.log(err);
    res.status(500).json(err)
  })
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => res.json(dbCategoryData)).catch(err =>{
    console.log(err);
    res.status(500).json(err)
  })
  // delete a category by its `id` value
});

module.exports = router;
