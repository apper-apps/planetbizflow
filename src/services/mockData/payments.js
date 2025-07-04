const paymentMockData = [
  {
    Id: 1,
    startupId: 1,
    amount: 6000,
    currency: 'INR',
    method: 'upi',
    status: 'completed',
    description: 'Startup OS Onboarding Fee',
    paymentDate: '2024-01-19T14:30:00Z',
    transactionId: 'TXN1705668600',
    razorpayPaymentId: 'pay_NcwQZc8kv9A3qS',
    razorpayOrderId: 'order_NcwQZc8kv9A3qS',
    invoiceNumber: 'INV-000001',
    breakdown: {
      platformRegistration: 4000,
      kycVerification: 1000,
      complianceSetup: 500,
      serviceTax: 500
    }
  },
  {
    Id: 2,
    startupId: 2,
    amount: 6000,
    currency: 'INR',
    method: 'card',
    status: 'completed',
    description: 'Startup OS Onboarding Fee',
    paymentDate: '2024-01-24T10:15:00Z',
    transactionId: 'TXN1705915200',
    razorpayPaymentId: 'pay_NdxRZd9lw0B4rT',
    razorpayOrderId: 'order_NdxRZd9lw0B4rT',
    invoiceNumber: 'INV-000002',
    breakdown: {
      platformRegistration: 4000,
      kycVerification: 1000,
      complianceSetup: 500,
      serviceTax: 500
    }
  },
  {
    Id: 3,
    startupId: 3,
    amount: 6000,
    currency: 'INR',
    method: 'netbanking',
    status: 'completed',
    description: 'Startup OS Onboarding Fee',
    paymentDate: '2024-01-29T16:45:00Z',
    transactionId: 'TXN1706368800',
    razorpayPaymentId: 'pay_NeySTe0mx1C5uU',
    razorpayOrderId: 'order_NeySTe0mx1C5uU',
    invoiceNumber: 'INV-000003',
    breakdown: {
      platformRegistration: 4000,
      kycVerification: 1000,
      complianceSetup: 500,
      serviceTax: 500
    }
  },
  {
    Id: 4,
    startupId: 4,
    amount: 6000,
    currency: 'INR',
    method: 'upi',
    status: 'pending',
    description: 'Startup OS Onboarding Fee',
    paymentDate: null,
    transactionId: null,
    razorpayPaymentId: null,
    razorpayOrderId: 'order_NfzTUf1ny2D6vV',
    invoiceNumber: null,
    breakdown: {
      platformRegistration: 4000,
      kycVerification: 1000,
      complianceSetup: 500,
      serviceTax: 500
    }
  },
  {
    Id: 5,
    startupId: 5,
    amount: 6000,
    currency: 'INR',
    method: 'wallet',
    status: 'failed',
    description: 'Startup OS Onboarding Fee',
    paymentDate: null,
    transactionId: null,
    razorpayPaymentId: null,
    razorpayOrderId: 'order_Ng0UVg2oz3E7wW',
    invoiceNumber: null,
    failureReason: 'Insufficient wallet balance',
    breakdown: {
      platformRegistration: 4000,
      kycVerification: 1000,
      complianceSetup: 500,
      serviceTax: 500
    }
  }
];

export default paymentMockData;