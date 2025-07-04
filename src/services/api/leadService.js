import leadData from '@/services/mockData/leads.json';

let leads = [...leadData];

export const leadService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 350));
    return [...leads];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return leads.find(l => l.Id === parseInt(id));
  },

  async create(lead) {
    await new Promise(resolve => setTimeout(resolve, 450));
    const newLead = {
      ...lead,
      Id: Math.max(...leads.map(l => l.Id)) + 1
    };
    leads.push(newLead);
    return newLead;
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = leads.findIndex(l => l.Id === parseInt(id));
    if (index !== -1) {
      leads[index] = { ...leads[index], ...updates };
      return leads[index];
    }
    throw new Error('Lead not found');
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = leads.findIndex(l => l.Id === parseInt(id));
    if (index !== -1) {
      leads.splice(index, 1);
      return true;
    }
    throw new Error('Lead not found');
  }
};