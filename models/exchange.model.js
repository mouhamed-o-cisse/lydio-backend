const Sequelize = require('sequelize');
const db = require("../database/db")

module.exports = db.sequelize.define(
    'exchange',
    {
        exchange_id: {
            type: Sequelize.STRING,
            primaryKey: true
            // autoIncrement: true
        },
        watch_to_exchange: {
            type: Sequelize.STRING
        },
        watch_to_exchange_price: {
            type: Sequelize.STRING
        },
        replaced_watch: {
            type: Sequelize.STRING
        },        
        replaced_watch_price: {
            type: Sequelize.STRING
        },
        price_difference: {
            type: Sequelize.STRING
        },
        names: {
            type: Sequelize.STRING
        },
        client_phone_number: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        },
        delivery_address: {
            type: Sequelize.STRING
        },
        delivery_price: {
            type: Sequelize.STRING
        },  
        delivery_guy: {
            type: Sequelize.STRING
        },   
        print_status: {
            type: Sequelize.STRING
        },   
        delivery_status: {
            type: Sequelize.STRING
        },
        delivery_status_last_update: {
            type: Sequelize.STRING
        },    
        delivery_date: {
            type: Sequelize.DATE
        },     
        exchange_date: {
            type: Sequelize.DATE
        }, 
        registration_date: {
            type: Sequelize.DATE
        },                
    },
    {
        timestamps: false
    }
)