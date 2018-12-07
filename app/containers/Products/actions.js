/*
 * Products Actions
 *
*/

import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR,
} from './constants';

export function loadProducts() {
  return {
    type: LOAD_PRODUCTS,
  };
}

export function productsLoaded(products) {
  return {
    type: LOAD_PRODUCTS_SUCCESS,
    payload: { products },
  };
}

export function productsLoadingError(error) {
  return {
    type: LOAD_PRODUCTS_ERROR,
    payload: { error },
  };
}
