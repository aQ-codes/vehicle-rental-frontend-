import { useMutation } from '@apollo/client';
import { ADD_CUSTOMER_MUTATION } from '@/graphql/mutations/addCustomer';
import { Customer } from '@/models/index'; 

export const useRegisterCustomer = () => {
  const [addCustomer, { loading, error, data }] = useMutation(ADD_CUSTOMER_MUTATION);

  const registerCustomer = async (input: Customer) => { 
      try {
          await addCustomer({ variables: { input } });
          return { data, error: null };
      } catch (err) {
          return { data: null, error: err instanceof Error ? err.message : "An unknown error occurred" };
      }
  };

  return { registerCustomer, loading, error, data };

};

