import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from 'react-hook-form';
import Link from 'next/dist/client/link';
import DisplayError from './DisplayError';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
      email
      name
    }
  }
`;

const SignUp = () => {
  const { register, watch, handleSubmit, reset } = useForm();
  const [createUser, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: watch(),
  });

  const onFormSubmit = async (data) => {
    const response = await createUser().catch(console.error);
    console.log('user created!');
    reset();
  };

  if (data?.createUser) {
    return (
      <Form>
        <p>
          Signed up with {data.createUser.email}. Please go ahead and sign in!
        </p>
        <div>
          <Link href="/signin">
            <button type="button">Sign in</button>
          </Link>
        </div>
      </Form>
    );
  }

  return (
    <Form method="POST" onSubmit={handleSubmit(onFormSubmit)}>
      <h2>Sign up for an account</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading}>
        <label htmlFor="name">
          Your name
          <input
            type="name"
            placeholder="Name"
            required
            {...register('name')}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            placeholder="Email"
            required
            {...register('email')}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            placeholder="Password"
            required
            {...register('password')}
          />
        </label>
        <button type="submit">Sign up</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
