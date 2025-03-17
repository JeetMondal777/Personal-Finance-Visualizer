import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BudgetComparisonChart = ({ transactions, budgets }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Aggregate total spending per category
  const actualExpenses = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  // Convert data into chart-friendly format
  const chartData = Object.keys(budgets).map((category) => ({
    category,
    budget: budgets[category] || 0,
    actual: actualExpenses[category] || 0,
  }));

  // Filter data based on selection
  const filteredData =
    selectedCategory === "All" ? chartData : chartData.filter((data) => data.category === selectedCategory);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">Budget vs. Actual Expenses</h2>

      {/* Dropdown for category selection */}
      <div className="mb-4 text-center">
        <label className="mr-2 font-semibold">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          {Object.keys(budgets).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="category" tick={{ fontSize: 12 }} angle={-15} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#82ca9d" name="Budgeted" />
          <Bar dataKey="actual" fill="#8884d8" name="Actual Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetComparisonChart;
