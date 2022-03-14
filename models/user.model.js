const Sequelize = require('sequelize');
const db = require("../database/db")

module.exports = db.sequelize.define(
    'user',
    {
        user_id: {
            type: Sequelize.STRING,
            primaryKey: true
          },
          username: {
            type: Sequelize.STRING
          },
          password: {
            type: Sequelize.STRING
          },
          created: {
            type: Sequelize.DATE
          }
    },
    {
        timestamps: false
    }
)