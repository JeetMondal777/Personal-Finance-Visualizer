const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({
  userId:{
        type:String,
        required:true
    },
  amount: { 
        type: Number,
        required: true },
  date: { 
        type: Date, 
        required: true },
  description: { 
        type: String, 
        required: true },
});

const TransactionModel = mongoose.model("Transaction", TransactionSchema);
module.exports = TransactionModel;
