/**
 * Products selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProducts = state => state.get('products', initialState);

const makeGetProducts = () =>
  createSelector(selectProducts, productsState => productsState.toJS());

export { selectProducts, makeGetProducts };
