const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      },
    ],
  })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Could not retrieve' })
    })
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', (req, res) => {
  const catId = req.params.id
  Category.findOne({
    where: { id: catId },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  })
});

// create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((category) => res.status(200).json(category))
    .catch((err) => {
      console.errog(err);
      res.status(400).json(err)
    })
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => {
      console.error(err)
      res.status(400).json(err)
    })
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  const catId = req.params.id;
  Category.destroy({
    where: { id: catId },
  })
    .then((deletedCat) => {
      if (deletedCat === 0) {
        res.status(404).json({ error: 'Category not found' });
      } else {
        res.json({ message: 'Category deleted' })
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete' })
    })
});

module.exports = router;
