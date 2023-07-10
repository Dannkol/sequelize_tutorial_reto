import express from "express";

import UserControllers from "../controllers/UserControllers.js";

import Bodega from "../models/Bodega.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/users", async (req, res) => {
  try {


    const users = await UserControllers.findAll();
    console.log("Usuarios:", users[0]);
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

router.get("/bodega/users", async (req, res) => {
    try {
        const bodegas = await Bodega.findAll({ include: "User" });
        const bodegasData = bodegas.map(bodega => bodega.dataValues);
        console.log(bodegasData);
        res.json(bodegasData);

      } catch (error) {
        console.log(error);
      }
      
})
export default router;
