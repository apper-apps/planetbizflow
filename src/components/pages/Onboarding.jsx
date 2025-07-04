import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import ApperIcon from '@/components/ApperIcon';
import { startupService } from '@/services/api/startupService';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    founderName: '',
    founderEmail: '',
    founderPhone: '',
    founderExperience: '',
    
    // Business Information
    businessName: '',
    businessType: '',
    businessIdea: '',
    businessStage: '',
    businessLocation: '',
    
    // Preferences
    pitchDeckRequired: false,
    mentorshipRequired: false,
    fundingRequired: false,
    complianceConsent: false,
    dataProcessingConsent: false
  });

  const businessTypes = [
    { value: 'manufacturing', label: 'Greenfield Manufacturing' },
    { value: 'fmcg_distribution', label: 'FMCG Distribution' },
    { value: 'engineering_goods', label: 'Engineering Goods Distribution' },
    { value: 'digital_services', label: 'Digital Entrepreneur' },
    { value: 'other', label: 'Other' }
  ];

  const businessStages = [
    { value: 'idea', label: 'Idea Stage' },
    { value: 'mvp', label: 'MVP Development' },
    { value: 'prototype', label: 'Prototype Ready' },
    { value: 'pilot', label: 'Pilot Testing' },
    { value: 'launch', label: 'Ready to Launch' }
  ];

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Validate required fields
      if (!formData.founderName || !formData.founderEmail || !formData.businessName || !formData.businessType) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (!formData.complianceConsent || !formData.dataProcessingConsent) {
        toast.error('Please accept compliance and data processing consent');
        return;
      }

      const startupData = {
        ...formData,
        status: 'pending',
        onboardingComplete: false,
        registrationDate: new Date().toISOString(),
        nextStep: 'kyc'
      };

      await startupService.create(startupData);
      
      toast.success('Registration submitted successfully! Proceed to KYC verification.');
      navigate('/kyc-center');
    } catch (error) {
      toast.error('Failed to submit registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Founder Name *"
                type="text"
                value={formData.founderName}
                onChange={(e) => handleInputChange('founderName', e.target.value)}
                placeholder="Enter your full name"
                required
              />
              <Input
                label="Email Address *"
                type="email"
                value={formData.founderEmail}
                onChange={(e) => handleInputChange('founderEmail', e.target.value)}
                placeholder="Enter your email"
                required
              />
              <Input
                label="Phone Number *"
                type="tel"
                value={formData.founderPhone}
                onChange={(e) => handleInputChange('founderPhone', e.target.value)}
                placeholder="Enter your phone number"
                required
              />
              <Input
                label="Years of Experience"
                type="number"
                value={formData.founderExperience}
                onChange={(e) => handleInputChange('founderExperience', e.target.value)}
                placeholder="Years of relevant experience"
                min="0"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Information</h2>
              <p className="text-gray-600">Tell us about your startup</p>
            </div>
            
            <div className="space-y-6">
              <Input
                label="Business Name *"
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Enter your business name"
                required
              />
              
              <Select
                label="Business Type *"
                value={formData.businessType}
                onChange={(value) => handleInputChange('businessType', value)}
                options={businessTypes}
                placeholder="Select business type"
                required
              />
              
              <Select
                label="Business Stage *"
                value={formData.businessStage}
                onChange={(value) => handleInputChange('businessStage', value)}
                options={businessStages}
                placeholder="Select current stage"
                required
              />
              
              <Input
                label="Business Location *"
                type="text"
                value={formData.businessLocation}
                onChange={(e) => handleInputChange('businessLocation', e.target.value)}
                placeholder="City, District, Odisha"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Idea Description *
                </label>
                <textarea
                  rows="4"
                  value={formData.businessIdea}
                  onChange={(e) => handleInputChange('businessIdea', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe your business idea, target market, and unique value proposition"
                  required
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Preferences & Requirements</h2>
              <p className="text-gray-600">Select the services you need</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="pitchDeck"
                  checked={formData.pitchDeckRequired}
                  onChange={(e) => handleInputChange('pitchDeckRequired', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="pitchDeck" className="ml-3 flex-1">
                  <div className="font-medium text-gray-900">Pitch Deck Development</div>
                  <div className="text-sm text-gray-600">Get help creating a professional pitch deck</div>
                </label>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="mentorship"
                  checked={formData.mentorshipRequired}
                  onChange={(e) => handleInputChange('mentorshipRequired', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="mentorship" className="ml-3 flex-1">
                  <div className="font-medium text-gray-900">Mentorship Program</div>
                  <div className="text-sm text-gray-600">Connect with experienced entrepreneurs and industry experts</div>
                </label>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="funding"
                  checked={formData.fundingRequired}
                  onChange={(e) => handleInputChange('fundingRequired', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="funding" className="ml-3 flex-1">
                  <div className="font-medium text-gray-900">Funding Support</div>
                  <div className="text-sm text-gray-600">Access to funding opportunities and investor networks</div>
                </label>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Compliance & Consent</h2>
              <p className="text-gray-600">Review and accept our terms</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="compliance"
                  checked={formData.complianceConsent}
                  onChange={(e) => handleInputChange('complianceConsent', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                />
                <label htmlFor="compliance" className="ml-3 flex-1">
                  <div className="font-medium text-gray-900">Compliance Consent *</div>
                  <div className="text-sm text-gray-600">
                    I agree to comply with all applicable laws including Indian IT Act 2000, 
                    GDPR, and Odisha Startup Policy requirements.
                  </div>
                </label>
              </div>
              
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="dataProcessing"
                  checked={formData.dataProcessingConsent}
                  onChange={(e) => handleInputChange('dataProcessingConsent', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                />
                <label htmlFor="dataProcessing" className="ml-3 flex-1">
                  <div className="font-medium text-gray-900">Data Processing Consent *</div>
                  <div className="text-sm text-gray-600">
                    I consent to the processing of my personal and business data for the purposes 
                    of startup registration, KYC verification, and platform services.
                  </div>
                </label>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <ApperIcon name="Info" className="h-5 w-5 text-blue-500 mr-2" />
                <div className="text-sm text-blue-700">
                  <strong>Next Steps:</strong> After registration, you'll need to complete KYC verification 
                  and pay the onboarding fee of ₹6,000 to activate your startup profile.
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-card p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Startup Registration</h1>
            <span className="text-sm text-gray-600">Step {currentStep} of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-startup-blue to-startup-green h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ApperIcon name="ChevronLeft" className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-startup-blue to-startup-green"
            >
              Next
              <ApperIcon name="ChevronRight" className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              loading={loading}
              className="bg-gradient-to-r from-startup-green to-green-600"
            >
              <ApperIcon name="Check" className="h-4 w-4 mr-2" />
              Submit Registration
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Onboarding;