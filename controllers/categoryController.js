const { Category } = require("../models");

exports.createCategory = async (req, res) => {
  async (req, res) => {
    const { name, description } = req.body;
    const user_id = Number(req.body.user_id);
    const loggedInUserId = req.user.userId;

    if (user_id !== loggedInUserId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to create this category" });
    }

    try {
      const category = await Category.create({
        name,
        description,
        user_id,
      });

      res.status(201).json({ message: "Category created", category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["name", "ASC"]],
      include: ["books"],
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCategoriesManually = async (req, res) => {
  try {
    const allCategories = await Category.findAll();

    const sortedCategories = allCategories.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    res.status(200).json(sortedCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;
  const categoryId = Number(req.params.id);
  const loggedInUserId = req.user.userId;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (category.user_id !== loggedInUserId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this category" });
    }

    category.name = name;
    category.description = description;

    await category.save();

    res.status(200).json({ message: "Category updated", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  const categoryId = Number(req.params.id);
  const loggedInUserId = req.user.userId;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (category.user_id !== loggedInUserId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this category" });
    }

    await category.destroy();

    res.status(200).json({ msg: "category deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
