import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Categories', icon: 'HelpCircle' },
    { id: 'onboarding', name: 'Onboarding', icon: 'UserPlus' },
    { id: 'kyc', name: 'KYC & Compliance', icon: 'Shield' },
    { id: 'payments', name: 'Payments', icon: 'CreditCard' },
    { id: 'platform', name: 'Platform', icon: 'Settings' },
    { id: 'support', name: 'Support', icon: 'MessageCircle' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'onboarding',
      question: 'How long does the startup onboarding process take?',
      answer: 'The typical onboarding process takes 3-5 business days once all required documents are submitted. This includes account verification, KYC processing, and platform setup.'
    },
    {
      id: 2,
      category: 'onboarding',
      question: 'What documents are required for startup registration?',
      answer: 'You need your Certificate of Incorporation, PAN card, GST registration (if applicable), bank account details, and founder identification documents.'
    },
    {
      id: 3,
      category: 'kyc',
      question: 'What is the KYC verification process?',
      answer: 'KYC verification involves document submission, identity verification, and business validation. Our team reviews submissions within 24-48 hours and may request additional information if needed.'
    },
    {
      id: 4,
      category: 'kyc',
      question: 'How often do I need to update my KYC information?',
      answer: 'KYC information should be updated whenever there are significant changes to your business structure, ownership, or key personnel. We recommend annual reviews to ensure compliance.'
    },
    {
      id: 5,
      category: 'payments',
      question: 'What payment methods are accepted?',
      answer: 'We accept bank transfers, UPI payments, credit/debit cards, and digital wallets. All payments are processed securely through our encrypted payment gateway.'
    },
    {
      id: 6,
      category: 'payments',
      question: 'Are there any setup fees?',
      answer: 'Basic platform access has no setup fees. Premium features and custom integrations may have one-time setup costs, which are clearly communicated during the onboarding process.'
    },
    {
      id: 7,
      category: 'platform',
      question: 'Can I integrate the platform with existing business tools?',
      answer: 'Yes, our platform offers APIs and integrations with popular business tools including accounting software, CRM systems, and payment processors.'
    },
    {
      id: 8,
      category: 'platform',
      question: 'Is my business data secure on the platform?',
      answer: 'Absolutely. We use enterprise-grade security measures including data encryption, regular security audits, and compliance with industry standards to protect your information.'
    },
    {
      id: 9,
      category: 'support',
      question: 'What support channels are available?',
      answer: 'We offer email support, live chat during business hours, phone support for premium users, and a comprehensive knowledge base with tutorials and guides.'
    },
    {
      id: 10,
      category: 'support',
      question: 'Do you provide training for new users?',
      answer: 'Yes, we offer onboarding sessions, video tutorials, and documentation to help new users get started. Premium plans include personalized training sessions.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about our platform, services, and processes
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-card">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <SearchBar
              onSearch={setSearchTerm}
              placeholder="Search FAQs..."
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-2">
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
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-card overflow-hidden"
          >
            <button
              onClick={() => toggleItem(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-semibold text-gray-900 pr-4">
                {faq.question}
              </span>
              <ApperIcon
                name={openItems.has(faq.id) ? 'ChevronUp' : 'ChevronDown'}
                className="h-5 w-5 text-gray-500 flex-shrink-0"
              />
            </button>
            {openItems.has(faq.id) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-6 pb-4"
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full p-8 mx-auto mb-6 w-fit">
            <ApperIcon name="Search" className="h-16 w-16 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or browse different categories.
          </p>
        </div>
      )}

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-blue-100">
              Our support team is here to help you get the answers you need.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" icon="MessageCircle">
              Contact Support
            </Button>
            <Button variant="outline" icon="Phone" className="border-white text-white hover:bg-white hover:text-primary">
              Schedule Call
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FAQs;