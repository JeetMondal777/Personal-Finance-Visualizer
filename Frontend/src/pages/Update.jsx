import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const EditTransactionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transaction = location.state?.transaction || {};

  const [amount, setAmount] = useState(transaction.amount || "");
  const [date, setDate] = useState(transaction.date || "");
  const [transactionId, setTransactionId] = useState(transaction._id || "");
  const [description, setDescription] = useState(transaction.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setDate(transaction.date);
      setDescription(transaction.description);
      setTransactionId(transaction._id);
    }
  }, [transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description) {
      setError("All fields are required.");
      return;
    }
    try{
      const updatedTransaction = { amount, date, description };
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/transaction/${transactionId}`,updatedTransaction)
    if(response.status === 200){
      console.log(response.data);
      navigate("/");
    }

    setLoading(true);
    setError("");
    } catch (err) {
      setError("Error updating transaction. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Edit Transaction
      </h2>
      
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-gray-700 font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-gray-700 font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTransactionForm;
