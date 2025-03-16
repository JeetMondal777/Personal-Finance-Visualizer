const express = require("express"); 
const Transaction =require("../models/Transaction.model.js");

const router = express.Router();

// Create a new transaction
router.post("/:id", async (req, res) => {
    const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }
  try {
    const { amount, date, description } = req.body;
    if(!amount || !date || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newTransaction = new Transaction({ userId:req.params.id, amount, date, description });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transactions
router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "User ID is required" });
      }
      console.log(id);
      
  
      const transactions = await Transaction.find({ userId:id }).sort({ date: -1 });
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Update a transaction
router.put("/:id", async (req, res) => {
    const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "transaction ID is required" });
      }
  try {
    
    const { amount, date, description } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, date, description },
      { new: true }
    );
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a transaction
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "transaction ID is required" });
      }
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports =  router;
