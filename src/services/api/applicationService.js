import startupApplications from '@/services/mockData/startupApplications';

let applications = [...startupApplications];
let nextId = Math.max(...applications.map(app => app.Id)) + 1;

export const applicationService = {
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...applications]);
      }, 200);
    });
  },

  async getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const application = applications.find(app => app.Id === parseInt(id));
        resolve(application ? { ...application } : null);
      }, 200);
    });
  },

  async create(applicationData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newApplication = {
          Id: nextId++,
          ...applicationData,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        applications.push(newApplication);
        resolve({ ...newApplication });
      }, 300);
    });
  },

  async update(id, updateData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = applications.findIndex(app => app.Id === parseInt(id));
        if (index === -1) {
          reject(new Error('Application not found'));
          return;
        }
        
        applications[index] = {
          ...applications[index],
          ...updateData,
          updatedAt: new Date().toISOString()
        };
        
        resolve({ ...applications[index] });
      }, 300);
    });
  },

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = applications.findIndex(app => app.Id === parseInt(id));
        if (index === -1) {
          reject(new Error('Application not found'));
          return;
        }
        
        applications.splice(index, 1);
        resolve({ success: true });
      }, 200);
    });
  }
};