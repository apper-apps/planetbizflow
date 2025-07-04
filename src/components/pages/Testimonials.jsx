import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Testimonials = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Testimonials' },
    { id: 'startup', name: 'Startups' },
    { id: 'government', name: 'Government Partners' },
    { id: 'investors', name: 'Investors' },
    { id: 'service_providers', name: 'Service Providers' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      position: 'Founder & CEO',
      company: 'EcoTech Solutions',
      category: 'startup',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      testimonial: 'Startup OS has been instrumental in streamlining our business operations. The onboarding process was smooth, and the compliance management features have saved us countless hours. Highly recommended for any startup in Odisha.',
      highlight: 'Saved 40+ hours monthly on compliance'
    },
    {
      id: 2,
      name: 'Priya Mohanty',
      position: 'Co-founder',
      company: 'Digital Craft India',
      category: 'startup',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face',
      testimonial: 'The platform\'s integration capabilities are excellent. We were able to connect our existing tools seamlessly, and the financial management features have given us better visibility into our cash flow.',
      highlight: 'Improved cash flow visibility by 60%'
    },
    {
      id: 3,
      name: 'Dr. Subash Patel',
      position: 'Director',
      company: 'Saksham Odisha Initiative',
      category: 'government',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      testimonial: 'Startup OS has significantly enhanced our ability to support and monitor startup growth in Odisha. The comprehensive dashboard provides real-time insights that help us make informed policy decisions.',
      highlight: 'Monitoring 500+ startups effectively'
    },
    {
      id: 4,
      name: 'Anil Sharma',
      position: 'Managing Partner',
      company: 'Odisha Growth Fund',
      category: 'investors',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      testimonial: 'The transparency and data accuracy provided by Startup OS makes due diligence much more efficient. We can track portfolio companies\' progress in real-time and provide targeted support where needed.',
      highlight: 'Reduced due diligence time by 50%'
    },
    {
      id: 5,
      name: 'Meera Das',
      position: 'Founder',
      company: 'AgriTech Innovations',
      category: 'startup',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      testimonial: 'As a first-time entrepreneur, Startup OS guided me through every step of the business setup process. The knowledge base is comprehensive, and the support team is incredibly responsive.',
      highlight: 'Launched business 3 weeks faster'
    },
    {
      id: 6,
      name: 'Santosh Biswal',
      position: 'Senior Consultant',
      company: 'Business Advisory Services',
      category: 'service_providers',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
      testimonial: 'Working with startups on the Startup OS platform has streamlined our consulting services. The standardized processes and clear documentation make it easier to provide quality advice to our clients.',
      highlight: 'Serving 25% more clients efficiently'
    }
  ];

  const stats = [
    { label: 'Active Startups', value: '500+', icon: 'Building' },
    { label: 'Success Stories', value: '150+', icon: 'TrendingUp' },
    { label: 'Jobs Created', value: '2,500+', icon: 'Users' },
    { label: 'Investment Facilitated', value: '₹25Cr+', icon: 'DollarSign' }
  ];

  const filteredTestimonials = testimonials.filter(
    testimonial => selectedCategory === 'all' || testimonial.category === selectedCategory
  );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <ApperIcon
        key={i}
        name="Star"
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Success Stories
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Hear from the entrepreneurs, government partners, and investors who are building Odisha's startup ecosystem
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
              <ApperIcon name={stat.icon} className="h-8 w-8 text-white" />
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
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
                <p className="text-sm text-primary font-medium">{testimonial.company}</p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              {renderStars(testimonial.rating)}
            </div>

            <blockquote className="text-gray-700 mb-4 italic">
              "{testimonial.testimonial}"
            </blockquote>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border-l-4 border-green-500">
              <div className="flex items-center">
                <ApperIcon name="TrendingUp" className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">{testimonial.highlight}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Join the Success Stories</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ready to transform your startup journey? Join hundreds of successful entrepreneurs in Odisha's growing ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" icon="UserPlus" size="lg">
              Start Your Journey
            </Button>
            <Button variant="outline" icon="Calendar" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;