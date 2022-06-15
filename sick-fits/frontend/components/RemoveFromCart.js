/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const DELETE_CART_ITEM_MUTATION = gql`
  mutation DELETE_CART_ITEM_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
      quantity
      product {
        name
        price
      }
      user {
        name
        email
      }
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: right;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

const RemoveFromCart = ({ cartItemId }) => {
  const [deleteCartItem, { loading, error }] = useMutation(
    DELETE_CART_ITEM_MUTATION,
    {
      variables: {
        id: cartItemId,
      },
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
      update,
      // Adding the code below assumes we'll get this response
      // optimisticResponse: {
      //   deleteCartItem: {
      //     __typename: 'CartItem',
      //     cartItemId,
      //   },
      // },
    }
  );

  const onButtonClick = () => {
    deleteCartItem().catch(console.log(error));
  };

  return (
    <BigButton
      type="button"
      onClick={onButtonClick}
      disabled={loading}
      title="Remove this item from the cart"
    >
      &times;
    </BigButton>
  );
};

export default RemoveFromCart;
