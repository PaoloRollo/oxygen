import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';

type Response = number[][];
type Variables = { tokenAddress: string }; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useTokenChart = createQuery<Response, Variables, AxiosError>({
  queryKey: ['token-chart'],
  fetcher: async ({ tokenAddress }) => {
    try {
      const response = await client.get(
        `https://api.zerion.io/v1/fungibles/${tokenAddress}/charts/day?currency=usd`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Basic ${process.env.EXPO_PUBLIC_ZERION_API_KEY}`,
          },
        }
      );
      const { data } = response;

      return data.data.attributes.points;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
});
