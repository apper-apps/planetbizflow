import startupMockData from '@/services/mockData/startups';

let startups = [...startupMockData];
let nextId = Math.max(...startups.map(s => s.Id)) + 1;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const startupService = {
  async getAll() {
    await delay(300);
    return [...startups];
  },

  async getById(id) {
    await delay(200);
    const startup = startups.find(s => s.Id === parseInt(id));
    return startup ? { ...startup } : null;
  },

  async create(startupData) {
    await delay(400);
    const newStartup = {
      ...startupData,
      Id: nextId++,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    startups.push(newStartup);
    return { ...newStartup };
  },

  async update(id, startupData) {
    await delay(350);
    const index = startups.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Startup not found');
    }
    
    startups[index] = {
      ...startups[index],
      ...startupData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    return { ...startups[index] };
  },

  async delete(id) {
    await delay(300);
    const index = startups.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Startup not found');
    }
    
    const deletedStartup = startups[index];
    startups.splice(index, 1);
    return { ...deletedStartup };
  }
};