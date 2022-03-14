const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express')
const app = express();
// const dbe = require("./models");
const initRoutes = require("./routes/bulkorders.route");

global.__basedir = __dirname + "/..";

// DATABASE
const database = require('./database/db');

// ROUTES
const Order = require('./routes/order.route');
const User = require('./routes/user.route');
const Exchange = require('./routes/exchange.route');



console.log({env: process.env.CLEARDB_DATABASE_URL});


// console.log({env: process.env.FILES_PATH});

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    res.setHeader('Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
    
  });

  app.use(express.urlencoded({ extended: true }));
  initRoutes(app);

  database.sequelize.sync();
  // db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.");
  // });

app.use(bodyParser.json());

app.use(cors());

app.use(bodyParser.urlencoded
    ({extended: true })
);


app.use("/orders", Order) 
app.use("/user", User) 
app.use("/exchange", Exchange) 
// app.use("/products", Same) 




module.exports = app; 