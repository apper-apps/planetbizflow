import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for early-stage startups getting started',
      price: {
        monthly: 999,
        annually: 9990
      },
      originalPrice: {
        monthly: 1499,
        annually: 14990
      },
      features: [
        'Basic business registration',
        'Standard KYC verification',
        'Payment processing (up to ₹1L/month)',
        'Basic financial tracking',
        'Email support',
        'Knowledge base access',
        'Standard compliance monitoring'
      ],
      limitations: [
        'Up to 3 team members',
        'Basic reporting only',
        'No custom integrations'
      ],
      popular: false,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'growth',
      name: 'Growth',
      description: 'Ideal for scaling startups with growing operations',
      price: {
        monthly: 2499,
        annually: 24990
      },
      originalPrice: {
        monthly: 3499,
        annually: 34990
      },
      features: [
        'Everything in Starter',
        'Priority KYC processing',
        'Advanced payment processing (up to ₹10L/month)',
        'Comprehensive financial management',
        'Sales pipeline management',
        'Task & project management',
        'Priority email & chat support',
        'Advanced compliance tools',
        'Custom reporting',
        'API access'
      ],
      limitations: [
        'Up to 10 team members',
        'Standard integrations only'
      ],
      popular: true,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Complete solution for established businesses',
      price: {
        monthly: 4999,
        annually: 49990
      },
      originalPrice: {
        monthly: 6999,
        annually: 69990
      },
      features: [
        'Everything in Growth',
        'Unlimited payment processing',
        'Advanced procurement management',
        'Credit & invoice management',
        'Multi-location support',
        'Custom workflows',
        'Dedicated account manager',
        'Phone support',
        'Custom integrations',
        'Advanced security features',
        'Compliance automation',
        'White-label options'
      ],
      limitations: [
        'Custom pricing for 50+ users'
      ],
      popular: false,
      color: 'from-purple-500 to-violet-600'
    }
  ];

  const addOns = [
    {
      name: 'Additional Users',
      description: 'Extra team members beyond plan limits',
      price: 199,
      unit: 'per user/month'
    },
    {
      name: 'Premium Support',
      description: '24/7 priority support with dedicated manager',
      price: 999,
      unit: 'per month'
    },
    {
      name: 'Custom Integration',
      description: 'Bespoke integration with your existing tools',
      price: 9999,
      unit: 'one-time setup'
    },
    {
      name: 'Advanced Analytics',
      description: 'Enhanced reporting and business intelligence',
      price: 1499,
      unit: 'per month'
    }
  ];

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, and bank transfers. All payments are processed securely.'
    },
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No setup fees for standard plans. Custom integrations and enterprise features may have one-time setup costs.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for annual plans. Monthly plans can be cancelled anytime.'
    }
  ];

  const getDiscountPercentage = (original, discounted) => {
    return Math.round(((original - discounted) / original) * 100);
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
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Choose the perfect plan for your startup's growth stage. All plans include our core features with no hidden fees.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-8">
          <span className={`mr-4 ${billingPeriod === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annually' : 'monthly')}
            className="relative w-16 h-8 bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <div className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 top-1 ${
              billingPeriod === 'annually' ? 'translate-x-9' : 'translate-x-1'
            }`} />
          </button>
          <span className={`ml-4 ${billingPeriod === 'annually' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Annually
          </span>
          {billingPeriod === 'annually' && (
            <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
              Save 20%
            </span>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ${
              plan.popular ? 'ring-2 ring-primary transform scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-8">
              <div className={`bg-gradient-to-r ${plan.color} rounded-lg p-4 mb-6 w-fit`}>
                <ApperIcon name="Package" className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{plan.price[billingPeriod].toLocaleString()}
                  </span>
                  <span className="text-gray-500 ml-2">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-lg text-gray-400 line-through">
                    ₹{plan.originalPrice[billingPeriod].toLocaleString()}
                  </span>
                  <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    {getDiscountPercentage(plan.originalPrice[billingPeriod], plan.price[billingPeriod])}% OFF
                  </span>
                </div>
              </div>

              <Button 
                variant={plan.popular ? 'primary' : 'outline'} 
                className="w-full mb-8"
                size="lg"
              >
                Get Started
                <ApperIcon name="ArrowRight" className="h-4 w-4 ml-2" />
              </Button>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <ApperIcon name="Check" className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 mb-3 mt-6">Limitations:</h4>
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-start">
                        <ApperIcon name="Minus" className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add-ons */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add-ons & Extensions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addOns.map((addon, index) => (
            <motion.div
              key={addon.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{addon.name}</h3>
              <p className="text-gray-600 mb-4">{addon.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">₹{addon.price.toLocaleString()}</span>
                <span className="text-gray-500 text-sm">{addon.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-xl p-8 shadow-card">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Startup?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful startups in Odisha. Start your journey today with our 30-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" icon="Rocket" size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline" icon="MessageCircle" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Pricing;