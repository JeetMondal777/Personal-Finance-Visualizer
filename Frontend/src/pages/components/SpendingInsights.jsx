import React from "react";

const SpendingInsights = ({ transactions, budgets }) => {
  if (!transactions.length) return <p className="text-center text-gray-500">No transactions available.</p>;

  // Aggregate total spending per category
  const categoryExpenses = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  // Calculate total spending
  const totalSpent = Object.values(categoryExpenses).reduce((sum, amount) => sum + amount, 0);

  // Determine highest & lowest spending categories
  const sortedCategories = Object.entries(categoryExpenses).sort((a, b) => b[1] - a[1]);
  const highestSpending = sortedCategories[0] || ["None", 0];
  const lowestSpending = sortedCategories.find(([_, amount]) => amount > 0) || ["None", 0];

  // Find overspent categories
  const overspentCategories = Object.entries(categoryExpenses)
    .filter(([category, spent]) => spent > (budgets[category] || 0))
    .map(([category]) => category);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">Simple Spending Insights</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Total Expenses</h3>
          <p className="text-xl font-bold text-red-600">₹{totalSpent.toFixed(2)}</p>
        </div>

        <div className="p-3 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Highest Spending Category</h3>
          <p className="text-xl font-bold text-blue-600">
            {highestSpending[0]} (₹{highestSpending[1].toFixed(2)})
          </p>
        </div>

        <div className="p-3 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Lowest Spending Category</h3>
          <p className="text-xl font-bold text-green-600">
            {lowestSpending[0]} (₹{lowestSpending[1].toFixed(2)})
          </p>
        </div>

        <div className="p-3 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Budget Overshoot</h3>
          <p className="text-xl font-bold text-red-600">
            {overspentCategories.length ? overspentCategories.join(", ") : "None"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;
