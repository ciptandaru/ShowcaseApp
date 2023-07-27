const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const errorHandling = require("../middleware/errorHandling");
const CustomerController = require("../controllers/customerController");

router.get("/admin/products", AdminController.fetchProduct);
router.get("/admin/images/:id", AdminController.fetchImage);
router.post("/admin/products", AdminController.addProduct);
router.delete(
  "/admin/products/:id",

  AdminController.deleteProduct
);
router.get("/admin/categories", AdminController.fetchCategory);
router.get(
  "/admin/categories/:id",

  AdminController.detailCategory
);
router.post(
  "/admin/categories",

  AdminController.createCategory
);
router.put(
  "/admin/categories/:id",

  AdminController.putCategory
);
router.delete(
  "/admin/categories/:id",

  AdminController.deleteCategory
);
router.get("/admin/:slug", AdminController.detailProduct);
router.put("/admin/:slug", AdminController.editProduct);

router.get("/products", CustomerController.fetchProductCus);
router.get("/products/:slug", CustomerController.detailProductCus);

router.use(errorHandling);

module.exports = router;
