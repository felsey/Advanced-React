import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import DisplayError from './DisplayError';
import Form from './styles/Form';
import useForm from '../lib/useForm';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      price
      # photo {}
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading }, // this just renames the desctructured variables
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateProduct({
      variables: {
        id,
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
      },
    }).catch(console.error);
    console.log(response);
  };

  return (
    <div>
      <Form onSubmit={onHandleSubmit}>
        <DisplayError error={error || updateError} />
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
          <label htmlFor="name">
            Name
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              required
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              value={inputs.price}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              required
              id="description"
              name="description"
              placeholder="Description"
              value={inputs.description}
              onChange={handleChange}
            />
          </label>
          <button type="submit">+ Update Product</button>
          <button type="button" onClick={clearForm}>
            Clear form
          </button>
        </fieldset>
      </Form>
    </div>
  );
};

export default UpdateProduct;
