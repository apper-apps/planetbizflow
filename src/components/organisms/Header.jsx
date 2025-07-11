import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';

const Header = ({ onMenuClick }) => {
const [notifications] = useState([
    { id: 1, type: 'kyc', message: 'KYC submitted by TechCorp Startup', time: '2m ago' },
    { id: 2, type: 'payment', message: 'Onboarding fee paid by EcoVentures', time: '1h ago' },
    { id: 3, type: 'compliance', message: 'Compliance check required for GreenTech', time: '3h ago' },
    { id: 4, type: 'registration', message: 'New startup registration received', time: '5h ago' }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

const getNotificationIcon = (type) => {
    switch (type) {
      case 'kyc': return 'Shield';
      case 'payment': return 'CreditCard';
      case 'compliance': return 'CheckCircle';
      case 'registration': return 'Building';
      default: return 'Bell';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 mr-4"
          >
            <ApperIcon name="Menu" className="h-6 w-6" />
          </button>
<div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <div className="relative">
                <button
                  onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  Services
                  <ApperIcon name="ChevronDown" className="h-4 w-4 ml-1" />
                </button>
                {showServicesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <Link to="/services" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg">
                      All Services
                    </Link>
                    <Link to="/onboarding" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                      Startup Onboarding
                    </Link>
                    <Link to="/kyc-center" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                      KYC Services
                    </Link>
                    <Link to="/compliance-hub" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg">
                      Compliance Management
                    </Link>
                  </motion.div>
                )}
</div>
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  Startup Types
                  <ApperIcon name="ChevronDown" className="h-4 w-4 ml-1" />
                </button>
                {showServicesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <Link to="/fmcg-manufacturing" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg">
                      FMCG Manufacturing
                    </Link>
                    <Link to="/micro-distributor" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                      Micro Distributor
                    </Link>
                    <Link to="/digital-entrepreneurs" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg">
                      Digital Entrepreneurs
                    </Link>
                  </motion.div>
                )}
              </div>
              <Link to="/projects" className="text-gray-700 hover:text-primary transition-colors">
                Projects
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link to="/testimonials" className="text-gray-700 hover:text-primary transition-colors">
                Testimonials
              </Link>
              <Link to="/faqs" className="text-gray-700 hover:text-primary transition-colors">
                FAQs
              </Link>
            </nav>
            
            <div className="hidden md:block">
              <SearchBar 
                onSearch={(term) => console.log('Search:', term)}
                placeholder="Search across all modules..."
                className="w-80"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 relative"
            >
              <ApperIcon name="Bell" className="h-6 w-6 text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              >
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="bg-primary/10 rounded-full p-2 mr-3">
                          <ApperIcon name={getNotificationIcon(notification.type)} className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <button className="w-full text-primary text-sm font-medium hover:text-primary/80">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex items-center">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-2">
              <ApperIcon name="User" className="h-6 w-6 text-white" />
            </div>
<div className="ml-3 hidden md:block">
              <p className="text-sm font-medium text-gray-900">Startup OS Admin</p>
              <p className="text-xs text-gray-600">Saksham Odisha</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;