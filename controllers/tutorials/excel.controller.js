// const db = require("../../models")

// const Tutorial = db.tutorials;

const Orders = require("../../models/order.model")


const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
   
    let path =
    //cb(null, __basedir + "/app/resources/static/assets/uploads/"); FOR PRODUCTION
    // THIS IS FOR DEV
      __basedir + "/lydio-ecom-backend/resources/static/assets/uploads/" + req.file.filename;
      // __basedir + process.env.FILES_PATH + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let orders = [];
 
      rows.forEach((row) => {

        var id = 'ORDER' + '-' + Math.floor(Math.random() * 100000) ;
        const now = new Date()

        if(!row[2] && !row[4]) {
          let order = {
            order_id: id,
            shopify_order_id: row[0],
            names: row[0],
            client_phone_number: row[0],
            delivery_address: row[0],
            quantity: row[16],
            watch_brand_and_model: row[17],
            watch_price: row[18],
            delivery_price: '0',
            order_treatment: 'not-treated',
            order_status_last_update: row[3],
            delivery_status: 'untouched',
            delivery_status_last_update: now,
            payment_status: 'unpaid',
            order_date: row[15],
            registration_date: now
          };
          orders.push(order);
        } 
        else {
          let order = {
            order_id: id,
            shopify_order_id: row[0],
            names: row[24],
            client_phone_number: row[33],
            delivery_address: row[35],
            quantity: row[16],
            watch_brand_and_model: row[17],
            watch_price: row[18],
            delivery_price: row[9],
            order_treatment: 'not-treated',
            order_status_last_update: row[3],
            delivery_status: 'untouched',
            delivery_status_last_update: now,
            payment_status: 'unpaid',
            order_date: row[15],
            registration_date: now
          };
          orders.push(order);
        }

        
      }); 

      Orders.bulkCreate(orders)
        .then(() => {
          res.status(200).send({
            message: req.file.originalname + "Téléchargement réussi" ,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",  
            error: error.message, 
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};
module.exports = {
  upload
};