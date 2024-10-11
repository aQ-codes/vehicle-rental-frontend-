import { gql } from '@apollo/client';

export const ADD_CUSTOMER_MUTATION = gql`

mutation AddCustomer($input :AddCustomerInput!){
  addCustomer(input: $input)
}`;