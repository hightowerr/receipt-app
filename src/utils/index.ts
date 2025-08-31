// Utility functions for Receipt Scanner App

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const parseReceiptText = (text: string) => {
  // TODO: Implement receipt text parsing logic
  return {
    merchantName: '',
    total: 0,
    date: new Date(),
    items: [],
  };
};
