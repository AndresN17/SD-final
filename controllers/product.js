"use strict";
const { Product } = require("../models");
const { Image } = require('../models');
const { State } = require('../models');
const { promisify } = require('util');

const client = require('../utils/redis');


const GET_ASYNC = promisify(client.get).bind(client);
const SETEX_ASYNC = promisify(client.setex).bind(client);



exports.getProducts = async (req, res, next) => {
  try {

    const reply = await GET_ASYNC("products");
    
    if (reply) {
      const products = JSON.parse(reply);
      return res.status(200).json({ products: products });
    }

    const products = await Product.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "StateId"],
      },
      include: [
        {
          model: Image,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id_tienda"],
          },
          through: { attributes: [] },
        },
        {
          model: State,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"],
          },
        },
      ],
    });

    if (!products) {
      const error = new Error("Products doesn't exist");
      error.statusCode = 401;
      throw error;
    }

    const p = JSON.stringify(products);
    await SETEX_ASYNC("products", 180, p);
    res.status(200).json({ products: products });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productExists = await Product.findByPk(id);
    if (!productExists) {
      const error = new Error("Product doesn't exist");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ product: productExists });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const {
      title,
      weight,
      price,
      description,
      dimension,
      material,
      quantity,
    } = req.body;

    const image = req.image;

    const newProduct = await Product.create({
      title: title,
      weight: weight,
      price: price,
      description: description,
      dimension: dimension,
      material: material,
      quantity: quantity,
    });


    res.status(201).json({ product: newProduct });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const {
      id,
      title,
      weight,
      price,
      description,
      dimension,
      material,
      quantity,
    } = req;

    const productExists = await Product.findByPk(id);

    if (!productExists) {
      const error = new Error("Product doesn't exist");
      error.statusCode = 401;
      throw error;
    }
    productExists.title = title;
    productExists.weight = weight;
    productExists.price = price;
    productExists.description = description;
    productExists.dimension = dimension;
    productExists.material = material;
    productExists.quantity = quantity;

    await productExists.save();
    res
      .status(201)
      .json({ message: "Estado updated succesfully", product: productExists });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productExists = await Product.findByPk(id);
    if (!productExists) {
      const error = new Error("Product doesn't exist");
      error.statusCode = 401;
      throw error;
    }
    await productExists.destroy();
    res.status(201).json({ messsage: "Resource deleted succesfully." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
