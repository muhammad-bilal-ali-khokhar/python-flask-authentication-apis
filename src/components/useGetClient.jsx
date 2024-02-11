import { useMemo } from 'react';

export const useGetClient = () => {
  const client = useMemo(() => {
    const userDataString = sessionStorage.getItem('client');
    return JSON.parse(userDataString);
  }, []);

  return client;
};