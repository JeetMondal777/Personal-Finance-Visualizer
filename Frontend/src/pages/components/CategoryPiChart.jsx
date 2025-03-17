import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#8884d8", "#82ca9d", "#FFBB28", "#FF8042", 
  "#0088FE", "#00C49F", "#FF6384", "#36A2EB", "#FFCD56"
]; // Different colors for each category

const CategoryPieChart = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState(""); // Default: Show all

  // Extract unique months from transactions for dropdown options
  const uniqueMonths = [...new Set(
    transactions.map((transaction) => transaction.date.slice(0, 7)) // "YYYY-MM"
  )];

  // Filter transactions by the selected month
  const filteredTransactions = selectedMonth
    ? transactions.filter((transaction) => transaction.date.startsWith(selectedMonth))
    : transactions;

  // Group transactions by category and sum their amounts
  const categoryTotals = filteredTransactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    acc[category] = (acc[category] || 0) + parseFloat(amount);
    return acc;
  }, {});

  // Convert data into a format suitable for Recharts
  const data = Object.keys(categoryTotals).map((category, index) => ({
    name: category,
    value: categoryTotals[category],
    color: COLORS[index % COLORS.length], // Assign colors cyclically
  }));

  return (
    <div className="bg-white p-4 shadow-lg rounded-md">
      <h2 className="text-lg font-semibold text-center mb-2">Category-wise Expenses</h2>

      {/* Month Selection Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Month:
        </label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Transactions</option>
          {uniqueMonths.map((month, index) => (
            <option key={index} value={month}>
              {new Date(`${month}-01`).toLocaleString("default", { month: "long", year: "numeric" })}
            </option>
          ))}
        </select>
      </div>

      {/* Pie Chart */}
      {data.length > 0 ? (
        <PieChart width={300} height={300}>
          <Pie 
            data={data}
            cx="50%" 
            cy="50%" 
            outerRadius={100} 
            fill="#8884d8" 
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p className="text-sm text-gray-500 text-center">No transactions found for this month.</p>
      )}
    </div>
  );
};

export default CategoryPieChart;
