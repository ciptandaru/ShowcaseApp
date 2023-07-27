const {getDatabase} = require("../config/mongoConnection");
const {ObjectId, Long} = require("mongodb");
const User = require("../models/user");
const Redis = require("ioredis");
const {hashPassword} = require("../helper/bcrypt");

module.exports = {
  findAllUsers: async (req, res, next) => {
    try {
      const data = await User.findAll();

      res.status(200).json({
        statusCode: 200,
        data,
      });
    } catch (error) {
      console.log();
      next(error);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const {username, email, password, phoneNumber, address} = req.body;

      const newUser = await User.createUser({
        username,
        email,
        password: hashPassword(password),
        role: "Admin",
        phoneNumber,
        address,
      });

      res.status(201).json({
        statusCode: 201,
        id: newUser.insertedId,
        message: `${email} Created`,
      });
    } catch (error) {
      console.log();
      next(error);
    }
  },

  findUserById: async (req, res, next) => {
    try {
      const {id} = req.params;

      const foundUser = await User.findById(id);

      res.status(200).json({
        statusCode: 200,
        data: foundUser,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteUserById: async (req, res, next) => {
    try {
      const {id} = req.params;

      const isDeleted = await User.deleteUser(id);

      if (isDeleted) {
        res.status(200).json({
          statusCode: 200,
          message: "User deleted successfully",
        });
      } else {
        res.status(404).json({
          statusCode: 404,
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
