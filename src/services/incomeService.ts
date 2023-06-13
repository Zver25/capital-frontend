import axiosInstance from './axiosInstance';
import TransactionService from './TransactionService';

const incomeService = new TransactionService(axiosInstance, '/api/incomes');

export default incomeService;
