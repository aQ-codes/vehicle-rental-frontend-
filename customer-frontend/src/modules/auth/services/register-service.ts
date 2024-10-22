import { useMutation } from '@apollo/client'; 
import { Customer } from '@/models/index'; 
import { ADD_CUSTOMER_MUTATION } from '@/graphql/mutations/customer'; 

export const useRegisterCustomer = () => {
  const [addCustomer, { loading, error }] = useMutation(ADD_CUSTOMER_MUTATION);

  const registerCustomer = async (input: Customer) => {
    try {
      // Perform the mutation and get the result
      await addCustomer({ variables: { input } });
    ;
    } catch (err) {
      // Handle the error case
      return { data: null, error: err instanceof Error ? err.message : "An unknown error occurred" };
    }
  };

  return { registerCustomer, loading, error };

};