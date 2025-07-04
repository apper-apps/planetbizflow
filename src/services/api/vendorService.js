import vendorData from '@/services/mockData/vendors.json';

let vendors = [...vendorData];

export const vendorService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 320));
    return [...vendors];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return vendors.find(v => v.Id === parseInt(id));
  },

  async create(vendor) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newVendor = {
      ...vendor,
      Id: Math.max(...vendors.map(v => v.Id)) + 1
    };
    vendors.push(newVendor);
    return newVendor;
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = vendors.findIndex(v => v.Id === parseInt(id));
    if (index !== -1) {
      vendors[index] = { ...vendors[index], ...updates };
      return vendors[index];
    }
    throw new Error('Vendor not found');
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = vendors.findIndex(v => v.Id === parseInt(id));
    if (index !== -1) {
      vendors.splice(index, 1);
      return true;
    }
    throw new Error('Vendor not found');
  }
};