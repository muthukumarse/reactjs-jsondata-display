/**
 * Tests for Products sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { LOAD_PRODUCTS } from 'containers/Products/constants';
import { productsLoadingError } from 'containers/Products/actions';

import getProductsList, { getProducts } from '../saga';

describe('getProducts Saga', () => {
  let getProductsGenerator;

  beforeEach(() => {
    getProductsGenerator = getProducts();

    const selectDescriptor = getProductsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getProductsGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should call the error action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getProductsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(productsLoadingError(response)));
  });
});

describe('getProductsList Saga', () => {
  const getProductsListSaga = getProductsList();

  it('should start task to watch for LOAD_PRODUCTS action', () => {
    const takeLatestDescriptor = getProductsListSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_PRODUCTS, getProducts),
    );
  });
});
