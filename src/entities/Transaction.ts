export default interface Transaction {
  id?: string;
  categoryId: string;
  amount: number;
  currencyCode: string;
  date: string;
}
