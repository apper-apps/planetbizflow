import invoiceData from '@/services/mockData/invoices.json';

let invoices = [...invoiceData];

export const invoiceService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 280));
    return [...invoices];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return invoices.find(i => i.Id === parseInt(id));
  },

  async create(invoice) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newInvoice = {
      ...invoice,
      Id: Math.max(...invoices.map(i => i.Id)) + 1
    };
    invoices.push(newInvoice);
    return newInvoice;
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = invoices.findIndex(i => i.Id === parseInt(id));
    if (index !== -1) {
      invoices[index] = { ...invoices[index], ...updates };
      return invoices[index];
    }
    throw new Error('Invoice not found');
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = invoices.findIndex(i => i.Id === parseInt(id));
    if (index !== -1) {
      invoices.splice(index, 1);
      return true;
    }
    throw new Error('Invoice not found');
  }
};