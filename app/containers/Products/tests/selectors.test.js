import { fromJS } from 'immutable';

import { selectProducts, makeGetProducts } from '../selectors';

describe('selectProducts', () => {
  it('should select the products state', () => {
    const productsState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      products: productsState,
    });
    expect(selectProducts(mockedState)).toEqual(productsState);
  });
});

describe('makeGetProducts', () => {
  const usernameSelector = makeGetProducts();
  it('should select the username', () => {
    const mockedState = fromJS({
      products: {},
    });
    expect(usernameSelector(mockedState)).toEqual({});
  });
});
