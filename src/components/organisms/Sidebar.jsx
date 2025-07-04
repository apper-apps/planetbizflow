import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

const dashboardItems = [
    { path: '/', label: 'Dashboard', icon: 'BarChart3' },
    { path: '/onboarding', label: 'Onboarding', icon: 'UserPlus' },
    { path: '/kyc-center', label: 'KYC Center', icon: 'Shield' },
    { path: '/payment-portal', label: 'Payment Portal', icon: 'CreditCard' },
    { path: '/compliance-hub', label: 'Compliance Hub', icon: 'CheckCircle' },
    { path: '/startup-profile', label: 'Startup Profile', icon: 'Building' },
    { path: '/resources', label: 'Resources', icon: 'BookOpen' },
    { path: '/support', label: 'Support', icon: 'HelpCircle' }
  ];

  const websiteItems = [
    { path: '/services', label: 'Services', icon: 'Briefcase' },
    { path: '/projects', label: 'Projects', icon: 'FolderOpen' },
    { path: '/pricing', label: 'Pricing', icon: 'DollarSign' },
    { path: '/testimonials', label: 'Testimonials', icon: 'MessageCircle' },
    { path: '/faqs', label: 'FAQs', icon: 'HelpCircle' }
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      onClick={onClose}
      className={({ isActive }) => `
        flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }
      `}
    >
      <ApperIcon name={item.icon} className="h-5 w-5 mr-3" />
      {item.label}
    </NavLink>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-lg h-full">
        <div className="p-6">
<div className="flex items-center mb-8">
            <div className="bg-gradient-to-r from-startup-blue to-startup-green rounded-lg p-2">
              <ApperIcon name="Rocket" className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">Startup OS</h1>
              <p className="text-sm text-gray-600">Saksham Odisha</p>
            </div>
          </div>
          
<nav className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Dashboard</h3>
              <div className="space-y-2">
                {dashboardItems.map((item) => (
                  <NavItem key={item.path} item={item} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Website</h3>
              <div className="space-y-2">
                {websiteItems.map((item) => (
                  <NavItem key={item.path} item={item} />
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-64 bg-white shadow-lg h-full"
          >
            <div className="p-6">
<div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-startup-blue to-startup-green rounded-lg p-2">
                    <ApperIcon name="Rocket" className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <h1 className="text-xl font-bold text-gray-900">Startup OS</h1>
                    <p className="text-sm text-gray-600">Saksham Odisha</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ApperIcon name="X" className="h-6 w-6" />
                </button>
              </div>
              
<nav className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Dashboard</h3>
                  <div className="space-y-2">
                    {dashboardItems.map((item) => (
                      <NavItem key={item.path} item={item} />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Website</h3>
                  <div className="space-y-2">
                    {websiteItems.map((item) => (
                      <NavItem key={item.path} item={item} />
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;