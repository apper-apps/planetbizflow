import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { applicationService } from '@/services/api/applicationService';

const MicroDistributor = () => {
  const [formData, setFormData] = useState({
    founderName: '',
    email: '',
    phone: '',
    businessName: '',
    distributionArea: '',
    productCategories: '',
    businessIdea: '',
    investmentAmount: '',
    timeline: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const benefits = [
    {
      icon: 'Truck',
      title: 'Logistics Support',
      description: 'Comprehensive logistics management including warehousing, inventory, and delivery optimization.'
    },
    {
      icon: 'Network',
      title: 'Vendor Network',
      description: 'Access to established vendor networks and supplier relationships for better procurement.'
    },
    {
      icon: 'MapPin',
      title: 'Territory Management',
      description: 'Strategic territory planning and market penetration strategies for maximum coverage.'
    },
    {
      icon: 'BarChart',
      title: 'Sales Analytics',
      description: 'Advanced analytics and reporting tools to track performance and optimize operations.'
    }
  ];

  const faqs = [
    {
      question: 'What products can I distribute as a micro distributor?',
      answer: 'You can distribute FMCG products, electronics, healthcare products, agricultural inputs, and consumer goods. We help you identify the right product mix based on your local market demand and investment capacity.'
    },
    {
      question: 'How much investment is required to start?',
      answer: 'Investment typically ranges from ₹2 lakhs to ₹20 lakhs depending on your distribution area, product categories, and inventory requirements. We provide detailed financial planning and funding support.'
    },
    {
      question: 'What area can I cover as a micro distributor?',
      answer: 'You can start with a local area (2-5 km radius) and gradually expand. Coverage depends on your logistics capability, investment, and market demand. We help you plan optimal territory expansion.'
    },
    {
      question: 'How do I find suppliers and manufacturers?',
      answer: 'We provide access to our extensive network of verified suppliers and manufacturers. Our team helps you negotiate favorable terms, understand product margins, and establish long-term partnerships.'
    },
    {
      question: 'What technology support do you provide?',
      answer: 'We offer inventory management software, order processing systems, customer relationship management tools, and real-time analytics dashboards to streamline your operations.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const applicationData = {
        ...formData,
        startupType: 'micro_distributor',
        submittedAt: new Date().toISOString()
      };
      
      await applicationService.create(applicationData);
      toast.success('Application submitted successfully! We will contact you within 24 hours.');
      
      setFormData({
        founderName: '',
        email: '',
        phone: '',
        businessName: '',
        distributionArea: '',
        productCategories: '',
        businessIdea: '',
        investmentAmount: '',
        timeline: ''
      });
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-teal-700 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
                <ApperIcon name="Truck" className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Micro Distributor Network
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Build a thriving distribution business with our comprehensive support and technology solutions
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Micro Distribution?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Distribution businesses offer steady income, scalable growth, and the opportunity to serve your local community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg mb-6">
                  <ApperIcon name={benefit.icon} className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Start Your Distribution Business
              </h2>
              <p className="text-xl text-gray-600">
                Join our network of successful micro distributors and build a sustainable business.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Founder Name"
                    name="founderName"
                    value={formData.founderName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                  <Input
                    label="Business Name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Enter your business name"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Distribution Area"
                    name="distributionArea"
                    value={formData.distributionArea}
                    onChange={handleInputChange}
                    placeholder="e.g., Bhubaneswar, Cuttack District"
                    required
                  />
                  <Input
                    label="Product Categories"
                    name="productCategories"
                    value={formData.productCategories}
                    onChange={handleInputChange}
                    placeholder="e.g., FMCG, Electronics, Healthcare"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Investment Amount (₹)"
                    name="investmentAmount"
                    value={formData.investmentAmount}
                    onChange={handleInputChange}
                    placeholder="Expected investment amount"
                    required
                  />
                  <Input
                    label="Timeline to Start"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    placeholder="When do you plan to start?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Plan Description
                  </label>
                  <textarea
                    name="businessIdea"
                    value={formData.businessIdea}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe your distribution strategy and target market..."
                    required
                  />
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  >
                    {isSubmitting ? (
                      <>
                        <ApperIcon name="Loader" className="h-5 w-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Send" className="h-5 w-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about micro distribution businesses.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <ApperIcon 
                      name={expandedFaq === index ? "ChevronUp" : "ChevronDown"} 
                      className="h-5 w-5 text-gray-500"
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MicroDistributor;