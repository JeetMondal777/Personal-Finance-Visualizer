import { useState, useEffect } from "react";

const BudgetForm = ({ setBudgets,  }) => {
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

  // Load budgets from localStorage or set an empty object
  const [budgetData, setBudgetData] = useState(() => {
    return JSON.parse(localStorage.getItem("budgets")) || {};
  });

  // Update state when user changes a budget input
  const handleBudgetChange = (category, value) => {
    setBudgetData((prev) => ({
      ...prev,
      [category]: parseFloat(value) || 0,
    }));
  };

  // Save budgets to localStorage & update parent state
  const handleSaveBudgets = () => {
    setBudgets(budgetData);
    localStorage.setItem("budgets", JSON.stringify(budgetData));
  };

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-lg mb-5">
      <h2 className="text-lg font-semibold mb-3 text-center">Set Monthly Budgets</h2>
      {categories.map((category, index) => (
        <div key={index} className="mb-2">
          <label className="block text-sm font-medium">{category}</label>
          <input
            type="number"
            placeholder="Enter budget"
            className="w-full p-2 border rounded"
            value={budgetData[category] || ""} // Default value if budget is set
            onChange={(e) => handleBudgetChange(category, e.target.value)}
          />
        </div>
      ))}
      <button
        className="w-full bg-blue-500 text-white p-2 rounded mt-3 hover:bg-blue-600"
        onClick={handleSaveBudgets}
      >
        Save Budgets
      </button>
    </div>
  );
};

export default BudgetForm;
