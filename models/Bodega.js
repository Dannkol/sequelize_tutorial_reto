import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

const Bodega = sequelize.define(
  "Bodega",
  {
    name: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Bodega",
  }
);

// Mover la importación del modelo User aquí
import User from "./User.js";


User.hasMany(Bodega,  { foreignKey: "userId", sourceKey: "id" });

Bodega.belongsTo(User, { foreignKey: "userId", sourceKey: "id" });


export default Bodega;
