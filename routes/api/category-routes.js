const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const payload = await Category.findAll({
      include: [{
        model: Product
      }]
    });
    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const payload = await Category.findByPk(req.params.id, {
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
  // create a new category
  try {
    const payload = await Category.create(req.body);
    // Ex req.body {category_name: xxxxxx}
    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const payload = await Category.update(
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
  // delete a category by its `id` value
  try {
    const payload = await Category.destroy({
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
