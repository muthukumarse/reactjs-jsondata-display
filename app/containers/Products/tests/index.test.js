/**
 * Test the Products
 */

import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { Products, mapDispatchToProps } from '../index';
import { loadProducts } from '../actions';

describe('<Products />', () => {
  const props = {
    loadProducts: jest.fn(),
    productsState: {
      products: {},
      totalProducts: 0,
      error: false,
      errorDesc: '',
    },
    // this need to be set for dummy otherwise we need to write custom Intl to shallow and mount
    intl: {
      formatMessage: jest.fn(),
      formatDate: jest.fn(),
      formatTime: jest.fn(),
      formatRelative: jest.fn(),
      formatNumber: jest.fn(),
      formatPlural: jest.fn(),
      formatHTMLMessage: jest.fn(),
      now: jest.fn(),
    },
  };
  it('should render default', () => {
    const renderedComponent = shallow(
      <IntlProvider locale="en">
        <Products />
      </IntlProvider>,
    );
    expect(renderedComponent.find('Header').length).not.toBe(1);
  });

  it('should render fetch the products', () => {
    const renderedComponent = shallow(
      <IntlProvider locale="en">
        <Products {...props} />
      </IntlProvider>,
    ).shallow();
    expect(
      renderedComponent.contains(<div id="loading">Loading ...</div>),
    ).toBe(true);

    const productsState = {
      products: [
        {
          id: 1,
          price: '$87.68',
          product_name: 'Amitriptyline Hydrochloride',
          description: 'synergize efficient metrics',
          product_image: 'http://dummyimage.com/307x328.bmp/ff4444/ffffff',
        },
      ],
      totalProducts: 1,
      error: false,
      errorDesc: '',
    };
    renderedComponent.setProps({ productsState });

    renderedComponent
      .find('.pagination-section a')
      .props()
      .onChange();
    renderedComponent
      .find('#pageSize')
      .props()
      .onChange({
        target: { value: 10 },
      });
  });

  describe('mapDispatchToProps', () => {
    describe('loadProducts', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.loadProducts).toBeDefined();
      });
    });

    describe('loadProducts', () => {
      it('should dispatch loadProducts when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.loadProducts();
        expect(dispatch).toHaveBeenCalledWith(loadProducts());
      });
    });
  });
});
