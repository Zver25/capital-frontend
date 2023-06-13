import axiosInstance from './axiosInstance';
import CategoryService from './CategoryService';

const expenseCategoryService = new CategoryService(axiosInstance, '/api/expense-categories');

export default expenseCategoryService;
