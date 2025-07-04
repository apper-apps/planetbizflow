import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatusPill = ({ status, type = 'default' }) => {
  const getStatusConfig = () => {
    switch (type) {
      case 'lead':
        const leadConfigs = {
          new: { color: 'bg-blue-100 text-blue-800', icon: 'UserPlus' },
          contacted: { color: 'bg-yellow-100 text-yellow-800', icon: 'Phone' },
          qualified: { color: 'bg-purple-100 text-purple-800', icon: 'CheckCircle' },
          proposal: { color: 'bg-orange-100 text-orange-800', icon: 'FileText' },
          won: { color: 'bg-green-100 text-green-800', icon: 'Trophy' },
          lost: { color: 'bg-red-100 text-red-800', icon: 'X' }
        };
        return leadConfigs[status] || leadConfigs.new;
      
      case 'transaction':
        const transactionConfigs = {
          pending: { color: 'bg-yellow-100 text-yellow-800', icon: 'Clock' },
          completed: { color: 'bg-green-100 text-green-800', icon: 'CheckCircle' },
          overdue: { color: 'bg-red-100 text-red-800', icon: 'AlertCircle' }
        };
        return transactionConfigs[status] || transactionConfigs.pending;
      
      case 'invoice':
        const invoiceConfigs = {
          draft: { color: 'bg-gray-100 text-gray-800', icon: 'FileText' },
          sent: { color: 'bg-blue-100 text-blue-800', icon: 'Send' },
          paid: { color: 'bg-green-100 text-green-800', icon: 'CheckCircle' },
          overdue: { color: 'bg-red-100 text-red-800', icon: 'AlertCircle' }
        };
        return invoiceConfigs[status] || invoiceConfigs.draft;
      
      case 'task':
        const taskConfigs = {
          todo: { color: 'bg-gray-100 text-gray-800', icon: 'Circle' },
          inProgress: { color: 'bg-blue-100 text-blue-800', icon: 'Clock' },
          completed: { color: 'bg-green-100 text-green-800', icon: 'CheckCircle' }
        };
        return taskConfigs[status] || taskConfigs.todo;
      
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: 'Circle' };
    }
  };

  const { color, icon } = getStatusConfig();

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${color}`}
    >
      <ApperIcon name={icon} className="h-3 w-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </motion.span>
  );
};

export default StatusPill;