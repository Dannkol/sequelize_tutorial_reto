import { Sequelize } from "sequelize";

const sequelize = new Sequelize('database_development_test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
