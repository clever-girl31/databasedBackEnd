const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      { 
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then((tagData) => {
      res.status(200).json(tagData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Could not retrieve'})
    })
  });

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', (req, res) => {
  const tagID = req.params.id
  Tag.findOne({
    where: { id: tagID },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      },
    ]
  })
  .then((tag) => {
    if (!tag) {
      res.status(404).json({ error: 'Tag not found'})
    } else {
      res.json(tag)
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: 'failed to retrieve'})
  })
});

router.post('/', (req, res) => {
  // {
  //   "tag_name": "new tag"
  // }
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err)
    });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => res.status(200).json(tag))
  .catch((err) => {
    console.error(err)
    res.status(400).json(err)
  })
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  const tagId = req.params.id;
  Tag.destroy({
    where: { id: tagId},
  })
  .then((deletedTag) => {
    if (deletedTag === 0) {
      res.status(404).json({ error: 'Tag not found'});
    } else {
      res.json({ message: 'Tag deleted'})
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete'})
  })
});

module.exports = router;
