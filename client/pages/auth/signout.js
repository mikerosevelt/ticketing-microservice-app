import { Router } from 'next/router';
import { useEffect } from 'react';
import useRequest from '../../hooks/use-request';

const signout = () => {
  const { doResquest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doResquest();
  }, []);
  return <div>signout</div>;
};

export default signout;
