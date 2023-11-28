const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const payload = await Tag.findAll({
      include: {
        model: Product
      }
    });
    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const payload = await Tag.findByPk(req.params.id, {
      include: {
        model: Product
      }
    });
    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const payload = await Tag.create(req.body);
    // Ex req.body {tag_name: xxxxxx}
    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const payload = await Tag.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }

    );
    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const payload = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
});

module.exports = router;
