import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthlyExpensesChart = ({ transactions }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;

    // Group transactions by month
    const expensesByMonth = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).toLocaleString("default", { month: "short" });
      acc[month] = (acc[month] || 0) + parseFloat(transaction.amount);
      return acc;
    }, {});

    // Convert to an array and sort months in correct order
    const chartData = monthOrder.map((month) => ({
      month,
      amount: expensesByMonth[month] || 0, // Default to 0 if no expenses
    }));

    setMonthlyData(chartData);
  }, [transactions]); // Update when transactions change

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpensesChart;
