import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ClipLoader } from "react-spinners";
import MonthlyExpensesChart from "./components/MonthlyExpensesBarChart";
import CategoryPieChart from "./components/CategoryPiChart";
import Dashboard from "./Dashboard";
import SpendingInsights from "./components/SpendingInsights";
import BudgetComparisonChart from "./components/BudgetComparisonChart";

const Transactions = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [budgets, setBudgets] = useState(() => {
    return JSON.parse(localStorage.getItem("budgets")) || {};
  });

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  const budgetRef = useRef(null);

  const scrollToBudget = () => {
    if (budgetRef.current) {
      budgetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Health & Fitness",
    "Entertainment",
    "Bills & Utilities",
    "Education",
    "Savings & Investments",
    "Other",
  ];

  const getOrCreateUserId = () => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
    return userId;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userId = getOrCreateUserId();
      const newTransaction = { amount, date, description, category };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/transaction/${userId}`,
        newTransaction
      );

      if (response.status === 201) {
        getTransaction();
        setAmount("");
        setDate("");
        setDescription("");
        setCategory("");
      }
    } catch (err) {
      setError("Error processing transaction. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (transaction) => {
    navigate("/update", { state: { transaction } });
  };

  const handleDelete = async (id) => {
    try {
      const userId = getOrCreateUserId();
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/transaction/${id}`
      );
      if (response.status === 201) {
        getTransaction();
      }
    } catch (err) {
      console.log("Error deleting transaction:", err);
    }
  };

  return (
    <div className=" mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="max-w-7xl col-span-1 md:col-span-2 lg:col-span-2 bg-gray-50 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Manage Transactions</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded-md" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded-md" />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-md" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded-md">
            <option value="" disabled>Select Category</option>
            {categories.map((cat, index) => (<option key={index} value={cat}>{cat}</option>))}
          </select>
          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">{loading ? <ClipLoader size={20} color="white" /> : "Add Transaction"}</button>
        </form>
        <MonthlyExpensesChart transactions={transactions} />
        <CategoryPieChart transactions={transactions} />
        <SpendingInsights transactions={transactions} budgets={budgets} />
        <BudgetComparisonChart transactions={transactions} budgets={budgets} />

      </div>
      <div className="col-span-1 w-full bg-gray-50 p-4 rounded-lg shadow">
        <Dashboard budgetRef={budgetRef} />
      </div>

    </div>
  );
};

export default Transactions;