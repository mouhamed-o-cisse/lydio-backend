const Sequelize = require('sequelize');
const db = require("../database/db")

module.exports = db.sequelize.define(
    'order',
    {
        order_id: {
            type: Sequelize.STRING,
            primaryKey: true
            // autoIncrement: true
        },
        shopify_order_id: {
            type: Sequelize.STRING
        },
        names: {
            type: Sequelize.STRING
        },
        client_phone_number: {
            type: Sequelize.STRING
        },        
        delivery_address: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.STRING
        },
        watch_brand_and_model: {
            type: Sequelize.STRING
        },
        watch_price: {
            type: Sequelize.STRING
        },
        delivery_price: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        },  
        delivery_guy: {
            type: Sequelize.STRING
        },      
        order_treatment: {
            type: Sequelize.STRING
        },
        order_status: {
            type: Sequelize.STRING
        },
        order_status_last_update: {
            type: Sequelize.STRING
        },
        delivery_status: {
            type: Sequelize.STRING
        },
        delivery_status_last_update: {
            type: Sequelize.STRING
        },
        print_status: {
            type: Sequelize.STRING
        },
        payment_status: {
            type: Sequelize.STRING
        },
        client_review: {
            type: Sequelize.STRING
        },     
        delivery_date: {
            type: Sequelize.DATE
        },     
        order_date: {
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