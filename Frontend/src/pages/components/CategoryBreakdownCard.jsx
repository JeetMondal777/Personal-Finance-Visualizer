import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#8884d8", "#82ca9d", "#FFBB28", "#FF8042", 
  "#0088FE", "#00C49F", "#FF6384", "#36A2EB", "#FFCD56"
];

const CategoryBreakdownCard = ({ transactions }) => {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    acc[category] = (acc[category] || 0) + parseFloat(amount);
    return acc;
  }, {});

  const data = Object.keys(categoryTotals).map((category, index) => ({
    name: category,
    value: categoryTotals[category],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="p-8 bg-green-100 shadow rounded-lg text-center">
      <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
      {data.length > 0 ? (
        <PieChart width={280} height={320}>
          <Pie 
            data={data} 
            cx="50%" 
            cy="40%" 
            outerRadius={90} 
            innerRadius={50}
            fill="#8884d8" 
            dataKey="value"
            paddingAngle={5} // Adds spacing between slices
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" height={50} />
        </PieChart>
      ) : (
        <p className="text-sm text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default CategoryBreakdownCard;
