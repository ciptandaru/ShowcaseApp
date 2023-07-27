const {Product, Category, Image} = require("../models");

class CustomerController {
  //=============================ReadProduct================================
  static async fetchProductCus(req, res, next) {
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
      res.status(200).json(fetchData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async detailProductCus(req, res, next) {
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
      if (detail === null) {
        throw {
          name: "NOT_FOUND",
        };
      }
      res.status(200).json(detail);
    } catch (err) {
      next(err);
    }
  }
  //=============================ReadProduct================================
}

module.exports = CustomerController;
