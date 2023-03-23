const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [{ model: Product }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name'],
      include: [{ model: Product }],
    });
    if (!tagsData) {
      res.status(404).json({ message: 'No tag found.' });
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagsData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTagsData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedTagsData) {
      res.status(404).json({ message: 'No tag found.'});
      return;
    }
    res.status(200).json(updatedTagsData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTagsData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTagsData) {
      res.status(404).json({ message: 'No tag found.'});
      return;
    }
    res.status(200).json(deletedTagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
