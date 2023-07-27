const {Product, Category, Image, sequelize} = require("../models");

class AdminController {
  //================================================CRUD Product=========================================
  static async fetchProduct(req, res, next) {
    try {
      const fetchData = await Product.findAll({
        include: [
          {
            model: Category,
          },
          {
            model: Image,
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      console.log(fetchData, "=====================");
      res.status(200).json(fetchData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async detailProduct(req, res, next) {
    try {
      const {slug} = req.params;
      const detail = await Product.findOne({
        where: {slug: slug},

        include: [
          {
            model: Category,
          },
          {
            model: Image,
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!detail) {
        throw {
          name: "NOT_FOUND",
        };
      }

      res.status(200).json(detail);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async addProduct(req, res, next) {
    try {
      const {
        name,
        description,
        price,
        mainImg,
        CategoryId,
        images1,
        images2,
        images3,
      } = req.body;

      let trx = await sequelize.transaction();

      const addProduct = await Product.create(
        {
          name,
          slug: name.replace(/\s+/g, "-").toLowerCase(),
          description,
          price,
          mainImg,
          CategoryId,
          AuthorId: 1,
        },
        {transaction: trx}
      );
      console.log(addProduct.id);
      const createdImage = await Image.bulkCreate(
        [
          {
            ProductId: addProduct.id,
            imgUrl: images1,
          },
          {
            ProductId: addProduct.id,
            imgUrl: images2,
          },
          {
            ProductId: addProduct.id,
            imgUrl: images3,
          },
        ],
        {transaction: trx}
      );

      trx.commit();

      res.status(201).json({addProduct, Image: createdImage});
    } catch (err) {
      console.log(err);
      trx.rollback();
      next(err);
    }
  }
  static async editProduct(req, res, next) {
    try {
      const {slug} = req.params;

      const {name, description, price, mainImg, CategoryId} = req.body;
      const editProduct = await Product.update(
        {
          name,
          slug: name.replace(/\s+/g, "-").toLowerCase(),
          description,
          price,
          mainImg,
          CategoryId,
          AuthorId: 1,
        },
        {
          where: {slug},
          returning: true,
        }
      );
      res.status(201).json(editProduct[1][0]);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const {id} = req.params;
      const product = await Product.findByPk(id);
      const deleteProduct = await Product.destroy({
        where: {id: id},
      });
      if (!deleteProduct) {
        throw {
          name: "NOT_FOUND",
        };
      }
      res.status(200).json(`${product.name} success to delete`);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  //================================================CRUD Product END=========================================
  //================================================CRUD Category=========================================
  static async fetchCategory(req, res, next) {
    try {
      const category = await Category.findAll();
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
  static async createCategory(req, res, next) {
    try {
      const {name} = req.body;
      const category = await Category.create({
        name,
      });
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }
  static async detailCategory(req, res, next) {
    try {
      const {id} = req.params;
      const detailCategory = await Category.findByPk(id);
      res.status(200).json(detailCategory);
    } catch (err) {
      next(err);
    }
  }
  static async putCategory(req, res, next) {
    try {
      const {id} = req.params;
      const {name} = req.body;
      const editCategory = await Category.update(
        {
          name,
        },
        {
          where: {id},
          returning: true,
        }
      );
      res.status(201).json(editCategory[1][0]);
    } catch (err) {
      next(err);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const {id} = req.params;
      const category = await Category.findByPk(id);
      const categoryDelete = await Category.destroy({
        where: {
          id: id,
        },
      });
      if (!categoryDelete) {
        throw {
          name: "NOT_FOUND",
        };
      }
      res.status(200).json(`${category.name} success to delete`);
    } catch (err) {
      next(err);
    }
  }
  //================================================CRUD Category END=========================================
  static async fetchImage(req, res, next) {
    try {
      const {id} = req.params;

      const img = await Image.findAll({
        where: {
          ProductId: id,
        },
        include: {
          model: Product,
          attributes: ["mainImg"],
        },
      });

      res.status(200).json(img);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = AdminController;
