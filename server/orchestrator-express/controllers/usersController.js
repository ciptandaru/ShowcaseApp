const Redis = require("ioredis");
const axios = require("axios");
require("dotenv").config();

const redis = new Redis({
  port: 13627,
  host: "redis-13627.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "UcPCs1P59nZGuNtRVONs3IDZwL1ksOfc",
});

const USERS_SERVER_URL =
  process.env.USERS_SERVER_URL || "http://localhost:4001";

class usersController {
  static async renderUsers(req, res, next) {
    try {
      let usersCache = await redis.get("users");

      if (usersCache) {
        let usersResult = JSON.parse(usersCache);
        return res.status(200).json(usersResult);
      }

      const response = await axios.get(`${USERS_SERVER_URL}/users`);

      redis.set("users", JSON.stringify(response.data));

      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async createUser(req, res, next) {
    try {
      const {username, email, password, phoneNumber, address} = req.body;

      const created = await axios.post(`${USERS_SERVER_URL}/users`, {
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      const response = await axios.get(`${USERS_SERVER_URL}/users`);

      await redis.set("users", JSON.stringify(response.data));

      res.status(201).json(created.data);
    } catch (err) {
      console.log(err);
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async deleteUser(req, res, next) {
    const {id} = req.params;

    try {
      const {data} = await axios.delete(`${USERS_SERVER_URL}/users/${id}`);

      if (data) {
        await redis.del("users");
      }

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async getDetailUser(req, res, next) {
    const {id} = req.params;

    try {
      const {data} = await axios.get(`${USERS_SERVER_URL}/users/${id}`);

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(501).json({
        statusCode: 501,
      });
    }
  }
}

module.exports = usersController;
