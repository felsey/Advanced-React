import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './DisplayError';
import { perPage } from '../config';

export const ALL_PRODUCTS_META_QUERY = gql`
  query ALL_PRODUCTS_META_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_META_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError />;

  const { count } = data._allProductsMeta;
  const totalPages = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {totalPages}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>Prev</a>
      </Link>
      <p>
        Page {page} of {totalPages}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= totalPages}>Next</a>
      </Link>
    </PaginationStyles>
  );
};
export default Pagination;
