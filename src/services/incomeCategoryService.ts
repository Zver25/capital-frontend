import axiosInstance from './axiosInstance';
import CategoryService from './CategoryService';

const incomeCategoryService = new CategoryService(axiosInstance, '/api/income-categories');

export default incomeCategoryService;
