const express = require("express");
const routes = express();

const {
  createUser,
  listCategory,
  userLogin,
  detailUser,
  updateUser,
  detailProduct,
  editProduct,
  insertProduct,
  listProducts,
  removeProduct,
  detailClient,
  editClient,
  insertClient,
  listClients,
} = require("../controllers");

const {
  auth,
  emailExists,
  verifyNameEmailPassword,
  VerifyLoginEmailPass,
  userExists,
} = require("../middlewares");

routes.post("/usuario", verifyNameEmailPassword, emailExists, createUser);
routes.post("/login", userExists, VerifyLoginEmailPass, userLogin);
routes.use(auth);
routes.get("/categoria", listCategory);
routes.get("/usuario", detailUser);
routes.put("/usuario", verifyNameEmailPassword, updateUser);

routes.post("/produto", insertProduct);
routes.put("/produto/:id", editProduct);
routes.get("/produto", listProducts);
routes.get("/produto/:id", detailProduct);
routes.delete("/produto/:id", removeProduct);

routes.post("/cliente", insertClient);
routes.put("/cliente/:id", editClient);
routes.get("/cliente", listClients);
routes.get("/cliente/:id", detailClient);

module.exports = routes;
