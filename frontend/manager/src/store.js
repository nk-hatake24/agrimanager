// store.js
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './features/employee/employeSlice';
import budgetReducer from './features/budget/budgetSlice';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    budget: budgetReducer,
  },
 
});
