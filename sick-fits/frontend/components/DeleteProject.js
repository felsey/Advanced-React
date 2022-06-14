import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

// const UPDATE_PRODUCT_MUTATION = gql`
//   mutation UPDATE_PRODUCT_MUTATION($id: ID!, $status: String) {
//     updateProduct(id: $id, data: { status: $status }) {
//       id
//       name
//       status
//     }
//   }
// `;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct)); // this function will remove the data from our cache using this apollo function
};

const DeleteProduct = ({ product, children }) => {
  const { id, name, status } = product;

  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update, // adding this will run an update once the delete product function runs
  });

  // const [updateProduct, { data, loading, error }] = useMutation(
  //   UPDATE_PRODUCT_MUTATION
  // );

  const onButtonClick = () => {
    if (
      confirm('Are you sure you want to delete this item?') &&
      confirm('Are you really, really sure?')
    ) {
      deleteProduct().catch((error) => error.message);
      // This code is to change the products status to DRAFT instead of deleting it
      //     updateProduct({
      //       variables: {
      //         id,
      //         status: 'DRAFT',
      //       },
      //     }).catch(console.log(error));
    }
  };

  return (
    <button type="button" disabled={loading} onClick={onButtonClick}>
      {children}
    </button>
  );
};

export default DeleteProduct;
