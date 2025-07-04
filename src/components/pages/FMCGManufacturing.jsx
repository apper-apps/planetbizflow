import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { applicationService } from '@/services/api/applicationService';

const FMCGManufacturing = () => {
  const [formData, setFormData] = useState({
    founderName: '',
    email: '',
    phone: '',
    businessName: '',
    productCategory: '',
    businessIdea: '',
    investmentAmount: '',
    timeline: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const benefits = [
    {
      icon: 'Factory',
      title: 'Manufacturing Setup',
      description: 'Complete guidance on setting up manufacturing units with proper compliance and certifications.'
    },
    {
      icon: 'Shield',
      title: 'Quality Assurance',
      description: 'Implement quality control systems and obtain necessary certifications for your products.'
    },
    {
      icon: 'Truck',
      title: 'Supply Chain Management',
      description: 'Build efficient supply chain networks from raw materials to distribution channels.'
    },
    {
      icon: 'TrendingUp',
      title: 'Market Entry Support',
      description: 'Strategic market entry planning with brand positioning and distribution strategies.'
    }
  ];

  const faqs = [
    {
      question: 'What types of FMCG products can I manufacture?',
      answer: 'We support manufacturing across food & beverages, personal care, household products, health & wellness items, and packaged goods. Our team helps you identify the right product category based on market demand and your capabilities.'
    },
    {
      question: 'What is the typical investment required?',
      answer: 'Investment varies based on product category and scale. Typically ranges from ₹5 lakhs for small-scale operations to ₹50 lakhs for larger manufacturing setups. We provide detailed financial planning and funding support.'
    },
    {
      question: 'How long does it take to set up manufacturing?',
      answer: 'The setup timeline depends on product complexity and regulatory requirements. Generally, it takes 3-6 months from concept to production, including licensing, equipment installation, and quality certifications.'
    },
    {
      question: 'What certifications and licenses do I need?',
      answer: 'Common requirements include Trade License, GST Registration, FSSAI License (for food products), Pollution Control Board clearance, and product-specific certifications. We guide you through all compliance requirements.'
    },
    {
      question: 'Do you provide funding support?',
      answer: 'Yes, we help connect you with various funding options including government schemes, angel investors, and institutional funding. Our team assists with business plan preparation and investor presentations.'
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
        startupType: 'fmcg_manufacturing',
        submittedAt: new Date().toISOString()
      };
      
      await applicationService.create(applicationData);
      toast.success('Application submitted successfully! We will contact you within 24 hours.');
      
      setFormData({
        founderName: '',
        email: '',
        phone: '',
        businessName: '',
        productCategory: '',
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
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
                <ApperIcon name="Factory" className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                FMCG Manufacturing Startup
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Transform your product ideas into successful FMCG brands with our comprehensive manufacturing support
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
              Why Choose FMCG Manufacturing?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FMCG products have consistent demand and offer great opportunities for scalable business growth.
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-6">
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
                Start Your FMCG Manufacturing Journey
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the application form below and our experts will guide you through the entire process.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 md:p-12">
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
                    label="Product Category"
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleInputChange}
                    placeholder="e.g., Food & Beverages, Personal Care"
                    required
                  />
                  <Input
                    label="Investment Amount (₹)"
                    name="investmentAmount"
                    value={formData.investmentAmount}
                    onChange={handleInputChange}
                    placeholder="Expected investment amount"
                    required
                  />
                </div>

                <Input
                  label="Timeline to Start"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  placeholder="When do you plan to start manufacturing?"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Idea Description
                  </label>
                  <textarea
                    name="businessIdea"
                    value={formData.businessIdea}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe your product idea and target market..."
                    required
                  />
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
                Get answers to common questions about FMCG manufacturing startups.
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

export default FMCGManufacturing;