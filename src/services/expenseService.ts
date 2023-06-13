import axiosInstance from './axiosInstance';
import TransactionService from './TransactionService';

const expenseService = new TransactionService(axiosInstance, '/api/expenses');

export default expenseService;
