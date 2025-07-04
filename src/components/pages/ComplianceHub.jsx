import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import Button from '@/components/atoms/Button';
import { complianceService } from '@/services/api/complianceService';

const ComplianceHub = () => {
  const [compliance, setCompliance] = useState([]);
  const [loading, setLoading] = useState(true);

  const complianceCategories = [
    {
      id: 'data-security',
      title: 'Data Security & Privacy',
      icon: 'Shield',
      requirements: [
        'Data encryption at rest and in transit',
        'Access controls and user authentication',
        'Regular security audits and vulnerability assessments',
        'Privacy policy and data handling procedures'
      ],
      laws: ['Indian IT Act 2000', 'GDPR', 'Data Protection Act']
    },
    {
      id: 'business-compliance',
      title: 'Business Compliance',
      icon: 'Building',
      requirements: [
        'Business registration and licensing',
        'Tax compliance and GST registration',
        'Employment law compliance',
        'Industry-specific regulations'
      ],
      laws: ['Companies Act 2013', 'GST Act', 'Labour Laws']
    },
    {
      id: 'startup-policy',
      title: 'Odisha Startup Policy',
      icon: 'FileText',
      requirements: [
        'Startup recognition certificate',
        'Incubation center registration',
        'Funding and grant compliance',
        'Intellectual property protection'
      ],
      laws: ['Odisha Startup Policy 2016', 'Startup India Initiative']
    },
    {
      id: 'financial-compliance',
      title: 'Financial Compliance',
      icon: 'CreditCard',
      requirements: [
        'Financial reporting and auditing',
        'Foreign exchange compliance (FEMA)',
        'Investment and funding regulations',
        'Payment gateway compliance'
      ],
      laws: ['FEMA', 'RBI Guidelines', 'SEBI Regulations']
    }
  ];

  useEffect(() => {
    loadCompliance();
  }, []);

  const loadCompliance = async () => {
    try {
      const data = await complianceService.getAll();
      setCompliance(data);
    } catch (error) {
      toast.error('Failed to load compliance data');
    } finally {
      setLoading(false);
    }
  };

  const getComplianceStatus = (categoryId) => {
    const categoryCompliance = compliance.find(c => c.category === categoryId);
    return categoryCompliance ? categoryCompliance.status : 'not-started';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return 'CheckCircle';
      case 'non-compliant': return 'XCircle';
      case 'in-progress': return 'Clock';
      default: return 'AlertCircle';
    }
  };

  if (loading) return <Loading />;

  const overallCompliance = compliance.length > 0 ? 
    (compliance.filter(c => c.status === 'compliant').length / compliance.length * 100).toFixed(1) : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Compliance Overview */}
      <div className="bg-white rounded-xl shadow-card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compliance Hub</h1>
            <p className="text-gray-600">Monitor and maintain regulatory compliance</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Overall Compliance</p>
            <p className="text-3xl font-bold text-primary">{overallCompliance}%</p>
          </div>
        </div>

        {/* Compliance Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Compliance Progress</span>
            <span className="text-sm text-gray-600">{overallCompliance}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallCompliance}%` }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            className="bg-gradient-to-r from-blue-500 to-indigo-600"
            onClick={() => toast.info('Compliance assessment will be available soon')}
          >
            <ApperIcon name="Search" className="h-4 w-4 mr-2" />
            Run Compliance Check
          </Button>
          <Button
            variant="outline"
            className="border-green-300 text-green-600 hover:bg-green-50"
            onClick={() => toast.info('Compliance report generation will be available soon')}
          >
            <ApperIcon name="FileText" className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50"
            onClick={() => toast.info('Legal consultation booking will be available soon')}
          >
            <ApperIcon name="Users" className="h-4 w-4 mr-2" />
            Book Legal Consultation
          </Button>
        </div>
      </div>

      {/* Compliance Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {complianceCategories.map((category) => {
          const status = getComplianceStatus(category.id);
          
          return (
            <div key={category.id} className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-3 mr-4">
                    <ApperIcon name={category.icon} className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.requirements.length} requirements</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ApperIcon name={getStatusIcon(status)} className={`h-5 w-5 mr-2 ${
                    status === 'compliant' ? 'text-green-500' :
                    status === 'non-compliant' ? 'text-red-500' :
                    status === 'in-progress' ? 'text-yellow-500' :
                    'text-gray-500'
                  }`} />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
                    {status === 'not-started' ? 'Not Started' :
                     status === 'in-progress' ? 'In Progress' :
                     status === 'compliant' ? 'Compliant' :
                     'Non-Compliant'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <h4 className="font-medium text-gray-900">Key Requirements:</h4>
                <ul className="space-y-2">
                  {category.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <ApperIcon name="Check" className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Applicable Laws:</h4>
                <div className="flex flex-wrap gap-2">
                  {category.laws.map((law, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {law}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => toast.info(`${category.title} details will be available soon`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Compliance Activities */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Compliance Activities</h2>
        <div className="space-y-4">
          {[
            {
              activity: 'Data security audit completed',
              date: '2 days ago',
              status: 'completed',
              icon: 'Shield'
            },
            {
              activity: 'GST registration updated',
              date: '1 week ago',
              status: 'completed',
              icon: 'FileText'
            },
            {
              activity: 'Privacy policy review due',
              date: 'Due in 5 days',
              status: 'pending',
              icon: 'Clock'
            },
            {
              activity: 'Startup recognition certificate renewal',
              date: 'Due in 30 days',
              status: 'upcoming',
              icon: 'Calendar'
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-primary/10 rounded-full p-2 mr-3">
                  <ApperIcon name={activity.icon} className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.activity}</p>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Resources */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Legal Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Startup Legal Guide</h3>
            <p className="text-sm text-gray-600 mb-3">
              Comprehensive guide to legal requirements for startups in Odisha
            </p>
            <Button variant="outline" size="sm">
              <ApperIcon name="Download" className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Compliance Checklist</h3>
            <p className="text-sm text-gray-600 mb-3">
              Step-by-step checklist for maintaining startup compliance
            </p>
            <Button variant="outline" size="sm">
              <ApperIcon name="CheckSquare" className="h-4 w-4 mr-2" />
              View Checklist
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComplianceHub;