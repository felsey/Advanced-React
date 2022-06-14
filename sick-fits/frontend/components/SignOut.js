import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_USER_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOut = () => {
  const [signout] = useMutation(SIGN_OUT_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const onButtonClick = async () => {
    await signout();
  };
  return (
    <button type="button" onClick={onButtonClick}>
      Sign out
    </button>
  );
};

export default SignOut;
