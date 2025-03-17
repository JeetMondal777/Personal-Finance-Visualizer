const TotalExpensesCard = ({ transactions }) => {
    const totalExpenses = transactions.reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount),
      0
    );
  
    return (
      <div className="p-4 bg-blue-100 shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Expenses</h3>
        <p className="text-2xl font-bold text-blue-600">₹{totalExpenses.toFixed(2)}</p>
      </div>
    );
  };
  
  export default TotalExpensesCard;
  