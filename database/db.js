const Sequelize = require('sequelize');
const db = {};

const sequelize =   new Sequelize(
    process.env.CLEARDB_DATABASE_URL, {
    dialect: "mysql",
    pool:{
        max:5,
        min:0,
        aquire: 30000,
        idle: 1000
    },
   } 
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; 