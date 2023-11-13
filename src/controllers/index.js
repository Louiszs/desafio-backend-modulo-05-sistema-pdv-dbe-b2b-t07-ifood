const { createUser, userLogin, detailUser, updateUser } = require("./user");

const {
  detailProduct,
  editProduct,
  insertProduct,
  listProducts,
  removeProduct,
} = require("./products/products");

const {
  detailClient,
  editClient,
  insertClient,
  listClients,
} = require("./clients/clients");

const { requestsList, requestRegister } = require("./requests/requests");

const { listCategory } = require("./categories");

module.exports = {
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
  requestsList,
  requestRegister,
};
