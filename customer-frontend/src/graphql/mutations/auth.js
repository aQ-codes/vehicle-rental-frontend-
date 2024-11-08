// src/graphql/mutations/customer.ts
import { gql } from '@apollo/client';

export const LOGIN_CUSTOMER_MUTATION = gql`
  mutation LoginCustomer($email: String!, $password: String!) {
    loginCustomer(email: $email, password: $password) {
      success
      errors
      id
    }
  }
`;
