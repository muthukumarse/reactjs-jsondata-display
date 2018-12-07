/*
 * Products Messages
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Products';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'All Products',
  },
  products: {
    id: `${scope}.products`,
    defaultMessage: '{totalProducts} Products',
  },
  pageSize: {
    id: `${scope}.pageSize`,
    defaultMessage: '{pageSize} per page',
  },
  previous: {
    id: `${scope}.previous`,
    defaultMessage: 'Previous',
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'Next',
  },
});
