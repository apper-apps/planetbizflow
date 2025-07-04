import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Home = () => {
  const startupTypes = [
    {
      id: 1,
      title: 'FMCG Manufacturing Startup',
      description: 'Transform your manufacturing ideas into successful FMCG products with our comprehensive support system.',
      icon: 'Factory',
      path: '/fmcg-manufacturing',
      color: 'from-blue-500 to-purple-600',
      features: ['Product Development', 'Quality Assurance', 'Supply Chain Management', 'Market Distribution']
    },
    {
      id: 2,
      title: 'Micro Distributor',
      description: 'Build and scale your distribution network with our specialized tools and mentorship programs.',
      icon: 'Truck',
      path: '/micro-distributor',
      color: 'from-green-500 to-teal-600',
      features: ['Inventory Management', 'Logistics Support', 'Vendor Relations', 'Market Expansion']
    },
    {
      id: 3,
      title: 'Digital Entrepreneurs',
      description: 'Launch your digital venture with cutting-edge technology solutions and expert guidance.',
      icon: 'Monitor',
      path: '/digital-entrepreneurs',
      color: 'from-purple-500 to-pink-600',
      features: ['Technology Stack', 'Digital Marketing', 'User Experience', 'Scalable Architecture']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to <span className="text-yellow-300">Startup OS</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Empowering Entrepreneurs across Odisha with Comprehensive Startup Solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  <ApperIcon name="Rocket" className="h-5 w-5 mr-2" />
                  Get Started Today
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  <ApperIcon name="Play" className="h-5 w-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Startup Types Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Startup Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in three key areas of entrepreneurship, each with tailored support systems designed to help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {startupTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${type.color}`}></div>
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${type.color} rounded-lg mb-6`}>
                    <ApperIcon name={type.icon} className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                    {type.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {type.description}
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <ApperIcon name="Check" className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link to={type.path}>
                    <Button
                      variant="primary"
                      className="w-full group-hover:bg-primary group-hover:text-white"
                    >
                      Learn More & Apply
                      <ApperIcon name="ArrowRight" className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Startups Supported</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">₹50L+</div>
              <div className="text-gray-600">Funding Facilitated</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Entrepreneurial Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of successful entrepreneurs who have transformed their ideas into thriving businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              <ApperIcon name="UserPlus" className="h-5 w-5 mr-2" />
              Start Application
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <ApperIcon name="Phone" className="h-5 w-5 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;