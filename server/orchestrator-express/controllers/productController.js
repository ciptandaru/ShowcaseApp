const Redis = require("ioredis");
const axios = require("axios");
require("dotenv").config();

const redis = new Redis({
  port: 13627,
  host: "redis-13627.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "UcPCs1P59nZGuNtRVONs3IDZwL1ksOfc",
});

const APP_SERVER_URL =
  process.env.APP_SERVER_URL || "http://localhost:4002/admin";
const USERS_SERVER_URL =
  process.env.USERS_SERVER_URL || "http://localhost:4001";

class productController {
  static async renderProducts(req, res, next) {
    try {
      let productsCache = await redis.get("products");
      if (productsCache) {
        let productsResult = JSON.parse(productsCache);
        return res.status(200).json(productsResult);
      }

      const response = await axios.get(`${APP_SERVER_URL}/products`);

      redis.set("products", JSON.stringify(response.data));

      res.status(200).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async createProduct(req, res, next) {
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

      const {data: newProduct} = await axios.post(
        `${APP_SERVER_URL}/products`,
        {
          name,
          description,
          price,
          mainImg,
          CategoryId,
          images1,
          images2,
          images3,
        }
      );

      const {data: products} = await axios.get(`${APP_SERVER_URL}/products`);

      await redis.set("products", JSON.stringify(products));

      res.status(200).json(newProduct);
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const {id} = req.params;
      const {data} = await axios.delete(`${APP_SERVER_URL}/products/${id}`);

      if (data) {
        await redis.del("products");
      }

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async getDetail(req, res, next) {
    try {
      const {slug} = req.params;
      const products = await axios.get(`${APP_SERVER_URL}/${slug}`);
      if (products.authorMongoId) {
        const {data: users} = await axios.get(
          `${USERS_SERVER_URL}/users/${products.authorMongoId}`
        );

        products.User = users.email;
      }

      res.status(200).json(products.data);
    } catch (err) {
      console.log(err);
    }
  }

  static async editProduct(req, res, next) {
    try {
      const {slug} = req.params;

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

      const {data: editProduct} = await axios.put(`${APP_SERVER_URL}/${slug}`, {
        name,
        description,
        price,
        mainImg,
        CategoryId,
        images1,
        images2,
        images3,
      });

      const {data: products} = await axios.get(`${APP_SERVER_URL}/products`);

      await redis.set("products", JSON.stringify(products));

      res.status(200).json(editProduct);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = productController;
