import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type Token } from './types';

type Response = Token[];
type Variables = { walletAddress: string | undefined }; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useTokens = createQuery<Response, Variables, AxiosError>({
  queryKey: ['tokens'],
  fetcher: async ({ walletAddress }) => {
    if (!walletAddress) return [];
    try {
      const response = await client.get(
        `https://api.zerion.io/v1/wallets/0xA9bC8A58B39935BA3D8D1Ce4b0d3383153F184E1/positions/?filter[positions]=only_simple&currency=usd&filter[trash]=only_non_trash&sort=value`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Basic ${process.env.EXPO_PUBLIC_ZERION_API_KEY}`,
          },
        }
      );
      const { data } = response;
      return data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
});
