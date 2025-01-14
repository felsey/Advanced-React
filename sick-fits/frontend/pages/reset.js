/* eslint-disable react/prop-types */
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

const ResetPage = ({ query }) => {
  if (!query?.token) {
    return (
      <div>
        <h1>
          You must supply a token. Use the form below to try reseting your
          password again.
        </h1>
        <RequestReset />
      </div>
    );
  }

  return (
    <div>
      <Reset token={query.token} email={query.email} />
    </div>
  );
};

export default ResetPage;
