/*
 * Products Reducer
 */
import { fromJS } from 'immutable';

import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  products: {},
  totalProducts: 0,
  error: false,
  errorDesc: '',
});

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return initialState;
    case LOAD_PRODUCTS_SUCCESS: {
      const {
        payload: { products },
      } = action;
      const totalProducts = products.length;
      return state.merge({ products, totalProducts, error: false });
    }
    case LOAD_PRODUCTS_ERROR: {
      const {
        payload: { error },
      } = action;
      return state.merge({
        products: {},
        totalProducts: 0,
        error: true,
        errorDesc: error,
      });
    }
    default:
      return state;
  }
}

export default productsReducer;
