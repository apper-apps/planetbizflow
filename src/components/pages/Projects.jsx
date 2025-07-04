import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects', icon: 'FolderOpen' },
    { id: 'technology', name: 'Technology', icon: 'Monitor' },
    { id: 'agriculture', name: 'Agriculture', icon: 'Leaf' },
    { id: 'healthcare', name: 'Healthcare', icon: 'Heart' },
    { id: 'education', name: 'Education', icon: 'GraduationCap' },
    { id: 'manufacturing', name: 'Manufacturing', icon: 'Factory' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Smart Agriculture Platform',
      description: 'IoT-based farming solution helping 500+ farmers optimize crop yield and reduce water usage',
      category: 'agriculture',
      status: 'Active',
      metrics: {
        farmers: '500+',
        waterSaved: '30%',
        yieldIncrease: '25%'
      },
      funding: '₹2.5 Cr',
      timeline: '18 months',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop',
      tags: ['IoT', 'Sustainability', 'AgTech']
    },
    {
      id: 2,
      title: 'Digital Health Records',
      description: 'Blockchain-based patient data management system serving rural healthcare centers',
      category: 'healthcare',
      status: 'Completed',
      metrics: {
        healthCenters: '50+',
        patients: '10,000+',
        efficiency: '40%'
      },
      funding: '₹1.8 Cr',
      timeline: '12 months',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      tags: ['Blockchain', 'Healthcare', 'Digital']
    },
    {
      id: 3,
      title: 'E-Learning Platform',
      description: 'Multilingual education platform supporting Odia language content for rural students',
      category: 'education',
      status: 'Active',
      metrics: {
        students: '25,000+',
        schools: '200+',
        completion: '85%'
      },
      funding: '₹3.2 Cr',
      timeline: '24 months',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
      tags: ['EdTech', 'Multilingual', 'Accessibility']
    },
    {
      id: 4,
      title: 'Textile Manufacturing Hub',
      description: 'Modern textile processing facility creating employment for 1000+ artisans',
      category: 'manufacturing',
      status: 'Active',
      metrics: {
        artisans: '1,000+',
        production: '200%',
        export: '₹15 Cr'
      },
      funding: '₹8.5 Cr',
      timeline: '30 months',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      tags: ['Manufacturing', 'Employment', 'Export']
    },
    {
      id: 5,
      title: 'Fintech for MSMEs',
      description: 'Digital lending platform providing quick loans to small businesses',
      category: 'technology',
      status: 'Active',
      metrics: {
        loans: '₹50 Cr+',
        businesses: '2,000+',
        approval: '72 hrs'
      },
      funding: '₹4.1 Cr',
      timeline: '15 months',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      tags: ['Fintech', 'MSME', 'Digital Banking']
    },
    {
      id: 6,
      title: 'Clean Energy Initiative',
      description: 'Solar power distribution network for remote villages in Odisha',
      category: 'technology',
      status: 'Planned',
      metrics: {
        villages: '100+',
        households: '5,000+',
        capacity: '10 MW'
      },
      funding: '₹12.3 Cr',
      timeline: '36 months',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop',
      tags: ['Clean Energy', 'Rural Development', 'Sustainability']
    }
  ];

  const filteredProjects = projects.filter(
    project => selectedCategory === 'all' || project.category === selectedCategory
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { label: 'Total Projects', value: '25+', icon: 'FolderOpen' },
    { label: 'Active Startups', value: '180+', icon: 'Building' },
    { label: 'Jobs Created', value: '3,500+', icon: 'Users' },
    { label: 'Total Investment', value: '₹125 Cr+', icon: 'TrendingUp' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Startup Projects
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover innovative projects driving economic growth and social impact across Odisha
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-card text-center"
          >
            <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-4 mx-auto mb-4 w-fit">
              <ApperIcon name={stat.icon} className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
              }`}
            >
              <ApperIcon name={category.icon} className="h-4 w-4 mr-2" />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <div className="text-sm text-gray-500">
                  <ApperIcon name="Clock" className="h-4 w-4 inline mr-1" />
                  {project.timeline}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-lg font-bold text-primary">{value}</div>
                    <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Funding:</span> {project.funding}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" size="sm">
                  <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="primary" className="flex-1" size="sm">
                  <ApperIcon name="ExternalLink" className="h-4 w-4 mr-2" />
                  Visit Project
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Partnership CTA */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Have a Project Idea?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our ecosystem and turn your innovative idea into a successful project that creates impact in Odisha.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" icon="Lightbulb" size="lg">
              Submit Project Idea
            </Button>
            <Button variant="outline" icon="MessageCircle" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Discuss Partnership
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;