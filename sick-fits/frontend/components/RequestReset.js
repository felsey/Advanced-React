/* eslint-disable react/jsx-props-no-spreading */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from 'react-hook-form';
import DisplayError from './DisplayError';
import Form from './styles/Form';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  const { register, watch, handleSubmit, reset } = useForm();
  const [sendUserPasswordResetLink, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: watch(),
    }
  );

  const onFormSubmit = async () => {
    await sendUserPasswordResetLink();
    reset();
  };

  if (data?.sendUserPasswordResetLink === null) {
    return (
      <Form>
        <p>Success! Check your email for a link.</p>
      </Form>
    );
  }

  return (
    <Form method="POST" onSubmit={handleSubmit(onFormSubmit)}>
      <h2>Reset your password</h2>
      <h5>
        Enter your email below and we'll send you an email to reset your
        password.
      </h5>
      <DisplayError error={error} />
      <fieldset disabled={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            placeholder="Your email address"
            required
            {...register('email')}
          />
        </label>
        <button type="submit">Request reset</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
