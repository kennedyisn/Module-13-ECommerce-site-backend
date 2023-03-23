const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      attributes: ['id', 'category_name'],
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  try {
    const updatedCategoryData = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCategoryData) {
      res.status(404).json({ message: 'No category found.' });
      return;
    }
    res.status(200).json(updatedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedData = Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedData) {
      res.status(404).json({ message: 'No category found.'});
      return;
    }
    res.status(200).json(deletedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;