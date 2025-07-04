import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Terms = () => {
  const lastUpdated = 'December 15, 2024';

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using the Startup OS Odisha platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      title: 'Description of Service',
      content: 'Startup OS Odisha provides a comprehensive business management platform designed specifically for startups in Odisha. Our services include business registration assistance, KYC verification, compliance management, financial tracking, payment processing, and various business tools and resources.'
    },
    {
      title: 'User Accounts and Registration',
      content: [
        'You must provide accurate, current, and complete information during registration.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You must notify us immediately of any unauthorized use of your account.',
        'We reserve the right to suspend or terminate accounts that violate these terms.',
        'One person or entity may not maintain multiple accounts.'
      ]
    },
    {
      title: 'Acceptable Use Policy',
      content: [
        'Use the platform only for lawful purposes and in accordance with these Terms.',
        'Do not use the service to transmit or store illegal, harmful, or offensive content.',
        'Do not attempt to gain unauthorized access to any part of the platform.',
        'Do not interfere with or disrupt the platform or servers connected to it.',
        'Do not use the platform to compete with our business or develop a competing service.'
      ]
    },
    {
      title: 'Business Information and KYC',
      content: [
        'You agree to provide accurate and complete business information for verification.',
        'All documents submitted for KYC must be genuine and legally valid.',
        'You authorize us to verify information with relevant government agencies.',
        'False information may result in account termination and legal action.',
        'You must update information promptly when changes occur.'
      ]
    },
    {
      title: 'Payment Terms',
      content: [
        'Subscription fees are charged in advance on a monthly or annual basis.',
        'All fees are non-refundable except as expressly stated in our refund policy.',
        'You authorize us to charge your payment method for all applicable fees.',
        'Price changes will be communicated 30 days in advance.',
        'Accounts may be suspended for non-payment after a grace period.'
      ]
    },
    {
      title: 'Data and Privacy',
      content: [
        'Your use of the platform is subject to our Privacy Policy.',
        'You retain ownership of your business data and content.',
        'We may use aggregated, anonymized data for analytics and improvements.',
        'You are responsible for backing up your important data.',
        'We implement security measures but cannot guarantee absolute security.'
      ]
    },
    {
      title: 'Intellectual Property',
      content: [
        'The platform and its content are protected by intellectual property laws.',
        'You are granted a limited, non-exclusive license to use the platform.',
        'You may not copy, modify, distribute, or reverse engineer our software.',
        'Any feedback or suggestions you provide may be used by us without compensation.',
        'You retain rights to your own content and data.'
      ]
    },
    {
      title: 'Service Availability',
      content: [
        'We strive to maintain high availability but do not guarantee uninterrupted service.',
        'Scheduled maintenance will be communicated in advance when possible.',
        'We are not liable for service interruptions beyond our reasonable control.',
        'Service levels may vary based on your subscription plan.',
        'We reserve the right to modify or discontinue features with notice.'
      ]
    },
    {
      title: 'Limitation of Liability',
      content: [
        'Our liability is limited to the amount paid by you in the preceding 12 months.',
        'We are not liable for indirect, incidental, or consequential damages.',
        'You use the platform at your own risk.',
        'We do not warrant that the platform will meet all your requirements.',
        'Some jurisdictions do not allow limitation of liability, so limits may not apply.'
      ]
    },
    {
      title: 'Indemnification',
      content: 'You agree to indemnify and hold harmless Startup OS Odisha from any claims, damages, losses, or expenses arising from your use of the platform, violation of these terms, or infringement of any rights of another party.'
    },
    {
      title: 'Termination',
      content: [
        'Either party may terminate the agreement with 30 days written notice.',
        'We may terminate immediately for material breach of these terms.',
        'Upon termination, your access to the platform will be discontinued.',
        'You may export your data within 30 days of termination.',
        'Termination does not relieve you of payment obligations for services already provided.'
      ]
    },
    {
      title: 'Governing Law',
      content: 'These Terms are governed by the laws of India. Any disputes will be resolved in the courts of Bhubaneswar, Odisha. If any provision is found unenforceable, the remainder of the terms will remain in effect.'
    },
    {
      title: 'Changes to Terms',
      content: 'We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the platform constitutes acceptance of the modified terms. We will notify users of material changes via email or platform notifications.'
    }
  ];

  const keyTerms = [
    {
      term: 'Platform',
      definition: 'The Startup OS Odisha web application and all related services'
    },
    {
      term: 'User/You',
      definition: 'Any individual or entity that creates an account and uses our services'
    },
    {
      term: 'Content',
      definition: 'Any data, information, or materials uploaded or created on the platform'
    },
    {
      term: 'Services',
      definition: 'All features, tools, and functionality provided through the platform'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-lg text-gray-600 mb-2">
          Please read these terms carefully before using our platform and services.
        </p>
        <p className="text-sm text-gray-500">
          Last updated: {lastUpdated}
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">Agreement Overview</h2>
        <p className="text-blue-800">
          These Terms of Service ("Terms") govern your use of the Startup OS Odisha platform operated by the Government of Odisha in partnership with authorized service providers. By using our platform, you agree to comply with and be bound by these terms.
        </p>
      </div>

      {/* Key Terms */}
      <div className="bg-white rounded-xl p-8 shadow-card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-2 mr-4">
            <ApperIcon name="BookOpen" className="h-6 w-6 text-white" />
          </div>
          Key Definitions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyTerms.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{item.term}</h3>
              <p className="text-gray-700 text-sm">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Terms Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl p-8 shadow-card"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                {index + 1}
              </span>
              {section.title}
            </h2>
            
            {Array.isArray(section.content) ? (
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <ApperIcon name="Check" className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
          <p className="text-blue-100 mb-8">
            If you have any questions about these Terms of Service, please contact our legal team.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <ApperIcon name="Mail" className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">legal@startupos-odisha.in</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <ApperIcon name="Phone" className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">+91-674-XXXXXX</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <ApperIcon name="MapPin" className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">Bhubaneswar, Odisha</p>
            </div>
          </div>
          
          <Button variant="secondary" icon="MessageCircle">
            Contact Legal Team
          </Button>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
        <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center">
          <ApperIcon name="Shield" className="h-5 w-5 mr-2" />
          Regulatory Compliance
        </h3>
        <p className="text-green-800">
          These terms are designed to comply with Indian law, including the Information Technology Act, 2000, and other applicable regulations. We are committed to maintaining the highest standards of legal and regulatory compliance for all our services.
        </p>
      </div>
    </motion.div>
  );
};

export default Terms;