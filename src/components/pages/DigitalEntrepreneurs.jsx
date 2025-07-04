import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { applicationService } from '@/services/api/applicationService';

const DigitalEntrepreneurs = () => {
  const [formData, setFormData] = useState({
    founderName: '',
    email: '',
    phone: '',
    businessName: '',
    serviceType: '',
    targetMarket: '',
    businessIdea: '',
    investmentAmount: '',
    timeline: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const benefits = [
    {
      icon: 'Monitor',
      title: 'Technology Stack',
      description: 'Access to modern technology stacks, cloud infrastructure, and development tools for rapid scaling.'
    },
    {
      icon: 'Globe',
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies including SEO, social media, and online advertising.'
    },
    {
      icon: 'Users',
      title: 'User Experience',
      description: 'Expert UX/UI design services to create engaging and user-friendly digital experiences.'
    },
    {
      icon: 'Zap',
      title: 'Scalable Solutions',
      description: 'Build scalable digital solutions that can grow with your business and adapt to market changes.'
    }
  ];

  const faqs = [
    {
      question: 'What types of digital businesses can I start?',
      answer: 'You can start various digital businesses including e-commerce platforms, SaaS applications, mobile apps, digital marketing agencies, online education platforms, fintech solutions, and digital content creation businesses.'
    },
    {
      question: 'What technology support do you provide?',
      answer: 'We provide comprehensive technology support including cloud infrastructure setup, software development guidance, mobile app development, web development, database design, and integration with third-party services.'
    },
    {
      question: 'How much investment is required for a digital startup?',
      answer: 'Digital startups typically require lower initial investment compared to traditional businesses. Investment can range from ₹1 lakh to ₹25 lakhs depending on the complexity of your solution and market reach.'
    },
    {
      question: 'Do you help with digital marketing and customer acquisition?',
      answer: 'Yes, we provide comprehensive digital marketing support including SEO, social media marketing, content marketing, paid advertising, email marketing, and growth hacking strategies to help you acquire and retain customers.'
    },
    {
      question: 'What about legal and compliance issues for digital businesses?',
      answer: 'We help you navigate digital business regulations including data privacy laws, payment gateway compliance, GST for digital services, intellectual property protection, and terms of service/privacy policy creation.'
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
        startupType: 'digital_entrepreneur',
        submittedAt: new Date().toISOString()
      };
      
      await applicationService.create(applicationData);
      toast.success('Application submitted successfully! We will contact you within 24 hours.');
      
      setFormData({
        founderName: '',
        email: '',
        phone: '',
        businessName: '',
        serviceType: '',
        targetMarket: '',
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
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-700 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
                <ApperIcon name="Monitor" className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Digital Entrepreneurs
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100">
                Launch your digital venture with cutting-edge technology and expert guidance in the digital economy
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
              Why Choose Digital Entrepreneurship?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Digital businesses offer unlimited scalability, global reach, and the flexibility to innovate rapidly in the digital age.
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg mb-6">
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
                Start Your Digital Journey
              </h2>
              <p className="text-xl text-gray-600">
                Transform your digital ideas into successful ventures with our comprehensive support system.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 md:p-12">
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
                    label="Service Type"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    placeholder="e.g., E-commerce, SaaS, Mobile App"
                    required
                  />
                  <Input
                    label="Target Market"
                    name="targetMarket"
                    value={formData.targetMarket}
                    onChange={handleInputChange}
                    placeholder="e.g., B2B, B2C, Local, Global"
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
                    label="Timeline to Launch"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    placeholder="When do you plan to launch?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Digital Business Idea
                  </label>
                  <textarea
                    name="businessIdea"
                    value={formData.businessIdea}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe your digital business idea, target audience, and unique value proposition..."
                    required
                  />
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
                Get answers to common questions about digital entrepreneurship.
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

export default DigitalEntrepreneurs;