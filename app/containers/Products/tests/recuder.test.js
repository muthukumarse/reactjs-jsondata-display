import { fromJS } from 'immutable';

import productReducer from '../reducer';
import { loadProducts, productsLoaded, productsLoadingError } from '../actions';

describe('productReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      products: {},
      totalProducts: 0,
      error: false,
      errorDesc: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(productReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadProducts action correctly', () => {
    const expectedResult = state;
    expect(productReducer(state, loadProducts())).toEqual(expectedResult);
  });

  it('should handle the productsLoaded action correctly', () => {
    const products = [
      {
        id: 1,
        price: '$87.68',
        product_name: 'Amitriptyline Hydrochloride',
        description: 'synergize efficient metrics',
        product_image: 'http://dummyimage.com/307x328.bmp/ff4444/ffffff',
      },
    ];
    const expectedResult = state.merge({
      products,
      totalProducts: 1,
      error: false,
    });

    expect(productReducer(state, productsLoaded(products))).toEqual(
      expectedResult,
    );
  });

  it('should handle the Error action correctly', () => {
    const error = {};
    const expectedResult = state.merge({
      products: {},
      totalProducts: 0,
      error: true,
      errorDesc: error,
    });

    expect(productReducer(state, productsLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
