import taskData from '@/services/mockData/tasks.json';

let tasks = [...taskData];

export const taskService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 250));
    return [...tasks];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return tasks.find(t => t.Id === parseInt(id));
  },

  async create(task) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const newTask = {
      ...task,
      Id: Math.max(...tasks.map(t => t.Id)) + 1
    };
    tasks.push(newTask);
    return newTask;
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates };
      return tasks[index];
    }
    throw new Error('Task not found');
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      tasks.splice(index, 1);
      return true;
    }
    throw new Error('Task not found');
  }
};