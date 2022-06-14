import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './DisplayError';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }

      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SignIn = () => {
  const { register, handleSubmit, watch, reset } = useForm();

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: watch(),

    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  const onFormSubmit = async () => {
    await signin().catch(console.error);
    reset();
    Router.push({
      pathname: `/products`,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} method="POST">
      <h2>Sign into your account</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            {...register('email')}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            required
            {...register('password')}
          />
        </label>
        <button type="submit">Sign in</button>
      </fieldset>
    </Form>
  );
};

export default SignIn;
