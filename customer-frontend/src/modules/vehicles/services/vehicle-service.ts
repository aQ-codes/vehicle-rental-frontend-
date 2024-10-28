import { useQuery } from "@apollo/client";
import {GET_UNIQUE_MAKES_QUERY} from "@/graphql/queries/vehicle"

// Service to fetch unique makes
export const useGetUniqueMakes = () => {
  const { loading, error, data } = useQuery<{ getUniqueMakes: string[] }>(GET_UNIQUE_MAKES_QUERY);

  const uniqueMakes = data?.getUniqueMakes.map(item => item) || [];

  return { loading, error, uniqueMakes };
};
