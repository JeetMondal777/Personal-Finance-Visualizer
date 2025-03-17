const RecentTransactionsCard = ({ transactions }) => {
    const recentTransactions = [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5); // Get latest 5 transactions
  
    return (
      <div className="p-4 bg-yellow-100 shadow rounded-lg">
        <h3 className="text-lg font-semibold text-center mb-2">Recent Transactions</h3>
        <ul className="space-y-2">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <li
                key={transaction._id}
                className="p-2 bg-white rounded-md shadow-md flex justify-between"
              >
                <div>
                  <p className="text-sm font-medium">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                  <p className="text-xs font-semibold text-gray-700">{transaction.category}</p>
                </div>
                <p className="text-sm font-bold text-red-600">₹{transaction.amount}</p>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center">No transactions found</p>
          )}
        </ul>
      </div>
    );
  };
  
  export default RecentTransactionsCard;
  