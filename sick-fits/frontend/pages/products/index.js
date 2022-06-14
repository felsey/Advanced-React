import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

const ProductPage = () => {
  const { query } = useRouter();
  const page = parseInt(query.page);

  return (
    <div>
      <Pagination page={page || 1} />{' '}
      {/* if there is no page passed to the query then we'll default to 1 */}
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
};

export default ProductPage;
