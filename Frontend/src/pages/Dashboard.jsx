import { useState, useEffect } from "react";
import axios from "axios";
import TotalExpensesCard from "./components/TotalExpensesCard";
import CategoryBreakdownCard from "./components/CategoryBreakdownCard";
import RecentTransactionsCard from "./components/RecentTransactionsCard";
import BudgetForm from "./components/BudgetForm";
import BudgetProgress from "./components/BudgetProgress";
import BudgetComparisonChart from "./components/BudgetComparisonChart";
import SpendingInsights from "./components/SpendingInsights";

const Dashboard = ({ budgetRef }) => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState(() => {
    return JSON.parse(localStorage.getItem("budgets")) || {};
  });

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

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
      <div className="grid grid-cols-1 gap-4">
        <TotalExpensesCard transactions={transactions} />
        <CategoryBreakdownCard transactions={transactions} />
        <RecentTransactionsCard transactions={transactions} />
        
        

        {/* New Budget Tracking Feature */}
        <div id="budget-section" ref={budgetRef}> {/* Add an ID to scroll to */}
          <BudgetForm setBudgets={setBudgets} />
        </div>
        <BudgetProgress transactions={transactions} budgets={budgets} />
      </div>
    </div>
  );
};

export default Dashboard;
