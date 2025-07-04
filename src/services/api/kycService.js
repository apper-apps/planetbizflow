import kycMockData from '@/services/mockData/kyc';

let kycSubmissions = [...kycMockData];
let nextId = Math.max(...kycSubmissions.map(k => k.Id)) + 1;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const kycService = {
  async getAll() {
    await delay(300);
    return [...kycSubmissions];
  },

  async getById(id) {
    await delay(200);
    const kyc = kycSubmissions.find(k => k.Id === parseInt(id));
    return kyc ? { ...kyc } : null;
  },

  async create(kycData) {
    await delay(500);
    const newKyc = {
      ...kycData,
      Id: nextId++,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    kycSubmissions.push(newKyc);
    return { ...newKyc };
  },

  async update(id, kycData) {
    await delay(400);
    const index = kycSubmissions.findIndex(k => k.Id === parseInt(id));
    if (index === -1) {
      throw new Error('KYC submission not found');
    }
    
    kycSubmissions[index] = {
      ...kycSubmissions[index],
      ...kycData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    return { ...kycSubmissions[index] };
  },

  async delete(id) {
    await delay(300);
    const index = kycSubmissions.findIndex(k => k.Id === parseInt(id));
    if (index === -1) {
      throw new Error('KYC submission not found');
    }
    
    const deletedKyc = kycSubmissions[index];
    kycSubmissions.splice(index, 1);
    return { ...deletedKyc };
  }
};