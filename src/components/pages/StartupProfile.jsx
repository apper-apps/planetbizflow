import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import Button from '@/components/atoms/Button';
import { startupService } from '@/services/api/startupService';

const StartupProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      // Mock profile data - in real app, this would come from authenticated user
      const mockProfile = {
        Id: 1,
        founderName: 'Rajesh Kumar',
        founderEmail: 'rajesh@example.com',
        founderPhone: '+91 9876543210',
        businessName: 'EcoTech Solutions',
        businessType: 'manufacturing',
        businessIdea: 'Sustainable packaging solutions using biodegradable materials',
        businessStage: 'prototype',
        businessLocation: 'Bhubaneswar, Khordha, Odisha',
        status: 'active',
        onboardingComplete: true,
        registrationDate: '2024-01-15T10:30:00Z',
        kycStatus: 'approved',
        paymentStatus: 'completed',
        complianceScore: 85
      };
      
      setProfile(mockProfile);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (!profile) return <div>Profile not found</div>;

  const getBusinessTypeLabel = (type) => {
    const types = {
      manufacturing: 'Greenfield Manufacturing',
      fmcg_distribution: 'FMCG Distribution',
      engineering_goods: 'Engineering Goods Distribution',
      digital_services: 'Digital Entrepreneur'
    };
    return types[type] || type;
  };

  const getStageLabel = (stage) => {
    const stages = {
      idea: 'Idea Stage',
      mvp: 'MVP Development',
      prototype: 'Prototype Ready',
      pilot: 'Pilot Testing',
      launch: 'Ready to Launch'
    };
    return stages[stage] || stage;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-card p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-startup-blue to-startup-green rounded-full p-4 mr-4">
              <ApperIcon name="Building" className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.businessName}</h1>
              <p className="text-gray-600">{getBusinessTypeLabel(profile.businessType)}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <ApperIcon name="Shield" className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">KYC Status</p>
            <p className="font-semibold text-green-600">{profile.kycStatus}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <ApperIcon name="CreditCard" className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Payment</p>
            <p className="font-semibold text-blue-600">{profile.paymentStatus}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <ApperIcon name="CheckCircle" className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Compliance</p>
            <p className="font-semibold text-purple-600">{profile.complianceScore}%</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <ApperIcon name="Calendar" className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Registered</p>
            <p className="font-semibold text-orange-600">
              {new Date(profile.registrationDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button
            className="bg-gradient-to-r from-blue-500 to-indigo-600"
            onClick={() => toast.info('Profile editing will be available soon')}
          >
            <ApperIcon name="Edit" className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button
            variant="outline"
            className="border-green-300 text-green-600 hover:bg-green-50"
            onClick={() => toast.info('Business plan upload will be available soon')}
          >
            <ApperIcon name="Upload" className="h-4 w-4 mr-2" />
            Upload Business Plan
          </Button>
          <Button
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50"
            onClick={() => toast.info('Certificate download will be available soon')}
          >
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Download Certificate
          </Button>
        </div>
      </div>

      {/* Business Details */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Business Information</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Business Name</label>
                <p className="font-medium">{profile.businessName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Business Type</label>
                <p className="font-medium">{getBusinessTypeLabel(profile.businessType)}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Current Stage</label>
                <p className="font-medium">{getStageLabel(profile.businessStage)}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Location</label>
                <p className="font-medium">{profile.businessLocation}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Founder Information</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Founder Name</label>
                <p className="font-medium">{profile.founderName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-medium">{profile.founderEmail}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <p className="font-medium">{profile.founderPhone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-2">Business Idea</h3>
          <p className="text-gray-700">{profile.businessIdea}</p>
        </div>
      </div>

      {/* Services & Benefits */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <ApperIcon name="Users" className="h-6 w-6 text-blue-500 mb-2" />
            <h3 className="font-medium text-gray-900">Mentorship Program</h3>
            <p className="text-sm text-gray-600">Connect with industry experts</p>
            <Button variant="outline" size="sm" className="mt-2">
              Join Program
            </Button>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <ApperIcon name="DollarSign" className="h-6 w-6 text-green-500 mb-2" />
            <h3 className="font-medium text-gray-900">Funding Support</h3>
            <p className="text-sm text-gray-600">Access to investors and grants</p>
            <Button variant="outline" size="sm" className="mt-2">
              Explore Options
            </Button>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <ApperIcon name="BookOpen" className="h-6 w-6 text-purple-500 mb-2" />
            <h3 className="font-medium text-gray-900">Training & Workshops</h3>
            <p className="text-sm text-gray-600">Skill development programs</p>
            <Button variant="outline" size="sm" className="mt-2">
              Browse Courses
            </Button>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <ApperIcon name="Network" className="h-6 w-6 text-orange-500 mb-2" />
            <h3 className="font-medium text-gray-900">Networking Events</h3>
            <p className="text-sm text-gray-600">Connect with fellow entrepreneurs</p>
            <Button variant="outline" size="sm" className="mt-2">
              View Events
            </Button>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <ApperIcon name="Briefcase" className="h-6 w-6 text-red-500 mb-2" />
            <h3 className="font-medium text-gray-900">Incubation Support</h3>
            <p className="text-sm text-gray-600">Access to incubation centers</p>
            <Button variant="outline" size="sm" className="mt-2">
              Apply Now
            </Button>
          </div>
          <div className="p-4 bg-teal-50 rounded-lg">
            <ApperIcon name="Globe" className="h-6 w-6 text-teal-500 mb-2" />
            <h3 className="font-medium text-gray-900">Market Access</h3>
            <p className="text-sm text-gray-600">Connect with potential customers</p>
            <Button variant="outline" size="sm" className="mt-2">
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            {
              action: 'Profile approved and activated',
              date: '2 days ago',
              icon: 'CheckCircle',
              color: 'text-green-500'
            },
            {
              action: 'Payment completed successfully',
              date: '3 days ago',
              icon: 'CreditCard',
              color: 'text-blue-500'
            },
            {
              action: 'KYC documents verified',
              date: '1 week ago',
              icon: 'Shield',
              color: 'text-purple-500'
            },
            {
              action: 'Registration submitted',
              date: '2 weeks ago',
              icon: 'Building',
              color: 'text-orange-500'
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <ApperIcon name={activity.icon} className={`h-5 w-5 ${activity.color} mr-3`} />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StartupProfile;