import { useState, useEffect } from "react";
import axios from "axios";
import TotalExpensesCard from "./components/TotalExpensesCard";
import CategoryBreakdownCard from "./components/CategoryBreakdownCard";
import RecentTransactionsCard from "./components/RecentTransactionsCard";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions
  const getTransactions = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
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
    getTransactions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Dashboard</h2>
      <div className="grid grid-cols-1  gap-4">
        <TotalExpensesCard transactions={transactions} />
        <CategoryBreakdownCard transactions={transactions} />
        <RecentTransactionsCard transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;
