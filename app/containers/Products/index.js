/*
 * Products
 */

import React from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Pagination from 'react-js-pagination';

import messages from './messages';
import { makeGetProducts } from './selectors';
import { loadProducts } from './actions';
import reducer from './reducer';
import saga from './saga';
import './styles.css';

export class Products extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activePage: 1,
      pageSize: 10,
      productStartIndex: 0,
      productEndIndex: 9,
    };
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  onPageChange = activePage => {
    const { pageSize } = this.state;
    const productStartIndex = pageSize * (activePage - 1);
    const productEndIndex = pageSize * activePage - 1;
    this.setState({
      activePage,
      productStartIndex,
      productEndIndex,
    });
    // console.log('activePage', activePage);
  };

  onPageSizeChange = evnt => {
    const { activePage } = this.state;
    const pageSize = evnt.target.value;
    const productStartIndex = pageSize * (activePage - 1);
    const productEndIndex = pageSize * activePage - 1;
    this.setState({
      pageSize,
      activePage: 1,
      productStartIndex,
      productEndIndex,
    });
    // console.log('pageSize', evnt.target.value);
  };

  render() {
    // console.log(this.props.productsState.products.length)
    const {
      productsState: { products, totalProducts },
      intl: { formatMessage },
    } = this.props;
    const {
      activePage,
      pageSize,
      productStartIndex,
      productEndIndex,
    } = this.state;

    if (totalProducts === 0) return <div id="loading">Loading ...</div>;

    const productList = products.slice(productStartIndex, productEndIndex + 1);
    // console.log(productStartIndex, productEndIndex);

    return (
      <div style={{ padding: '1em' }}>
        <div className="products-section">
          <h3>
            <FormattedMessage {...messages.header} />
          </h3>
          <div className="product-head-block">
            <div className="product-head-block-section">
              {formatMessage(messages.products, { totalProducts })}
            </div>
            <div className="product-head-block-section product-head-block-section-right">
              <select id="pageSize" onChange={this.onPageSizeChange}>
                <option value="10">
                  {formatMessage(messages.pageSize, { pageSize: 10 })}
                </option>
                <option value="25">
                  {formatMessage(messages.pageSize, { pageSize: 25 })}
                </option>
                <option value="50">
                  {formatMessage(messages.pageSize, { pageSize: 50 })}
                </option>
                <option value="100">
                  {formatMessage(messages.pageSize, { pageSize: 100 })}
                </option>
              </select>
            </div>
          </div>
          <div className="product-blocks">
            {productList.map(product => (
              <div className="product" key={product.id}>
                <div className="product-image">
                  <img
                    src={product.product_image}
                    alt={product.description}
                    width="200"
                    height="200"
                  />
                </div>
                <div className="product-title">{product.product_name}</div>
                <div className="product-desc">{product.description}</div>
                <div className="product-price">{product.price}</div>
              </div>
            ))}
          </div>
          <div className="pagination-section">
            <Pagination
              hideFirstLastPages
              pageRangeDisplayed={10}
              activePage={activePage}
              itemsCountPerPage={pageSize}
              totalItemsCount={totalProducts}
              onChange={this.onPageChange}
              prevPageText="Previous Page"
              nextPageText="Next Page"
            />
          </div>
        </div>
      </div>
    );
  }
}

Products.propTypes = {
  intl: intlShape,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadProducts: () => dispatch(loadProducts()),
  };
}

const mapStateToProps = createStructuredSelector({
  productsState: makeGetProducts(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'products', reducer });
const withSaga = injectSaga({ key: 'products', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(Products));
