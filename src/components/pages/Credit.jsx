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
import { invoiceService } from '@/services/api/invoiceService';
import { format, differenceInDays } from 'date-fns';

const Credit = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await invoiceService.getAll();
      setInvoices(data);
    } catch (err) {
      setError('Failed to load invoices');
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const calculateCreditMetrics = () => {
    const totalInvoices = invoices.length;
    const totalReceivables = invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + i.amount, 0);
    const overdueInvoices = invoices.filter(i => i.status === 'overdue');
    const overdueAmount = overdueInvoices.reduce((sum, i) => sum + i.amount, 0);
    const paidInvoices = invoices.filter(i => i.status === 'paid');
    const paidAmount = paidInvoices.reduce((sum, i) => sum + i.amount, 0);
    const collectionRate = totalInvoices > 0 ? ((paidInvoices.length / totalInvoices) * 100).toFixed(1) : 0;

    return {
      totalInvoices,
      totalReceivables,
      overdueAmount,
      overdueInvoices: overdueInvoices.length,
      paidAmount,
      collectionRate
    };
  };

  const getAgingData = () => {
    const today = new Date();
    const aging = {
      current: 0,
      days30: 0,
      days60: 0,
      days90: 0
    };

    invoices.filter(i => i.status !== 'paid').forEach(invoice => {
      const dueDate = new Date(invoice.dueDate);
      const daysPastDue = differenceInDays(today, dueDate);
      
      if (daysPastDue <= 0) {
        aging.current += invoice.amount;
      } else if (daysPastDue <= 30) {
        aging.days30 += invoice.amount;
      } else if (daysPastDue <= 60) {
        aging.days60 += invoice.amount;
      } else {
        aging.days90 += invoice.amount;
      }
    });

    return {
      categories: ['Current', '1-30 Days', '31-60 Days', '60+ Days'],
      series: [{
        name: 'Amount',
        data: [aging.current, aging.days30, aging.days60, aging.days90]
      }]
    };
  };

  const getInvoiceStatusData = () => {
    return {
      labels: ['Draft', 'Sent', 'Paid', 'Overdue'],
      values: [
        invoices.filter(i => i.status === 'draft').length,
        invoices.filter(i => i.status === 'sent').length,
        invoices.filter(i => i.status === 'paid').length,
        invoices.filter(i => i.status === 'overdue').length
      ]
    };
  };

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadInvoices} />;

  const metrics = calculateCreditMetrics();
  const agingData = getAgingData();
  const statusData = getInvoiceStatusData();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Credit Management</h1>
          <p className="text-gray-600">Track receivables and manage customer credit</p>
        </div>
        <Button
          variant="accent"
          icon="Plus"
          onClick={() => setShowAddModal(true)}
        >
          Create Invoice
        </Button>
      </div>

      {/* Credit Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Receivables"
          value={`$${metrics.totalReceivables.toLocaleString()}`}
          icon="CreditCard"
          trend="up"
          trendValue={`${metrics.totalInvoices} invoices`}
          gradient="from-blue-500 to-indigo-600"
        />
        <MetricCard
          title="Overdue Amount"
          value={`$${metrics.overdueAmount.toLocaleString()}`}
          icon="AlertTriangle"
          trend="down"
          trendValue={`${metrics.overdueInvoices} invoices`}
          gradient="from-red-500 to-pink-600"
        />
        <MetricCard
          title="Collected Amount"
          value={`$${metrics.paidAmount.toLocaleString()}`}
          icon="CheckCircle"
          trend="up"
          trendValue={`${metrics.collectionRate}% rate`}
          gradient="from-green-500 to-emerald-600"
        />
        <MetricCard
          title="Collection Rate"
          value={`${metrics.collectionRate}%`}
          icon="TrendingUp"
          trend="up"
          trendValue="Success rate"
          gradient="from-purple-500 to-violet-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Accounts Receivable Aging"
          type="bar"
          data={agingData}
          height={300}
        />
        <ChartCard
          title="Invoice Status Distribution"
          type="donut"
          data={statusData}
          height={300}
        />
      </div>

      {/* Invoice List */}
      <div className="bg-white rounded-xl shadow-card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Invoice Management</h3>
        </div>
        <div className="p-6">
          {invoices.length === 0 ? (
            <Empty
              icon="CreditCard"
              title="No invoices yet"
              description="Start managing your receivables by creating your first invoice."
              actionText="Create Invoice"
              onAction={() => setShowAddModal(true)}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Days Past Due</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => {
                    const daysPastDue = differenceInDays(new Date(), new Date(invoice.dueDate));
                    const isOverdue = daysPastDue > 0 && invoice.status !== 'paid';
                    
                    return (
                      <tr key={invoice.Id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          INV-{invoice.Id.toString().padStart(3, '0')}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">{invoice.customer}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          ${invoice.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {format(new Date(invoice.dueDate), 'MMM dd, yyyy')}
                        </td>
                        <td className="py-3 px-4">
                          <StatusPill status={invoice.status} type="invoice" />
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                            {daysPastDue > 0 ? `${daysPastDue} days` : 'Current'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-400 hover:text-gray-600">
                              <ApperIcon name="Eye" className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <ApperIcon name="Send" className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <ApperIcon name="Edit" className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Credit;