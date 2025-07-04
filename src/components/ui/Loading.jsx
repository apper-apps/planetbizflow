import { motion } from 'framer-motion';

const Loading = ({ type = 'dashboard' }) => {
  const renderDashboardSkeleton = () => (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="shimmer h-8 w-64 rounded-lg"></div>
      
      {/* Metrics grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-card">
            <div className="shimmer h-4 w-20 rounded mb-2"></div>
            <div className="shimmer h-8 w-16 rounded mb-2"></div>
            <div className="shimmer h-3 w-24 rounded"></div>
          </div>
        ))}
      </div>
      
      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-card">
          <div className="shimmer h-6 w-32 rounded mb-4"></div>
          <div className="shimmer h-64 w-full rounded"></div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-card">
          <div className="shimmer h-6 w-28 rounded mb-4"></div>
          <div className="shimmer h-64 w-full rounded"></div>
        </div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="shimmer h-10 w-10 rounded-full"></div>
              <div className="space-y-2">
                <div className="shimmer h-4 w-32 rounded"></div>
                <div className="shimmer h-3 w-24 rounded"></div>
              </div>
            </div>
            <div className="shimmer h-6 w-16 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableSkeleton = () => (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="shimmer h-6 w-32 rounded"></div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-center justify-between py-3">
              <div className="shimmer h-4 w-48 rounded"></div>
              <div className="shimmer h-4 w-24 rounded"></div>
              <div className="shimmer h-4 w-16 rounded"></div>
              <div className="shimmer h-6 w-20 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="animate-pulse"
    >
      {type === 'dashboard' && renderDashboardSkeleton()}
      {type === 'list' && renderListSkeleton()}
      {type === 'table' && renderTableSkeleton()}
    </motion.div>
  );
};

export default Loading;