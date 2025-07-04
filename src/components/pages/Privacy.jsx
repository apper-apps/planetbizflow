import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Privacy = () => {
  const lastUpdated = 'December 15, 2024';

  const sections = [
    {
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us. This may include your name, email address, phone number, business information, and payment details.'
        },
        {
          subtitle: 'Business Information',
          text: 'For startup onboarding and compliance purposes, we collect business registration details, financial information, KYC documents, and other regulatory documentation required for platform services.'
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect information about your use of our platform, including IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of visits.'
        }
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Provision',
          text: 'To provide, maintain, and improve our services, process transactions, send receipts, and provide customer support.'
        },
        {
          subtitle: 'Communication',
          text: 'To communicate with you about services, updates, security alerts, and administrative messages.'
        },
        {
          subtitle: 'Compliance',
          text: 'To comply with legal obligations, regulatory requirements, and government requests in accordance with Indian law.'
        },
        {
          subtitle: 'Analytics',
          text: 'To analyze usage patterns, improve user experience, and develop new features and services.'
        }
      ]
    },
    {
      title: 'Information Sharing',
      content: [
        {
          subtitle: 'Service Providers',
          text: 'We may share information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, and customer support.'
        },
        {
          subtitle: 'Government Agencies',
          text: 'We may share information with government agencies and regulatory bodies as required for startup registration, compliance monitoring, and regulatory reporting.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information if required by law, court order, or government request, or to protect our rights, privacy, safety, or property.'
        },
        {
          subtitle: 'Business Transfers',
          text: 'Information may be transferred in connection with a merger, acquisition, or sale of all or part of our business.'
        }
      ]
    },
    {
      title: 'Data Security',
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          subtitle: 'Encryption',
          text: 'Sensitive information is encrypted in transit and at rest using industry-standard encryption protocols.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We limit access to personal information to employees and contractors who need it to perform their job functions.'
        }
      ]
    },
    {
      title: 'Your Rights',
      content: [
        {
          subtitle: 'Access and Correction',
          text: 'You have the right to access, update, or correct your personal information through your account settings or by contacting us.'
        },
        {
          subtitle: 'Data Portability',
          text: 'You can request a copy of your data in a structured, machine-readable format.'
        },
        {
          subtitle: 'Deletion',
          text: 'You can request deletion of your personal information, subject to legal and regulatory retention requirements.'
        },
        {
          subtitle: 'Opt-out',
          text: 'You can opt out of promotional communications by following the unsubscribe instructions in emails or contacting us directly.'
        }
      ]
    },
    {
      title: 'Cookies and Tracking',
      content: [
        {
          subtitle: 'Cookie Usage',
          text: 'We use cookies and similar technologies to enhance user experience, analyze usage patterns, and provide personalized content.'
        },
        {
          subtitle: 'Cookie Control',
          text: 'You can control cookie settings through your browser preferences, though disabling cookies may affect platform functionality.'
        },
        {
          subtitle: 'Analytics',
          text: 'We use analytics services to understand how users interact with our platform and improve our services.'
        }
      ]
    },
    {
      title: 'Data Retention',
      content: [
        {
          subtitle: 'Retention Period',
          text: 'We retain personal information for as long as necessary to provide services, comply with legal obligations, and resolve disputes.'
        },
        {
          subtitle: 'Business Records',
          text: 'Business and financial records may be retained for longer periods as required by regulatory and tax obligations.'
        },
        {
          subtitle: 'Deletion',
          text: 'When information is no longer needed, we securely delete or anonymize it in accordance with our data retention policies.'
        }
      ]
    },
    {
      title: 'International Transfers',
      content: [
        {
          subtitle: 'Data Location',
          text: 'Your information is primarily stored and processed in India. We may transfer data to other countries for service provision.'
        },
        {
          subtitle: 'Safeguards',
          text: 'When transferring data internationally, we ensure appropriate safeguards are in place to protect your information.'
        }
      ]
    }
  ];

  const contactInfo = [
    {
      method: 'Email',
      value: 'privacy@startupos-odisha.in',
      icon: 'Mail'
    },
    {
      method: 'Phone',
      value: '+91-674-XXXXXX',
      icon: 'Phone'
    },
    {
      method: 'Address',
      value: 'Startup OS Office, Technology Park, Bhubaneswar, Odisha 751024',
      icon: 'MapPin'
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600 mb-2">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>
        <p className="text-sm text-gray-500">
          Last updated: {lastUpdated}
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">Introduction</h2>
        <p className="text-blue-800">
          Startup OS Odisha ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services. By using our services, you consent to the practices described in this policy.
        </p>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-8 shadow-card"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-2 mr-4">
                <ApperIcon name="Shield" className="h-6 w-6 text-white" />
              </div>
              {section.title}
            </h2>
            
            <div className="space-y-6">
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.subtitle}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us About Privacy</h2>
        <p className="text-blue-100 mb-8 text-center">
          If you have questions about this Privacy Policy or our privacy practices, please contact us:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={contact.method}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 rounded-lg p-6 text-center"
            >
              <div className="bg-white/20 rounded-full p-3 mx-auto mb-4 w-fit">
                <ApperIcon name={contact.icon} className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{contact.method}</h3>
              <p className="text-blue-100 text-sm">{contact.value}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="secondary" icon="MessageCircle">
            Contact Privacy Team
          </Button>
        </div>
      </div>

      {/* Updates Notice */}
      <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
        <h3 className="text-lg font-semibold text-yellow-900 mb-2 flex items-center">
          <ApperIcon name="AlertTriangle" className="h-5 w-5 mr-2" />
          Policy Updates
        </h3>
        <p className="text-yellow-800">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
        </p>
      </div>
    </motion.div>
  );
};

export default Privacy;