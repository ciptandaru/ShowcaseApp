const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const usersController = require("../controllers/usersController");
require("dotenv").config();

router.get("/products", productController.renderProducts);
router.get("/products/:slug", productController.getDetail);
router.post("/products", productController.createProduct);
router.delete("/products/:id", productController.deleteProduct);
router.put("/products/:slug", productController.editProduct);

router.get("/users", usersController.renderUsers);
router.get("/users/:id", usersController.getDetailUser);
router.post("/users", usersController.createUser);
router.delete("/users/:id", usersController.deleteUser);
// router.use(errorHandle);

module.exports = router;
