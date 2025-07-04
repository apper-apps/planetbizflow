import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MetricCard from '@/components/molecules/MetricCard';
import ChartCard from '@/components/organisms/ChartCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import StatusPill from '@/components/molecules/StatusPill';
import ApperIcon from '@/components/ApperIcon';
import { transactionService } from '@/services/api/transactionService';
import { format } from 'date-fns';

const Finance = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      setError('Failed to load transactions');
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const calculateFinancialMetrics = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const pendingIncome = transactions
      .filter(t => t.type === 'income' && t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0);

    const overdueMoney = transactions
      .filter(t => t.status === 'overdue')
      .reduce((sum, t) => sum + t.amount, 0);

    const netProfit = totalIncome - totalExpenses;
    const profitMargin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : 0;

    return {
      totalIncome,
      totalExpenses,
      netProfit,
      profitMargin,
      pendingIncome,
      overdueMoney
    };
  };

  const getFinancialChartData = () => {
    const monthlyData = {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [
        {
          name: 'Income',
          data: [15000, 18000, 22000, 19000, 25000, 28000]
        },
        {
          name: 'Expenses',
          data: [8000, 9500, 11000, 10200, 12000, 13500]
        }
      ]
    };

    const expenseCategories = {
      labels: ['Office Supplies', 'Marketing', 'Equipment', 'Services', 'Other'],
      values: [1200, 2500, 3200, 1800, 900]
    };

    return { monthlyData, expenseCategories };
  };

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadTransactions} />;

  const metrics = calculateFinancialMetrics();
  const chartData = getFinancialChartData();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
          <p className="text-gray-600">Track your business finances and cash flow</p>
        </div>
        <Button
          variant="accent"
          icon="Plus"
          onClick={() => setShowAddModal(true)}
        >
          Add Transaction
        </Button>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Income"
          value={`$${metrics.totalIncome.toLocaleString()}`}
          icon="TrendingUp"
          trend="up"
          trendValue={`${metrics.profitMargin}% profit margin`}
          gradient="from-green-500 to-emerald-600"
        />
        <MetricCard
          title="Total Expenses"
          value={`$${metrics.totalExpenses.toLocaleString()}`}
          icon="TrendingDown"
          trend="down"
          trendValue="Monthly expenses"
          gradient="from-red-500 to-pink-600"
        />
        <MetricCard
          title="Net Profit"
          value={`$${metrics.netProfit.toLocaleString()}`}
          icon="DollarSign"
          trend={metrics.netProfit > 0 ? 'up' : 'down'}
          trendValue={`${metrics.profitMargin}% margin`}
          gradient="from-blue-500 to-indigo-600"
        />
        <MetricCard
          title="Pending Income"
          value={`$${metrics.pendingIncome.toLocaleString()}`}
          icon="Clock"
          trend="up"
          trendValue="Awaiting payment"
          gradient="from-yellow-500 to-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Income vs Expenses"
          type="line"
          data={chartData.monthlyData}
          height={300}
        />
        <ChartCard
          title="Expense Categories"
          type="donut"
          data={chartData.expenseCategories}
          height={300}
        />
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        <div className="p-6">
          {transactions.length === 0 ? (
            <Empty
              icon="DollarSign"
              title="No transactions yet"
              description="Start tracking your business finances by adding your first transaction."
              actionText="Add Transaction"
              onAction={() => setShowAddModal(true)}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.Id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {format(new Date(transaction.date), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.vendor}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{transaction.category}</td>
                      <td className="py-3 px-4">
                        <span className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <StatusPill status={transaction.status} type="transaction" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <ApperIcon name="Edit" className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600">
                            <ApperIcon name="Trash2" className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Finance;