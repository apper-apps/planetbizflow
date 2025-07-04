const complianceMockData = [
  {
    Id: 1,
    startupId: 1,
    category: 'data-security',
    status: 'compliant',
    lastAuditDate: '2024-01-20T10:00:00Z',
    nextAuditDate: '2024-07-20T10:00:00Z',
    complianceScore: 95,
    requirements: [
      {
        id: 1,
        requirement: 'Data encryption at rest and in transit',
        status: 'compliant',
        completedDate: '2024-01-15T12:00:00Z'
      },
      {
        id: 2,
        requirement: 'Access controls and user authentication',
        status: 'compliant',
        completedDate: '2024-01-15T12:00:00Z'
      },
      {
        id: 3,
        requirement: 'Regular security audits',
        status: 'compliant',
        completedDate: '2024-01-20T10:00:00Z'
      }
    ],
    auditHistory: [
      {
        date: '2024-01-20T10:00:00Z',
        auditor: 'SecureTech Audits',
        result: 'passed',
        score: 95
      }
    ]
  },
  {
    Id: 2,
    startupId: 1,
    category: 'business-compliance',
    status: 'compliant',
    lastAuditDate: '2024-01-18T14:00:00Z',
    nextAuditDate: '2024-12-18T14:00:00Z',
    complianceScore: 88,
    requirements: [
      {
        id: 1,
        requirement: 'Business registration and licensing',
        status: 'compliant',
        completedDate: '2024-01-10T09:00:00Z'
      },
      {
        id: 2,
        requirement: 'GST registration',
        status: 'compliant',
        completedDate: '2024-01-12T11:00:00Z'
      },
      {
        id: 3,
        requirement: 'Employment law compliance',
        status: 'in-progress',
        completedDate: null
      }
    ],
    auditHistory: [
      {
        date: '2024-01-18T14:00:00Z',
        auditor: 'Legal Compliance Corp',
        result: 'passed',
        score: 88
      }
    ]
  },
  {
    Id: 3,
    startupId: 2,
    category: 'startup-policy',
    status: 'compliant',
    lastAuditDate: '2024-01-25T16:00:00Z',
    nextAuditDate: '2025-01-25T16:00:00Z',
    complianceScore: 92,
    requirements: [
      {
        id: 1,
        requirement: 'Startup recognition certificate',
        status: 'compliant',
        completedDate: '2024-01-22T10:00:00Z'
      },
      {
        id: 2,
        requirement: 'Odisha Startup Policy compliance',
        status: 'compliant',
        completedDate: '2024-01-25T16:00:00Z'
      }
    ],
    auditHistory: [
      {
        date: '2024-01-25T16:00:00Z',
        auditor: 'Startup Odisha Team',
        result: 'passed',
        score: 92
      }
    ]
  },
  {
    Id: 4,
    startupId: 3,
    category: 'financial-compliance',
    status: 'in-progress',
    lastAuditDate: '2024-01-30T11:00:00Z',
    nextAuditDate: '2024-06-30T11:00:00Z',
    complianceScore: 75,
    requirements: [
      {
        id: 1,
        requirement: 'Financial reporting and auditing',
        status: 'compliant',
        completedDate: '2024-01-28T15:00:00Z'
      },
      {
        id: 2,
        requirement: 'FEMA compliance',
        status: 'in-progress',
        completedDate: null
      },
      {
        id: 3,
        requirement: 'RBI guidelines adherence',
        status: 'pending',
        completedDate: null
      }
    ],
    auditHistory: [
      {
        date: '2024-01-30T11:00:00Z',
        auditor: 'Financial Compliance Associates',
        result: 'conditional',
        score: 75
      }
    ]
  },
  {
    Id: 5,
    startupId: 4,
    category: 'data-security',
    status: 'non-compliant',
    lastAuditDate: '2024-02-03T13:00:00Z',
    nextAuditDate: '2024-03-03T13:00:00Z',
    complianceScore: 45,
    requirements: [
      {
        id: 1,
        requirement: 'Data encryption at rest and in transit',
        status: 'non-compliant',
        completedDate: null
      },
      {
        id: 2,
        requirement: 'Access controls and user authentication',
        status: 'pending',
        completedDate: null
      },
      {
        id: 3,
        requirement: 'Privacy policy implementation',
        status: 'non-compliant',
        completedDate: null
      }
    ],
    auditHistory: [
      {
        date: '2024-02-03T13:00:00Z',
        auditor: 'SecureTech Audits',
        result: 'failed',
        score: 45
      }
    ]
  }
];

export default complianceMockData;