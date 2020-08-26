const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("Studentnew", "sa", "abc@1234", {
  server: "DESKTOP-D8RVGPM",
  host: "DESKTOP-D8RVGPM",
  dialect: "mssql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
