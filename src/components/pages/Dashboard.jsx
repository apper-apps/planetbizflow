import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MetricCard from '@/components/molecules/MetricCard';
import ChartCard from '@/components/organisms/ChartCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { startupService } from '@/services/api/startupService';
import { kycService } from '@/services/api/kycService';
import { paymentService } from '@/services/api/paymentService';
import { complianceService } from '@/services/api/complianceService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [startups, setStartups] = useState([]);
  const [kycSubmissions, setKycSubmissions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [compliance, setCompliance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [startupData, kycData, paymentData, complianceData] = await Promise.all([
        startupService.getAll(),
        kycService.getAll(),
        paymentService.getAll(),
        complianceService.getAll()
      ]);

      setStartups(startupData);
      setKycSubmissions(kycData);
      setPayments(paymentData);
      setCompliance(complianceData);
    } catch (err) {
      setError('Failed to load startup ecosystem data');
      toast.error('Failed to load startup ecosystem data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

const calculateMetrics = () => {
    const totalRegistrations = startups.length;
    const activeStartups = startups.filter(s => s.status === 'active').length;
    const completedOnboarding = startups.filter(s => s.onboardingComplete).length;
    const onboardingRate = totalRegistrations > 0 ? ((completedOnboarding / totalRegistrations) * 100).toFixed(1) : 0;

    const completedKYC = kycSubmissions.filter(k => k.status === 'approved').length;
    const pendingKYC = kycSubmissions.filter(k => k.status === 'pending').length;
    const kycApprovalRate = kycSubmissions.length > 0 ? ((completedKYC / kycSubmissions.length) * 100).toFixed(1) : 0;

    const completedPayments = payments.filter(p => p.status === 'completed');
    const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    const pendingPayments = payments.filter(p => p.status === 'pending').length;

    const complianceIssues = compliance.filter(c => c.status === 'non-compliant').length;
    const compliantStartups = compliance.filter(c => c.status === 'compliant').length;

    return {
      totalRegistrations,
      activeStartups,
      onboardingRate,
      completedKYC,
      pendingKYC,
      kycApprovalRate,
      totalRevenue,
      pendingPayments,
      complianceIssues,
      compliantStartups
    };
  };

const getChartData = () => {
    const monthlyRegistrations = {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [{
        name: 'Registrations',
        data: [45, 68, 82, 76, 95, 108]
      }]
    };

    const startupsByType = {
      labels: ['Manufacturing', 'FMCG Distribution', 'Engineering Goods', 'Digital Services', 'Other'],
      values: [
        startups.filter(s => s.type === 'manufacturing').length,
        startups.filter(s => s.type === 'fmcg_distribution').length,
        startups.filter(s => s.type === 'engineering_goods').length,
        startups.filter(s => s.type === 'digital_services').length,
        startups.filter(s => !['manufacturing', 'fmcg_distribution', 'engineering_goods', 'digital_services'].includes(s.type)).length
      ]
    };

    const kycStatus = {
      labels: ['Approved', 'Pending', 'Rejected', 'Not Submitted'],
      values: [
        kycSubmissions.filter(k => k.status === 'approved').length,
        kycSubmissions.filter(k => k.status === 'pending').length,
        kycSubmissions.filter(k => k.status === 'rejected').length,
        startups.length - kycSubmissions.length
      ]
    };

    return { monthlyRegistrations, startupsByType, kycStatus };
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
          <h1 className="text-2xl font-bold text-gray-900">Startup OS Odisha</h1>
          <p className="text-gray-600">Empowering Odisha's startup ecosystem</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => navigate('/onboarding')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            New Startup
          </Button>
          <Button
            onClick={() => navigate('/kyc-center')}
            variant="outline"
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <ApperIcon name="Shield" className="h-4 w-4 mr-2" />
            KYC Center
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<MetricCard
          title="Total Registrations"
          value={metrics.totalRegistrations}
          icon="Building"
          trend="up"
          trendValue={`${metrics.onboardingRate}% completed onboarding`}
          gradient="from-blue-500 to-indigo-600"
        />
        <MetricCard
          title="Active Startups"
          value={metrics.activeStartups}
          icon="TrendingUp"
          trend="up"
          trendValue="Growing ecosystem"
          gradient="from-green-500 to-emerald-600"
        />
        <MetricCard
          title="KYC Approval Rate"
          value={`${metrics.kycApprovalRate}%`}
          icon="Shield"
          trend="up"
          trendValue={`${metrics.pendingKYC} pending review`}
          gradient="from-orange-500 to-red-500"
        />
        <MetricCard
          title="Revenue Generated"
          value={`₹${metrics.totalRevenue.toLocaleString()}`}
          icon="CreditCard"
          trend="up"
          trendValue={`${metrics.pendingPayments} pending payments`}
          gradient="from-purple-500 to-violet-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<ChartCard
          title="Monthly Startup Registrations"
          type="line"
          data={chartData.monthlyRegistrations}
          height={300}
        />
        <ChartCard
          title="Startup Categories"
          type="donut"
          data={chartData.startupsByType}
          height={300}
        />
      </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="KYC Status Distribution"
          type="bar"
          data={chartData.kycStatus}
          height={300}
        />
        <div className="bg-white rounded-xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Ecosystem Activity</h3>
          <div className="space-y-4">
            {[
              { type: 'registration', message: 'New startup registered: GreenTech Solutions', time: '1 hour ago' },
              { type: 'kyc', message: 'KYC approved for Digital Marketplace', time: '3 hours ago' },
              { type: 'payment', message: 'Onboarding fee paid by EcoFarm Ventures', time: '5 hours ago' },
              { type: 'compliance', message: 'Compliance check completed for TechCorp', time: '1 day ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="bg-primary/10 rounded-full p-2 mr-3">
                  <ApperIcon 
                    name={activity.type === 'registration' ? 'Building' : 
                          activity.type === 'kyc' ? 'Shield' :
                          activity.type === 'payment' ? 'CreditCard' : 'CheckCircle'} 
                    className="h-4 w-4 text-primary" 
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button
              onClick={() => navigate('/support')}
              variant="outline"
              className="w-full"
            >
              View All Activities
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;