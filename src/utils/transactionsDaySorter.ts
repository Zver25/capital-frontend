import Transaction from '../entities/Transaction';

const transactionsDaySorter = (a: Transaction, b: Transaction): number => (
  a.date.localeCompare(b.date)
);

export default transactionsDaySorter;
