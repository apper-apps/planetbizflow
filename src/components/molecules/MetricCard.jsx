import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  gradient = 'from-blue-500 to-indigo-600',
  className = '' 
}) => {
  const getTrendColor = () => {
    if (!trend) return 'text-gray-500';
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  const getTrendIcon = () => {
    if (!trend) return 'Minus';
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          {trend && (
            <div className={`flex items-center text-sm ${getTrendColor()}`}>
              <ApperIcon name={getTrendIcon()} className="h-4 w-4 mr-1" />
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`bg-gradient-to-r ${gradient} rounded-full p-3`}>
          <ApperIcon name={icon} className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;