import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import { paymentService } from '@/services/api/paymentService';

const PaymentPortal = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');

  const onboardingFee = 6000;
  const paymentMethods = [
    { id: 'upi', label: 'UPI Payment', icon: 'Smartphone', description: 'Pay using any UPI app' },
    { id: 'card', label: 'Credit/Debit Card', icon: 'CreditCard', description: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', label: 'Net Banking', icon: 'Building', description: 'All major banks supported' },
    { id: 'wallet', label: 'Digital Wallet', icon: 'Wallet', description: 'Paytm, PhonePe, Google Pay' }
  ];

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const data = await paymentService.getAll();
      setPayments(data);
    } catch (error) {
      toast.error('Failed to load payment data');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      setProcessing(true);

      // In a real implementation, this would integrate with Razorpay
      const paymentData = {
        amount: onboardingFee,
        currency: 'INR',
        method: selectedPaymentMethod,
        status: 'pending',
        startupId: 1, // This would come from user context
        description: 'Startup OS Onboarding Fee',
        paymentDate: new Date().toISOString()
      };

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment
      paymentData.status = 'completed';
      paymentData.transactionId = `TXN${Date.now()}`;
      paymentData.razorpayPaymentId = `pay_${Math.random().toString(36).substr(2, 9)}`;

      await paymentService.create(paymentData);
      
      toast.success('Payment completed successfully! Your startup profile is now active.');
      navigate('/startup-profile');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const generateInvoice = async (paymentId) => {
    try {
      const payment = payments.find(p => p.Id === paymentId);
      if (!payment) return;

      // Generate invoice (in real implementation, this would create a PDF)
      const invoiceData = {
        invoiceNumber: `INV-${payment.Id.toString().padStart(6, '0')}`,
        date: new Date(payment.paymentDate).toLocaleDateString(),
        amount: payment.amount,
        method: payment.method,
        transactionId: payment.transactionId
      };

      toast.success('Invoice generated successfully!');
      
      // In real implementation, this would download the PDF
      console.log('Invoice data:', invoiceData);
    } catch (error) {
      toast.error('Failed to generate invoice');
    }
  };

  if (loading) return <Loading />;

  const completedPayments = payments.filter(p => p.status === 'completed');
  const hasPendingPayment = payments.some(p => p.status === 'pending');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Payment Form */}
      <div className="bg-white rounded-xl shadow-card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Portal</h1>
            <p className="text-gray-600">Complete your onboarding fee payment</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Onboarding Fee</p>
            <p className="text-2xl font-bold text-gray-900">₹{onboardingFee.toLocaleString()}</p>
          </div>
        </div>

        {!hasPendingPayment && completedPayments.length === 0 ? (
          <div className="space-y-6">
            {/* Payment Amount Breakdown */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Registration</span>
                  <span className="font-medium">₹4,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">KYC Verification</span>
                  <span className="font-medium">₹1,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Compliance Setup</span>
                  <span className="font-medium">₹500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Tax (GST)</span>
                  <span className="font-medium">₹500</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{onboardingFee.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPaymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <ApperIcon name={method.icon} className="h-6 w-6 text-gray-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{method.label}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <ApperIcon name="Shield" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <div className="text-sm text-green-700">
                  <strong>Secure Payment:</strong> All transactions are processed through Razorpay's 
                  secure payment gateway with 256-bit SSL encryption. Your payment information is never stored.
                </div>
              </div>
            </div>

            {/* Pay Now Button */}
            <div className="flex justify-end">
              <Button
                onClick={handlePayment}
                loading={processing}
                className="bg-gradient-to-r from-startup-green to-green-600"
                disabled={processing}
              >
                <ApperIcon name="CreditCard" className="h-4 w-4 mr-2" />
                Pay Now - ₹{onboardingFee.toLocaleString()}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <ApperIcon name="CheckCircle" className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Completed!</h2>
            <p className="text-gray-600">Your startup profile is now active and ready to use.</p>
          </div>
        )}
      </div>

      {/* Payment History */}
      {completedPayments.length > 0 && (
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
          <div className="space-y-4">
            {completedPayments.map((payment) => (
              <div key={payment.Id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="payment-status-completed w-3 h-3 rounded-full mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Payment #{payment.Id} - ₹{payment.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(payment.paymentDate).toLocaleDateString()} • {payment.method.toUpperCase()}
                    </p>
                    {payment.transactionId && (
                      <p className="text-xs text-gray-500">Transaction ID: {payment.transactionId}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                  <Button
                    onClick={() => generateInvoice(payment.Id)}
                    variant="outline"
                    size="sm"
                  >
                    <ApperIcon name="Download" className="h-4 w-4 mr-1" />
                    Invoice
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Support */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <ApperIcon name="Phone" className="h-6 w-6 text-blue-500 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Phone Support</p>
              <p className="text-sm text-gray-600">+91 1800-XXX-XXXX</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <ApperIcon name="Mail" className="h-6 w-6 text-green-500 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Email Support</p>
              <p className="text-sm text-gray-600">support@startupos.odisha.gov.in</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentPortal;