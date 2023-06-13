import { createAction } from '@reduxjs/toolkit';
import { stateName } from './types';

// eslint-disable-next-line import/prefer-default-export
export const logout = createAction(`${stateName}/logout`);
