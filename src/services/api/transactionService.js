import transactionData from '@/services/mockData/transactions.json';

let transactions = [...transactionData];

export const transactionService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...transactions];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return transactions.find(t => t.Id === parseInt(id));
  },

  async create(transaction) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newTransaction = {
      ...transaction,
      Id: Math.max(...transactions.map(t => t.Id)) + 1
    };
    transactions.push(newTransaction);
    return newTransaction;
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = transactions.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      transactions[index] = { ...transactions[index], ...updates };
      return transactions[index];
    }
    throw new Error('Transaction not found');
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = transactions.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      transactions.splice(index, 1);
      return true;
    }
    throw new Error('Transaction not found');
  }
};