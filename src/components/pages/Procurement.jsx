import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MetricCard from '@/components/molecules/MetricCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { vendorService } from '@/services/api/vendorService';
import { format } from 'date-fns';

const Procurement = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const loadVendors = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await vendorService.getAll();
      setVendors(data);
    } catch (err) {
      setError('Failed to load vendors');
      toast.error('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const calculateProcurementMetrics = () => {
    const totalVendors = vendors.length;
    const totalSpent = vendors.reduce((sum, v) => sum + v.totalSpent, 0);
    const averageRating = vendors.length > 0 ? 
      (vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1) : 0;
    const topVendor = vendors.reduce((prev, current) => 
      (prev.totalSpent > current.totalSpent) ? prev : current, vendors[0] || {});

    return {
      totalVendors,
      totalSpent,
      averageRating,
      topVendor: topVendor.name || 'N/A'
    };
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<ApperIcon key={i} name="Star" className="h-4 w-4 text-yellow-400 fill-current" />);
    }
    
    if (hasHalfStar) {
      stars.push(<ApperIcon key="half" name="Star" className="h-4 w-4 text-yellow-400 fill-current opacity-50" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<ApperIcon key={`empty-${i}`} name="Star" className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadVendors} />;

  const metrics = calculateProcurementMetrics();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Procurement Management</h1>
          <p className="text-gray-600">Manage vendors and track procurement activities</p>
        </div>
        <Button
          variant="accent"
          icon="Plus"
          onClick={() => setShowAddModal(true)}
        >
          Add Vendor
        </Button>
      </div>

      {/* Procurement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Vendors"
          value={metrics.totalVendors}
          icon="Package"
          trend="up"
          trendValue="Active partnerships"
          gradient="from-blue-500 to-indigo-600"
        />
        <MetricCard
          title="Total Spent"
          value={`$${metrics.totalSpent.toLocaleString()}`}
          icon="DollarSign"
          trend="up"
          trendValue="All-time spending"
          gradient="from-green-500 to-emerald-600"
        />
        <MetricCard
          title="Average Rating"
          value={metrics.averageRating}
          icon="Star"
          trend="up"
          trendValue="Vendor satisfaction"
          gradient="from-yellow-500 to-orange-600"
        />
        <MetricCard
          title="Top Vendor"
          value={metrics.topVendor}
          icon="Award"
          trend="up"
          trendValue="Highest spending"
          gradient="from-purple-500 to-violet-600"
        />
      </div>

      {/* Vendor Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Technology', 'Office Supplies', 'Marketing', 'Financial', 'Legal', 'Shipping'].map((category) => {
          const categoryVendors = vendors.filter(v => v.category === category);
          const categorySpent = categoryVendors.reduce((sum, v) => sum + v.totalSpent, 0);
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                <div className="bg-primary/10 rounded-full p-2">
                  <ApperIcon name="Package" className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Vendors</span>
                  <span className="text-sm font-medium text-gray-900">{categoryVendors.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Spent</span>
                  <span className="text-sm font-medium text-gray-900">${categorySpent.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Vendor List */}
      <div className="bg-white rounded-xl shadow-card">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Vendor Directory</h3>
        </div>
        <div className="p-6">
          {vendors.length === 0 ? (
            <Empty
              icon="Package"
              title="No vendors yet"
              description="Start building your vendor network by adding your first vendor."
              actionText="Add Vendor"
              onAction={() => setShowAddModal(true)}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Vendor</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Total Spent</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Order</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr key={vendor.Id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                          <p className="text-xs text-gray-500">{vendor.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{vendor.category}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm text-gray-900">{vendor.contact}</p>
                          <p className="text-xs text-gray-500">{vendor.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          {getRatingStars(vendor.rating)}
                          <span className="text-sm text-gray-600 ml-2">{vendor.rating}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        ${vendor.totalSpent.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {format(new Date(vendor.lastOrder), 'MMM dd, yyyy')}
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

export default Procurement;