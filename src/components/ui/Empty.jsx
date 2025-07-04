import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  icon = 'FileText', 
  title = 'No data available', 
  description = 'Get started by adding your first item.',
  actionText = 'Add Item',
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full p-8 mb-6">
        <ApperIcon name={icon} className="h-16 w-16 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="bg-gradient-to-r from-accent to-success hover:from-accent/90 hover:to-success/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          <ApperIcon name="Plus" className="h-5 w-5" />
          {actionText}
        </button>
      )}
    </motion.div>
  );
};

export default Empty;