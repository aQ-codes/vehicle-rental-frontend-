import { useMutation } from '@apollo/client'; 
import { Customer } from '@/models/index'; 
import { ADD_CUSTOMER_MUTATION } from '@/graphql/mutations/customer'; 

export const useRegisterCustomer = () => {
  const [addCustomer, { data, loading, error }] = useMutation(ADD_CUSTOMER_MUTATION);

  const registerCustomer = async (input: Customer) => {
      await addCustomer({ variables: { input } });
    
  };

  return { registerCustomer, data, loading, error };

};