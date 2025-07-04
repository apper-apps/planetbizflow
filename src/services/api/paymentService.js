import paymentMockData from '@/services/mockData/payments';

let payments = [...paymentMockData];
let nextId = Math.max(...payments.map(p => p.Id)) + 1;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const paymentService = {
  async getAll() {
    await delay(300);
    return [...payments];
  },

  async getById(id) {
    await delay(200);
    const payment = payments.find(p => p.Id === parseInt(id));
    return payment ? { ...payment } : null;
  },

  async create(paymentData) {
    await delay(400);
    const newPayment = {
      ...paymentData,
      Id: nextId++,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    payments.push(newPayment);
    return { ...newPayment };
  },

  async update(id, paymentData) {
    await delay(350);
    const index = payments.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Payment not found');
    }
    
    payments[index] = {
      ...payments[index],
      ...paymentData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    return { ...payments[index] };
  },

  async delete(id) {
    await delay(300);
    const index = payments.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Payment not found');
    }
    
    const deletedPayment = payments[index];
    payments.splice(index, 1);
    return { ...deletedPayment };
  }
};