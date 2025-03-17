import { useState, useEffect } from "react";
import { Progress } from "@radix-ui/react-progress"; // You can use Tailwind or ShadCN/ui

const BudgetProgress = ({ transactions, budgets }) => {
  const [categorySpending, setCategorySpending] = useState({});

  useEffect(() => {
    const spending = transactions.reduce((acc, transaction) => {
      const { category, amount } = transaction;
      acc[category] = (acc[category] || 0) + parseFloat(amount);
      return acc;
    }, {});
    setCategorySpending(spending);
  }, [transactions]);

  return (
    <div className="p-4 bg-green-100 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-3 text-center">Budget Tracking</h2>
      {Object.keys(budgets).length === 0 ? (
        <p className="text-center text-gray-500">No budgets set yet.</p>
      ) : (
        Object.keys(budgets).map((category, index) => {
          const budget = budgets[category];
          const spent = categorySpending[category] || 0;
          const percentage = (spent / budget) * 100;
          const isOverBudget = spent > budget;

          return (
            <div key={index} className="mb-4">
              <p className="text-sm font-medium">{category}: ₹{spent} / ₹{budget}</p>
              <Progress
                className="w-full h-3 rounded bg-gray-200"
                style={{ width: `${percentage > 100 ? 100 : percentage}%`, backgroundColor: isOverBudget ? "red" : "blue" }}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default BudgetProgress;
