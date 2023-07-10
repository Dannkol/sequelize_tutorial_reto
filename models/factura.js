"use strict";
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Factura = sequelize.define(
  "Factura",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    cliente: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Factura",
  }
);

export default Factura;
