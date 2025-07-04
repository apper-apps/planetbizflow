import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';

const Support = () => {
  const [selectedTab, setSelectedTab] = useState('help');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const tabs = [
    { id: 'help', label: 'Help Center', icon: 'HelpCircle' },
    { id: 'contact', label: 'Contact Us', icon: 'MessageCircle' },
    { id: 'faq', label: 'FAQ', icon: 'Book' }
  ];

  const supportCategories = [
    { value: 'onboarding', label: 'Onboarding Support' },
    { value: 'kyc', label: 'KYC Verification' },
    { value: 'payment', label: 'Payment Issues' },
    { value: 'compliance', label: 'Compliance Questions' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'general', label: 'General Inquiry' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const helpTopics = [
    {
      id: 1,
      title: 'Getting Started',
      description: 'Learn how to register and complete your startup onboarding',
      icon: 'Rocket',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      title: 'KYC Verification',
      description: 'Understanding the KYC process and required documents',
      icon: 'Shield',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      title: 'Payment & Billing',
      description: 'Payment methods, invoices, and billing inquiries',
      icon: 'CreditCard',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      title: 'Compliance & Legal',
      description: 'Legal requirements and compliance guidelines',
      icon: 'Scale',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 5,
      title: 'Platform Features',
      description: 'How to use various features of the Startup OS platform',
      icon: 'Settings',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      id: 6,
      title: 'Account Management',
      description: 'Managing your profile, settings, and preferences',
      icon: 'User',
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'What is the onboarding fee for Startup OS?',
      answer: 'The onboarding fee is ₹6,000 which includes platform registration (₹4,000), KYC verification (₹1,000), compliance setup (₹500), and service tax (₹500).'
    },
    {
      id: 2,
      question: 'How long does KYC verification take?',
      answer: 'KYC verification typically takes 2-3 business days once all required documents are submitted correctly.'
    },
    {
      id: 3,
      question: 'What payment methods are accepted?',
      answer: 'We accept UPI payments, credit/debit cards, net banking, and digital wallets through our secure Razorpay integration.'
    },
    {
      id: 4,
      question: 'What documents are required for KYC?',
      answer: 'You need PAN card, Aadhaar card, address proof, founder photo, and optionally your business plan.'
    },
    {
      id: 5,
      question: 'How do I track my application status?',
      answer: 'You can track your application status through your dashboard. We also send email notifications for status updates.'
    },
    {
      id: 6,
      question: 'What support is available after registration?',
      answer: 'We provide mentorship programs, funding support, training workshops, networking events, and ongoing technical support.'
    }
  ];

  const handleInputChange = (name, value) => {
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Your support request has been submitted successfully! We will get back to you within 24 hours.');
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: '',
        priority: 'medium'
      });
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    }
  };

  const renderHelpCenter = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How can we help you?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose a topic below to find answers to common questions and get the support you need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpTopics.map((topic) => (
          <div
            key={topic.id}
            className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => toast.info(`${topic.title} help section will be available soon`)}
          >
            <div className={`w-12 h-12 rounded-lg ${topic.color} flex items-center justify-center mb-4`}>
              <ApperIcon name={topic.icon} className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{topic.title}</h3>
            <p className="text-sm text-gray-600">{topic.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
        <ApperIcon name="Phone" className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Immediate Help?</h3>
        <p className="text-gray-600 mb-4">
          For urgent matters, you can reach us directly through phone or email.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => window.location.href = 'tel:+911800XXXXXX'}
            className="bg-gradient-to-r from-blue-500 to-indigo-600"
          >
            <ApperIcon name="Phone" className="h-4 w-4 mr-2" />
            Call Now
          </Button>
          <Button
            onClick={() => window.location.href = 'mailto:support@startupos.odisha.gov.in'}
            variant="outline"
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <ApperIcon name="Mail" className="h-4 w-4 mr-2" />
            Email Us
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContactForm = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Support</h2>
        <p className="text-gray-600">
          Submit your query and our support team will get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name *"
            type="text"
            value={contactForm.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            required
          />
          <Input
            label="Email Address *"
            type="email"
            value={contactForm.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Phone Number"
            type="tel"
            value={contactForm.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter your phone number"
          />
          <Select
            label="Category *"
            value={contactForm.category}
            onChange={(value) => handleInputChange('category', value)}
            options={supportCategories}
            placeholder="Select category"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Subject *"
            type="text"
            value={contactForm.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Brief description of your issue"
            required
          />
          <Select
            label="Priority"
            value={contactForm.priority}
            onChange={(value) => handleInputChange('priority', value)}
            options={priorityOptions}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            rows="6"
            value={contactForm.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Please describe your issue in detail..."
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-gradient-to-r from-startup-blue to-startup-green"
          >
            <ApperIcon name="Send" className="h-4 w-4 mr-2" />
            Submit Request
          </Button>
        </div>
      </form>
    </div>
  );

  const renderFAQ = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600">
          Find answers to common questions about Startup OS Odisha platform.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="border rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Didn't find what you were looking for?
        </p>
        <Button
          onClick={() => setSelectedTab('contact')}
          className="bg-gradient-to-r from-startup-blue to-startup-green"
        >
          <ApperIcon name="MessageCircle" className="h-4 w-4 mr-2" />
          Contact Support
        </Button>
      </div>
    </div>
  );

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
            <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
            <p className="text-gray-600">Get help with your Startup OS journey</p>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Clock" className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">Response time: 24 hours</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
                selectedTab === tab.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ApperIcon name={tab.icon} className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-card p-8">
        {selectedTab === 'help' && renderHelpCenter()}
        {selectedTab === 'contact' && renderContactForm()}
        {selectedTab === 'faq' && renderFAQ()}
      </div>
    </motion.div>
  );
};

export default Support;