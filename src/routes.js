const express = require("express");
const PontoController = require("./controllers/PontoController");
const routes = new express.Router();
const AdminController = require("./controllers/AdminController");
const verify = require("./Tokens/Verify");

// Pontos
routes.post("/ponto",verify,PontoController.store);
routes.get("/ponto/all",PontoController.index);
routes.get("/ponto/nome/:name",PontoController.show);
routes.put("/ponto/:id",verify,PontoController.update);
routes.delete("/ponto/:id",verify,PontoController.desdroy);

// Admin
routes.post("/admin",AdminController.login);
routes.put("/admin/:user/:password",verify,AdminController.update);


module.exports = routes;
