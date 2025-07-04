import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MetricCard from '@/components/molecules/MetricCard';
import ChartCard from '@/components/organisms/ChartCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { transactionService } from '@/services/api/transactionService';
import { leadService } from '@/services/api/leadService';
import { invoiceService } from '@/services/api/invoiceService';
import { taskService } from '@/services/api/taskService';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [leads, setLeads] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [transactionData, leadData, invoiceData, taskData] = await Promise.all([
        transactionService.getAll(),
        leadService.getAll(),
        invoiceService.getAll(),
        taskService.getAll()
      ]);

      setTransactions(transactionData);
      setLeads(leadData);
      setInvoices(invoiceData);
      setTasks(taskData);
    } catch (err) {
      setError('Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const calculateMetrics = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const cashFlow = totalIncome - totalExpenses;

    const activeLeads = leads.filter(l => ['new', 'contacted', 'qualified', 'proposal'].includes(l.status));
    const wonLeads = leads.filter(l => l.status === 'won');
    const conversionRate = leads.length > 0 ? ((wonLeads.length / leads.length) * 100).toFixed(1) : 0;

    const overdueInvoices = invoices.filter(i => i.status === 'overdue');
    const overdueAmount = overdueInvoices.reduce((sum, i) => sum + i.amount, 0);

    const pendingTasks = tasks.filter(t => t.status === 'todo');
    const highPriorityTasks = pendingTasks.filter(t => t.priority === 'high');

    return {
      cashFlow,
      totalIncome,
      totalExpenses,
      activeLeads: activeLeads.length,
      conversionRate,
      overdueAmount,
      overdueInvoices: overdueInvoices.length,
      pendingTasks: pendingTasks.length,
      highPriorityTasks: highPriorityTasks.length
    };
  };

  const getChartData = () => {
    const monthlyRevenue = {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [{
        name: 'Revenue',
        data: [15000, 18000, 22000, 19000, 25000, 28000]
      }]
    };

    const leadsByStatus = {
      labels: ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'],
      values: [
        leads.filter(l => l.status === 'new').length,
        leads.filter(l => l.status === 'contacted').length,
        leads.filter(l => l.status === 'qualified').length,
        leads.filter(l => l.status === 'proposal').length,
        leads.filter(l => l.status === 'won').length,
        leads.filter(l => l.status === 'lost').length
      ]
    };

    const expensesByCategory = {
      categories: ['Office', 'Marketing', 'Equipment', 'Services', 'Other'],
      series: [{
        name: 'Expenses',
        data: [1200, 2500, 3200, 1800, 900]
      }]
    };

    return { monthlyRevenue, leadsByStatus, expensesByCategory };
  };

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  const metrics = calculateMetrics();
  const chartData = getChartData();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
          <p className="text-gray-600">Overview of your business performance</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Cash Flow"
          value={`$${metrics.cashFlow.toLocaleString()}`}
          icon="TrendingUp"
          trend={metrics.cashFlow > 0 ? 'up' : 'down'}
          trendValue={`${metrics.cashFlow > 0 ? '+' : ''}${((metrics.cashFlow / metrics.totalIncome) * 100).toFixed(1)}%`}
          gradient="from-green-500 to-emerald-600"
        />
        <MetricCard
          title="Active Leads"
          value={metrics.activeLeads}
          icon="Users"
          trend="up"
          trendValue={`${metrics.conversionRate}% conversion`}
          gradient="from-blue-500 to-indigo-600"
        />
        <MetricCard
          title="Overdue Invoices"
          value={`$${metrics.overdueAmount.toLocaleString()}`}
          icon="AlertTriangle"
          trend="down"
          trendValue={`${metrics.overdueInvoices} invoices`}
          gradient="from-red-500 to-pink-600"
        />
        <MetricCard
          title="Pending Tasks"
          value={metrics.pendingTasks}
          icon="CheckSquare"
          trend="up"
          trendValue={`${metrics.highPriorityTasks} high priority`}
          gradient="from-purple-500 to-violet-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Monthly Revenue Trend"
          type="line"
          data={chartData.monthlyRevenue}
          height={300}
        />
        <ChartCard
          title="Lead Distribution"
          type="donut"
          data={chartData.leadsByStatus}
          height={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Expenses by Category"
          type="bar"
          data={chartData.expensesByCategory}
          height={300}
        />
        <div className="bg-white rounded-xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { type: 'payment', message: 'Payment received from Tech Solutions Inc', time: '2 hours ago' },
              { type: 'lead', message: 'New lead: Marketing Pro', time: '4 hours ago' },
              { type: 'invoice', message: 'Invoice sent to Finance Corp', time: '1 day ago' },
              { type: 'task', message: 'Task completed: Quarterly report', time: '2 days ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="bg-primary/10 rounded-full p-2 mr-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;