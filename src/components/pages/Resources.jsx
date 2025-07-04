import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', icon: 'Grid' },
    { id: 'legal', label: 'Legal & Compliance', icon: 'Scale' },
    { id: 'funding', label: 'Funding & Investment', icon: 'DollarSign' },
    { id: 'business', label: 'Business Development', icon: 'TrendingUp' },
    { id: 'technology', label: 'Technology & Innovation', icon: 'Code' },
    { id: 'mentorship', label: 'Mentorship & Training', icon: 'Users' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Startup Legal Guide for Odisha',
      description: 'Comprehensive guide covering legal requirements, compliance, and regulatory aspects for startups in Odisha.',
      category: 'legal',
      type: 'PDF Guide',
      size: '2.5 MB',
      icon: 'FileText',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Funding Opportunities in Odisha',
      description: 'Directory of funding sources, grants, and investment opportunities available for Odisha startups.',
      category: 'funding',
      type: 'Interactive Guide',
      size: '1.8 MB',
      icon: 'PiggyBank',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Business Plan Template',
      description: 'Professional business plan template with sections for market analysis, financial projections, and growth strategy.',
      category: 'business',
      type: 'Word Template',
      size: '850 KB',
      icon: 'Briefcase',
      downloadUrl: '#'
    },
    {
      id: 4,
      title: 'Pitch Deck Examples',
      description: 'Collection of successful pitch deck examples from Odisha startups with detailed analysis and tips.',
      category: 'business',
      type: 'PowerPoint',
      size: '15 MB',
      icon: 'Presentation',
      downloadUrl: '#'
    },
    {
      id: 5,
      title: 'Technology Innovation Framework',
      description: 'Framework for implementing technology innovations in traditional business models.',
      category: 'technology',
      type: 'PDF Guide',
      size: '3.2 MB',
      icon: 'Lightbulb',
      downloadUrl: '#'
    },
    {
      id: 6,
      title: 'Mentorship Program Handbook',
      description: 'Guide to finding mentors, building relationships, and maximizing mentorship opportunities.',
      category: 'mentorship',
      type: 'Interactive Guide',
      size: '2.1 MB',
      icon: 'UserCheck',
      downloadUrl: '#'
    }
  ];

  const webResources = [
    {
      id: 1,
      title: 'Saksham Odisha Portal',
      description: 'Official portal for Odisha skill development and entrepreneurship initiatives.',
      url: 'https://sakshamodisha.com',
      category: 'Government',
      icon: 'Globe'
    },
    {
      id: 2,
      title: 'Startup Odisha',
      description: 'Government of Odisha\'s startup ecosystem platform with policies and support programs.',
      url: 'https://startupodisha.gov.in',
      category: 'Government',
      icon: 'Building'
    },
    {
      id: 3,
      title: 'Odisha Startup Ecosystem Report',
      description: 'Comprehensive analysis of Odisha\'s startup ecosystem by Startup Genome.',
      url: 'https://startupgenome.com/ecosystems/odisha',
      category: 'Research',
      icon: 'BarChart'
    },
    {
      id: 4,
      title: 'MSME Sampark Portal',
      description: 'Platform for connecting MSMEs with various government schemes and support programs.',
      url: '#',
      category: 'Government',
      icon: 'Network'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (resourceId) => {
    toast.success('Download started! The resource will be available shortly.');
    // In real implementation, this would trigger actual download
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="bg-white rounded-xl shadow-card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resource Center</h1>
            <p className="text-gray-600">Essential tools and guides for your startup journey</p>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="BookOpen" className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-gray-700">
              {filteredResources.length} Resources Available
            </span>
          </div>
        </div>

        {/* Search */}
        <SearchBar
          onSearch={setSearchTerm}
          placeholder="Search resources..."
          className="max-w-md"
        />
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedCategory === category.id
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <ApperIcon name={category.icon} className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Downloadable Resources */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Downloadable Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-lg p-2 mr-3">
                    <ApperIcon name={resource.icon} className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-600">{resource.type} • {resource.size}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleDownload(resource.id)}
                  variant="outline"
                  size="sm"
                >
                  <ApperIcon name="Download" className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-700 mb-3">{resource.description}</p>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {categories.find(c => c.id === resource.category)?.label}
                </span>
                <Button
                  onClick={() => handleDownload(resource.id)}
                  className="bg-gradient-to-r from-startup-blue to-startup-green"
                  size="sm"
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Web Resources */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">External Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {webResources.map((resource) => (
            <div key={resource.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-lg p-2 mr-3">
                    <ApperIcon name={resource.icon} className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-600">{resource.category}</p>
                  </div>
                </div>
                <Button
                  onClick={() => window.open(resource.url, '_blank')}
                  variant="outline"
                  size="sm"
                >
                  <ApperIcon name="ExternalLink" className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-700 mb-3">{resource.description}</p>
              <Button
                onClick={() => window.open(resource.url, '_blank')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 w-full"
                size="sm"
              >
                Visit Website
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="text-center">
          <ApperIcon name="HelpCircle" className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need More Resources?</h3>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? Our team is here to help you access the right resources.
          </p>
          <Button
            onClick={() => toast.info('Resource request feature will be available soon')}
            className="bg-gradient-to-r from-blue-500 to-indigo-600"
          >
            <ApperIcon name="MessageCircle" className="h-4 w-4 mr-2" />
            Request Resources
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Resources;