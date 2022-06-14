/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from 'react-hook-form';
import DisplayError from './DisplayError';
import Form from './styles/Form';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

const Reset = ({ token, email }) => {
  const { register, watch, handleSubmit, reset } = useForm();

  const [resetPassword, { data, loading, error }] = useMutation(
    RESET_MUTATION,
    {
      variables: {
        email: watch().email,
        password: watch().password,
        token,
      },
    }
  );

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  const onFormSubmit = async () => {
    await resetPassword().catch(console.log(error));
    reset();
  };

  if (data?.redeemUserPasswordResetToken === null) {
    return (
      <Form>
        <p>Success! You can now sign in.</p>
      </Form>
    );
  }

  return (
    <Form method="POST" onSubmit={handleSubmit(onFormSubmit)}>
      <h2>Reset your password</h2>
      <DisplayError error={error || successfulError} />
      <fieldset disabled={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            placeholder="Your email address"
            required
            value={email}
            {...register('email')}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            placeholder="Your password"
            required
            {...register('password')}
          />
        </label>
        <button type="submit">Request reset</button>
      </fieldset>
    </Form>
  );
};

export default Reset;
