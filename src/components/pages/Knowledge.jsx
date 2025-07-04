import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Knowledge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: 'BookOpen' },
    { id: 'finance', name: 'Finance', icon: 'DollarSign' },
    { id: 'sales', name: 'Sales', icon: 'TrendingUp' },
    { id: 'marketing', name: 'Marketing', icon: 'Megaphone' },
    { id: 'operations', name: 'Operations', icon: 'Settings' },
    { id: 'legal', name: 'Legal', icon: 'Scale' },
  ];

  const knowledgeItems = [
    {
      id: 1,
      title: 'Cash Flow Management for Small Businesses',
      description: 'Learn how to manage your cash flow effectively and avoid common pitfalls.',
      category: 'finance',
      type: 'article',
      readTime: '5 min read',
      difficulty: 'Beginner',
      tags: ['cash flow', 'finance', 'budgeting']
    },
    {
      id: 2,
      title: 'Building Your Sales Pipeline',
      description: 'Step-by-step guide to creating and managing an effective sales pipeline.',
      category: 'sales',
      type: 'video',
      readTime: '12 min watch',
      difficulty: 'Intermediate',
      tags: ['sales', 'pipeline', 'CRM']
    },
    {
      id: 3,
      title: 'Fear of Sales: Overcoming Common Objections',
      description: 'Practical strategies to overcome sales anxiety and handle customer objections.',
      category: 'sales',
      type: 'article',
      readTime: '7 min read',
      difficulty: 'Beginner',
      tags: ['sales', 'psychology', 'objections']
    },
    {
      id: 4,
      title: 'Digital Marketing on a Budget',
      description: 'Maximize your marketing impact without breaking the bank.',
      category: 'marketing',
      type: 'video',
      readTime: '15 min watch',
      difficulty: 'Beginner',
      tags: ['marketing', 'budget', 'digital']
    },
    {
      id: 5,
      title: 'Vendor Management Best Practices',
      description: 'How to build strong relationships with suppliers and manage procurement.',
      category: 'operations',
      type: 'article',
      readTime: '6 min read',
      difficulty: 'Intermediate',
      tags: ['procurement', 'vendors', 'operations']
    },
    {
      id: 6,
      title: 'Business Credit Management',
      description: 'Understanding business credit and managing customer payments.',
      category: 'finance',
      type: 'article',
      readTime: '8 min read',
      difficulty: 'Intermediate',
      tags: ['credit', 'payments', 'receivables']
    },
    {
      id: 7,
      title: 'Legal Basics for Small Business',
      description: 'Essential legal knowledge every small business owner should know.',
      category: 'legal',
      type: 'video',
      readTime: '20 min watch',
      difficulty: 'Beginner',
      tags: ['legal', 'compliance', 'contracts']
    },
    {
      id: 8,
      title: 'Streamlining Office Operations',
      description: 'Tips for improving efficiency and reducing operational overhead.',
      category: 'operations',
      type: 'article',
      readTime: '5 min read',
      difficulty: 'Beginner',
      tags: ['operations', 'efficiency', 'management']
    }
  ];

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'video' ? 'Play' : 'FileText';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600">Learn and grow your business with expert guidance</p>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Search articles, videos, guides..."
            className="w-full lg:w-80"
          />
          <Button variant="accent" icon="Plus">
            Request Topic
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 shadow-card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-2 rounded-full ${
                  selectedCategory === category.id ? 'bg-primary/10' : 'bg-gray-100'
                }`}>
                  <ApperIcon name={category.icon} className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Knowledge Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <ApperIcon name={getTypeIcon(item.type)} className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-gray-500">{item.readTime}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                {item.difficulty}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {item.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {item.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary font-medium capitalize">
                {item.category}
              </span>
              <Button variant="ghost" size="sm" icon="ArrowRight">
                {item.type === 'video' ? 'Watch' : 'Read'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full p-8 mx-auto mb-6 w-fit">
            <ApperIcon name="Search" className="h-16 w-16 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or browse different categories.
          </p>
          <Button variant="accent" icon="Plus">
            Request New Topic
          </Button>
        </div>
      )}

      {/* Featured Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Need Personalized Help?</h3>
            <p className="text-blue-100 mb-4">
              Get expert guidance tailored to your specific business challenges.
            </p>
            <Button variant="secondary" icon="MessageCircle">
              Contact Expert
            </Button>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white/10 rounded-full p-6">
              <ApperIcon name="Lightbulb" className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Knowledge;