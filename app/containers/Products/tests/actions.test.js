import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR,
} from '../constants';

import { loadProducts, productsLoaded, productsLoadingError } from '../actions';

describe('Product Actions', () => {
  describe('loadProducts', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_PRODUCTS,
      };

      expect(loadProducts({})).toEqual(expectedResult);
    });
  });

  describe('productsLoaded', () => {
    it('should return the correct type and the passed products', () => {
      const products = [
        {
          id: 1,
          price: '$87.68',
          product_name: 'Amitriptyline Hydrochloride',
          description: 'synergize efficient metrics',
          product_image: 'http://dummyimage.com/307x328.bmp/ff4444/ffffff',
        },
      ];
      const expectedResult = {
        type: LOAD_PRODUCTS_SUCCESS,
        payload: { products },
      };

      expect(productsLoaded(products)).toEqual(expectedResult);
    });
  });

  describe('productsLoadingError', () => {
    it('should return the correct type and the error', () => {
      const error = {};
      const expectedResult = {
        type: LOAD_PRODUCTS_ERROR,
        payload: { error },
      };

      expect(productsLoadingError(error)).toEqual(expectedResult);
    });
  });
});
