'use strict'
const { Category } = require('../models');
const { Product } = require('../models');
const { Image } = require('../models');

exports.getCategories = async (req, res, next) => {
  try {

    const categories = await Category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!categories) {
      const error = new Error("Categories don't exist");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ categories: categories });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryExists = await Category.findByPk(id);
    if (!categoryExists) {
      const error = new Error("Category doesn't exist");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ category: categoryExists });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newCategory = await Category.create({
      name: name,
      description: description,
      logo:"aksja",
    });
    res.status(201).json({ category: newCategory });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const categoryExists = await Category.findByPk(id);
    if (!categoryExists) {
      const error = new Error("Category doesn't exist");
      error.statusCode = 401;
      throw error;
    }
    categoryExists.name = name;
    categoryExists.description = description;
    await categoryExists.save();
    res
      .status(201)
      .json({
        message: "Category updated succesfully",
        category: categoryExists,
      });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryExists = await Category.findByPk(id);
    if (!categoryExists) {
      const error = new Error("Category doesn't exist");
      error.statusCode = 401;
      throw error;
    }
    await categoryExists.destroy();
    res.status(201).json({ messsage: "Resource deleted succesfully." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentPage = req.query.page || 1;
    const perPage = 4;

    const categoryExists = await Category.findByPk(id);
    const categoryProducts = await categoryExists.getProducts({
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Image,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          through: { attributes: [] },
        }
      ]
    });

    if (!categoryExists) {
      const error = new Error("Category doesn't exist");
      error.statusCode = 401;
      throw error;
    }

    const response = {
      name: categoryExists.name,
      products: categoryProducts
    }
    
    res.status(200).json({ productsByCategory: response });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

