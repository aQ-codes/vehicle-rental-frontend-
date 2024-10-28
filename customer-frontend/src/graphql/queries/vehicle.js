import { gql } from "@apollo/client";

// Query to get unique vehicle makes
export const GET_UNIQUE_MAKES_QUERY = gql`
  query GetUniqueMakes {
    getUniqueMakes
  }
`;
