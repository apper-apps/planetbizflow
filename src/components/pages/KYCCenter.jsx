import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import { kycService } from '@/services/api/kycService';

const KYCCenter = () => {
  const navigate = useNavigate();
  const [kycData, setKycData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({
    panCard: null,
    aadhaarCard: null,
    addressProof: null,
    founderPhoto: null,
    businessPlan: null
  });

  const [formData, setFormData] = useState({
    panNumber: '',
    aadhaarNumber: '',
    businessAddress: '',
    businessPincode: '',
    businessCity: '',
    businessState: 'Odisha'
  });

  const requiredDocuments = [
    { key: 'panCard', label: 'PAN Card', icon: 'CreditCard', required: true },
    { key: 'aadhaarCard', label: 'Aadhaar Card', icon: 'Shield', required: true },
    { key: 'addressProof', label: 'Address Proof', icon: 'MapPin', required: true },
    { key: 'founderPhoto', label: 'Founder Photo', icon: 'User', required: true },
    { key: 'businessPlan', label: 'Business Plan', icon: 'FileText', required: false }
  ];

  useEffect(() => {
    loadKYCData();
  }, []);

  const loadKYCData = async () => {
    try {
      const data = await kycService.getAll();
      setKycData(data);
    } catch (error) {
      toast.error('Failed to load KYC data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (documentType, file) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size must be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, and PDF files are allowed');
      return;
    }

    setSelectedFiles(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      // Validate required documents
      const requiredDocs = requiredDocuments.filter(doc => doc.required);
      const missingDocs = requiredDocs.filter(doc => !selectedFiles[doc.key]);
      
      if (missingDocs.length > 0) {
        toast.error(`Please upload: ${missingDocs.map(d => d.label).join(', ')}`);
        return;
      }

      // Validate form data
      if (!formData.panNumber || !formData.aadhaarNumber || !formData.businessAddress) {
        toast.error('Please fill in all required fields');
        return;
      }

      const kycSubmission = {
        ...formData,
        documents: selectedFiles,
        status: 'pending',
        submissionDate: new Date().toISOString(),
        startupId: 1 // This would come from user context
      };

      await kycService.create(kycSubmission);
      
      toast.success('KYC documents submitted successfully! We will review and update you within 2-3 business days.');
      navigate('/payment-portal');
    } catch (error) {
      toast.error('Failed to submit KYC documents. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderFileUpload = (document) => {
    const file = selectedFiles[document.key];
    
    return (
      <div key={document.key} className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <ApperIcon name={document.icon} className="h-5 w-5 text-gray-500 mr-2" />
            <span className="font-medium text-gray-900">
              {document.label}
              {document.required && <span className="text-red-500 ml-1">*</span>}
            </span>
          </div>
          <span className="text-xs text-gray-500">Max 5MB</span>
        </div>
        
        <div className="kyc-upload-area">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleFileSelect(document.key, e.target.files[0])}
            className="hidden"
            id={`file-${document.key}`}
          />
          <label
            htmlFor={`file-${document.key}`}
            className="cursor-pointer block"
          >
            {file ? (
              <div className="flex items-center justify-center p-4">
                <ApperIcon name="Check" className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-sm text-green-600">{file.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6">
                <ApperIcon name="Upload" className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Click to upload {document.label}</span>
                <span className="text-xs text-gray-500 mt-1">JPEG, PNG, PDF</span>
              </div>
            )}
          </label>
        </div>
      </div>
    );
  };

  if (loading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="bg-white rounded-xl shadow-card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">KYC Verification Center</h1>
            <p className="text-gray-600">Complete your identity verification to proceed</p>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Shield" className="h-6 w-6 text-green-500" />
            <span className="text-sm text-gray-600">Secure & Encrypted</span>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="PAN Number *"
              type="text"
              value={formData.panNumber}
              onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
              placeholder="ABCTY1234D"
              maxLength={10}
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              required
            />
            <Input
              label="Aadhaar Number *"
              type="text"
              value={formData.aadhaarNumber}
              onChange={(e) => handleInputChange('aadhaarNumber', e.target.value.replace(/\D/g, ''))}
              placeholder="1234 5678 9012"
              maxLength={12}
              required
            />
          </div>
        </div>

        {/* Business Address */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Business Address *"
                type="text"
                value={formData.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                placeholder="Complete business address"
                required
              />
            </div>
            <Input
              label="City *"
              type="text"
              value={formData.businessCity}
              onChange={(e) => handleInputChange('businessCity', e.target.value)}
              placeholder="City"
              required
            />
            <Input
              label="Pincode *"
              type="text"
              value={formData.businessPincode}
              onChange={(e) => handleInputChange('businessPincode', e.target.value.replace(/\D/g, ''))}
              placeholder="751001"
              maxLength={6}
              required
            />
          </div>
        </div>

        {/* Document Upload */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requiredDocuments.map(renderFileUpload)}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <ApperIcon name="Lock" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
            <div className="text-sm text-blue-700">
              <strong>Data Security:</strong> All uploaded documents are encrypted and stored securely. 
              Your personal information is protected according to Indian IT Act 2000 and GDPR compliance standards.
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            loading={submitting}
            className="bg-gradient-to-r from-startup-blue to-startup-green"
            disabled={submitting}
          >
            <ApperIcon name="Shield" className="h-4 w-4 mr-2" />
            Submit KYC Documents
          </Button>
        </div>
      </div>

      {/* KYC Status */}
      {kycData.length > 0 && (
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">KYC Status</h2>
          <div className="space-y-4">
            {kycData.map((kyc) => (
              <div key={kyc.Id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    kyc.status === 'approved' ? 'bg-green-500' :
                    kyc.status === 'pending' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">Submission #{kyc.Id}</p>
                    <p className="text-sm text-gray-600">
                      Submitted: {new Date(kyc.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  kyc.status === 'approved' ? 'bg-green-100 text-green-800' :
                  kyc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {kyc.status.charAt(0).toUpperCase() + kyc.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default KYCCenter;