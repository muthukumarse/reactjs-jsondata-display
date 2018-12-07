/**
 * Products Saga to get Data from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  productsLoaded,
  productsLoadingError,
} from 'containers/Products/actions';
import { LOAD_PRODUCTS } from './constants';

export function* getProducts() {
  const requestURL = `https://raw.githubusercontent.com/muthukumarse/reactjs-jsondata-display/master/productsData.json`;

  try {
    const products = yield call(request, requestURL);
    yield put(productsLoaded(products));
  } catch (err) {
    yield put(productsLoadingError(err));
  }
}

export default function* getProductsList() {
  yield takeLatest(LOAD_PRODUCTS, getProducts);
}
