// src/services/login-service.ts
import { useMutation } from '@apollo/client';
import { LOGIN_CUSTOMER_MUTATION } from '@/graphql/mutations/auth';


export const useLoginCustomer = () => {
  const [performLogin, { data, loading, error }] = useMutation(LOGIN_CUSTOMER_MUTATION);

  const login = async (email: string, password: string) => {
      await performLogin({ variables: { email, password } });
  };

  return { performLogin: login, data, loading, error };
};
