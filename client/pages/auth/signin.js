import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doResquest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await doResquest();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Sign In to Your Account</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors}
        <button className="btn btn-primary mt-1" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default signin;
