import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Startup Onboarding',
      description: 'Streamlined registration and setup process for new startups in Odisha',
      icon: 'UserPlus',
      features: [
        'Business registration assistance',
        'Documentation guidance',
        'Compliance setup',
        'Platform orientation'
      ],
      path: '/onboarding',
      gradient: 'from-blue-500 to-indigo-600',
      popular: false
    },
    {
      id: 2,
      title: 'KYC & Compliance',
      description: 'Comprehensive verification and ongoing compliance management',
      icon: 'Shield',
      features: [
        'Document verification',
        'Identity validation',
        'Compliance monitoring',
        'Regulatory updates'
      ],
      path: '/kyc-center',
      gradient: 'from-green-500 to-emerald-600',
      popular: true
    },
    {
      id: 3,
      title: 'Financial Management',
      description: 'Complete financial tracking and management tools',
      icon: 'DollarSign',
      features: [
        'Expense tracking',
        'Revenue monitoring',
        'Financial reporting',
        'Budget planning'
      ],
      path: '/payment-portal',
      gradient: 'from-purple-500 to-violet-600',
      popular: false
    },
    {
      id: 4,
      title: 'Payment Processing',
      description: 'Secure and efficient payment solutions for startups',
      icon: 'CreditCard',
      features: [
        'Multiple payment methods',
        'Automated invoicing',
        'Payment tracking',
        'Security compliance'
      ],
      path: '/payment-portal',
      gradient: 'from-yellow-500 to-orange-600',
      popular: false
    },
    {
      id: 5,
      title: 'Business Intelligence',
      description: 'Data-driven insights and analytics for informed decision making',
      icon: 'BarChart3',
      features: [
        'Real-time dashboards',
        'Performance metrics',
        'Trend analysis',
        'Custom reports'
      ],
      path: '/',
      gradient: 'from-red-500 to-pink-600',
      popular: false
    },
    {
      id: 6,
      title: 'Resource Center',
      description: 'Access to knowledge base, training, and expert guidance',
      icon: 'BookOpen',
      features: [
        'Learning materials',
        'Best practices',
        'Expert consultation',
        'Community forums'
      ],
      path: '/resources',
      gradient: 'from-teal-500 to-cyan-600',
      popular: false
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Registration',
      description: 'Create your account and provide basic business information',
      icon: 'UserPlus'
    },
    {
      step: 2,
      title: 'Verification',
      description: 'Complete KYC process with document submission',
      icon: 'Shield'
    },
    {
      step: 3,
      title: 'Setup',
      description: 'Configure your business profile and preferences',
      icon: 'Settings'
    },
    {
      step: 4,
      title: 'Launch',
      description: 'Start using all platform features and services',
      icon: 'Rocket'
    }
  ];

  const benefits = [
    {
      title: 'Time Savings',
      description: 'Reduce administrative overhead by up to 70%',
      icon: 'Clock',
      value: '70%'
    },
    {
      title: 'Cost Efficiency',
      description: 'Lower operational costs through automation',
      icon: 'TrendingDown',
      value: '50%'
    },
    {
      title: 'Compliance',
      description: 'Stay 100% compliant with regulations',
      icon: 'CheckCircle',
      value: '100%'
    },
    {
      title: 'Growth',
      description: 'Accelerate business growth and scaling',
      icon: 'TrendingUp',
      value: '3x'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Services
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive business management solutions designed specifically for Odisha's startup ecosystem
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group"
          >
            {service.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className={`bg-gradient-to-r ${service.gradient} rounded-lg p-4 mb-6 w-fit group-hover:scale-110 transition-transform duration-300`}>
              <ApperIcon name={service.icon} className="h-8 w-8 text-white" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-6">{service.description}</p>

            <ul className="space-y-3 mb-8">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                  <ApperIcon name="Check" className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link to={service.path}>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                Learn More
                <ApperIcon name="ArrowRight" className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Process Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">Get started with our platform in four simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center relative"
            >
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform translate-x-4 -translate-y-1/2" />
              )}
              
              <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-6 mx-auto mb-4 w-fit">
                <ApperIcon name={step.icon} className="h-8 w-8 text-white" />
              </div>
              
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                {step.step}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Startup OS?</h2>
          <p className="text-lg text-gray-600">Measurable benefits that drive real business value</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-card text-center hover:shadow-card-hover transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-4 mx-auto mb-4 w-fit">
                <ApperIcon name={benefit.icon} className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{benefit.value}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of successful startups in Odisha and accelerate your business growth today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button variant="secondary" icon="Rocket" size="lg">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" icon="Eye" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;