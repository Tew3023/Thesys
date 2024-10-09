const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  fullname: String,
  userId:String,
  address: String,
  order_id: String,
  session_id:String,
  status: String,
});

module.exports = mongoose.model("order", OrderSchema);
