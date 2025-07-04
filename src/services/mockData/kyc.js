const kycMockData = [
  {
    Id: 1,
    startupId: 1,
    panNumber: 'ABCTY1234D',
    aadhaarNumber: '123456789012',
    businessAddress: 'Plot No. 123, Industrial Area, Bhubaneswar',
    businessCity: 'Bhubaneswar',
    businessPincode: '751024',
    businessState: 'Odisha',
    documents: {
      panCard: 'pan_card_1.pdf',
      aadhaarCard: 'aadhaar_card_1.pdf',
      addressProof: 'address_proof_1.pdf',
      founderPhoto: 'founder_photo_1.jpg',
      businessPlan: 'business_plan_1.pdf'
    },
    status: 'approved',
    submissionDate: '2024-01-16T10:00:00Z',
    reviewDate: '2024-01-18T15:30:00Z',
    reviewComments: 'All documents verified successfully',
    reviewerId: 101
  },
  {
    Id: 2,
    startupId: 2,
    panNumber: 'DEFGH5678E',
    aadhaarNumber: '234567890123',
    businessAddress: 'Shop No. 45, Market Complex, Cuttack',
    businessCity: 'Cuttack',
    businessPincode: '753001',
    businessState: 'Odisha',
    documents: {
      panCard: 'pan_card_2.pdf',
      aadhaarCard: 'aadhaar_card_2.pdf',
      addressProof: 'address_proof_2.pdf',
      founderPhoto: 'founder_photo_2.jpg',
      businessPlan: null
    },
    status: 'approved',
    submissionDate: '2024-01-21T11:15:00Z',
    reviewDate: '2024-01-23T10:45:00Z',
    reviewComments: 'Documents verified, business plan not required',
    reviewerId: 102
  },
  {
    Id: 3,
    startupId: 3,
    panNumber: 'IJKLM9012F',
    aadhaarNumber: '345678901234',
    businessAddress: 'Unit 78, Industrial Estate, Rourkela',
    businessCity: 'Rourkela',
    businessPincode: '769001',
    businessState: 'Odisha',
    documents: {
      panCard: 'pan_card_3.pdf',
      aadhaarCard: 'aadhaar_card_3.pdf',
      addressProof: 'address_proof_3.pdf',
      founderPhoto: 'founder_photo_3.jpg',
      businessPlan: 'business_plan_3.pdf'
    },
    status: 'approved',
    submissionDate: '2024-01-26T14:20:00Z',
    reviewDate: '2024-01-28T12:15:00Z',
    reviewComments: 'All documents verified, excellent business plan',
    reviewerId: 103
  },
  {
    Id: 4,
    startupId: 4,
    panNumber: 'NOPQR3456G',
    aadhaarNumber: '456789012345',
    businessAddress: 'Office 12, Digital Hub, Berhampur',
    businessCity: 'Berhampur',
    businessPincode: '760001',
    businessState: 'Odisha',
    documents: {
      panCard: 'pan_card_4.pdf',
      aadhaarCard: 'aadhaar_card_4.pdf',
      addressProof: 'address_proof_4.pdf',
      founderPhoto: 'founder_photo_4.jpg',
      businessPlan: null
    },
    status: 'pending',
    submissionDate: '2024-02-02T09:30:00Z',
    reviewDate: null,
    reviewComments: null,
    reviewerId: null
  },
  {
    Id: 5,
    startupId: 5,
    panNumber: 'STUVW7890H',
    aadhaarNumber: '567890123456',
    businessAddress: 'Warehouse 56, Agri Zone, Sambalpur',
    businessCity: 'Sambalpur',
    businessPincode: '768001',
    businessState: 'Odisha',
    documents: {
      panCard: 'pan_card_5.pdf',
      aadhaarCard: 'aadhaar_card_5.pdf',
      addressProof: 'address_proof_5.pdf',
      founderPhoto: 'founder_photo_5.jpg',
      businessPlan: 'business_plan_5.pdf'
    },
    status: 'approved',
    submissionDate: '2024-02-06T13:45:00Z',
    reviewDate: '2024-02-08T16:20:00Z',
    reviewComments: 'Documents verified, innovative agri-tech proposal',
    reviewerId: 101
  }
];

export default kycMockData;