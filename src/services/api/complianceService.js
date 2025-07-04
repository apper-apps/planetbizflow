import complianceMockData from '@/services/mockData/compliance';

let compliance = [...complianceMockData];
let nextId = Math.max(...compliance.map(c => c.Id)) + 1;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const complianceService = {
  async getAll() {
    await delay(300);
    return [...compliance];
  },

  async getById(id) {
    await delay(200);
    const item = compliance.find(c => c.Id === parseInt(id));
    return item ? { ...item } : null;
  },

  async create(complianceData) {
    await delay(400);
    const newCompliance = {
      ...complianceData,
      Id: nextId++,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    compliance.push(newCompliance);
    return { ...newCompliance };
  },

  async update(id, complianceData) {
    await delay(350);
    const index = compliance.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Compliance record not found');
    }
    
    compliance[index] = {
      ...compliance[index],
      ...complianceData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    return { ...compliance[index] };
  },

  async delete(id) {
    await delay(300);
    const index = compliance.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Compliance record not found');
    }
    
    const deletedCompliance = compliance[index];
    compliance.splice(index, 1);
    return { ...deletedCompliance };
  }
};