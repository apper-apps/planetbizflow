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
import { leadService } from '@/services/api/leadService';
import { format } from 'date-fns';

const Sales = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const loadLeads = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await leadService.getAll();
      setLeads(data);
    } catch (err) {
      setError('Failed to load leads');
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const calculateSalesMetrics = () => {
    const totalLeads = leads.length;
    const activeLeads = leads.filter(l => ['new', 'contacted', 'qualified', 'proposal'].includes(l.status)).length;
    const wonLeads = leads.filter(l => l.status === 'won').length;
    const lostLeads = leads.filter(l => l.status === 'lost').length;
    
    const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : 0;
    const totalValue = leads.reduce((sum, l) => sum + l.value, 0);
    const wonValue = leads.filter(l => l.status === 'won').reduce((sum, l) => sum + l.value, 0);
    const pipelineValue = leads.filter(l => ['qualified', 'proposal'].includes(l.status)).reduce((sum, l) => sum + l.value, 0);

    return {
      totalLeads,
      activeLeads,
      wonLeads,
      conversionRate,
      totalValue,
      wonValue,
      pipelineValue
    };
  };

  const getSalesChartData = () => {
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

    const salesPipeline = {
      categories: ['New', 'Contacted', 'Qualified', 'Proposal'],
      series: [{
        name: 'Pipeline Value',
        data: [
          leads.filter(l => l.status === 'new').reduce((sum, l) => sum + l.value, 0),
          leads.filter(l => l.status === 'contacted').reduce((sum, l) => sum + l.value, 0),
          leads.filter(l => l.status === 'qualified').reduce((sum, l) => sum + l.value, 0),
          leads.filter(l => l.status === 'proposal').reduce((sum, l) => sum + l.value, 0)
        ]
      }]
    };

    return { leadsByStatus, salesPipeline };
  };

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadLeads} />;

  const metrics = calculateSalesMetrics();
  const chartData = getSalesChartData();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
          <p className="text-gray-600">Manage your leads and track sales performance</p>
        </div>
        <Button
          variant="accent"
          icon="Plus"
          onClick={() => setShowAddModal(true)}
        >
          Add Lead
        </Button>
      </div>

      {/* Sales Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Leads"
          value={metrics.totalLeads}
          icon="Users"
          trend="up"
          trendValue={`${metrics.activeLeads} active`}
          gradient="from-blue-500 to-indigo-600"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          icon="Target"
          trend="up"
          trendValue={`${metrics.wonLeads} won`}
          gradient="from-green-500 to-emerald-600"
        />
        <MetricCard
          title="Pipeline Value"
          value={`$${metrics.pipelineValue.toLocaleString()}`}
          icon="TrendingUp"
          trend="up"
          trendValue="Qualified leads"
          gradient="from-purple-500 to-violet-600"
        />
        <MetricCard
          title="Won Revenue"
          value={`$${metrics.wonValue.toLocaleString()}`}
          icon="DollarSign"
          trend="up"
          trendValue="Closed deals"
          gradient="from-yellow-500 to-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Lead Distribution"
          type="donut"
          data={chartData.leadsByStatus}
          height={300}
        />
        <ChartCard
          title="Sales Pipeline Value"
          type="bar"
          data={chartData.salesPipeline}
          height={300}
        />
      </div>

      {/* Lead List */}
      <div className="bg-white rounded-xl shadow-card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Lead Pipeline</h3>
        </div>
        <div className="p-6">
          {leads.length === 0 ? (
            <Empty
              icon="Users"
              title="No leads yet"
              description="Start building your sales pipeline by adding your first lead."
              actionText="Add Lead"
              onAction={() => setShowAddModal(true)}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Value</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.Id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                          <p className="text-xs text-gray-500">{lead.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{lead.company}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        ${lead.value.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <StatusPill status={lead.status} type="lead" />
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {format(new Date(lead.lastContact), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <ApperIcon name="Phone" className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <ApperIcon name="Mail" className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <ApperIcon name="Edit" className="h-4 w-4" />
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

export default Sales;