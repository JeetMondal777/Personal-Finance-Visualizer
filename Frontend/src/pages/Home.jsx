import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ClipLoader } from "react-spinners";
import MonthlyExpensesChart from "./components/MonthlyExpensesBarChart";

const Transactions = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get or create user ID
  const getOrCreateUserId = () => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
    return userId;
  };

  // Fetch transactions
  const getTransaction = async () => {
    try {
      const userId = getOrCreateUserId();
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/transaction/${userId}`
      );
      if (response.status === 200) {
        setTransactions(response.data);
      }
    } catch (err) {
      console.log("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  // Handle form submission (Add Transaction)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userId = getOrCreateUserId();
      const newTransaction = { amount, date, description };

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/transaction/${userId}`,
        newTransaction
      );

      getTransaction(); // Refresh list dynamically
      setAmount("");
      setDate("");
      setDescription("");
    } catch (err) {
      setError("Error processing transaction. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg max-h-full overflow-hidden flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-center">Manage Transactions</h2>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Transaction Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? <ClipLoader size={20} color="white" /> : "Add Transaction"}
        </button>
      </form>

      {/* Transactions List */}
      <div className="mt-6 flex-1 overflow-y-auto max-h-[50vh] scrollbar-none">
        <h2 className="text-lg font-semibold mb-2">Transactions</h2>
        {transactions.length > 0 ? (
          <ul className="space-y-2">
            {transactions.map((transaction) => (
              <li key={transaction._id} className="p-3 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
                <p className="text-sm font-bold text-blue-600">₹{transaction.amount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No transactions found.</p>
        )}
      </div>

      {/* Pass transactions to the chart */}
      <div className="mt-6">
        <MonthlyExpensesChart transactions={transactions} />
      </div>
    </div>
  );
};

export default Transactions;
