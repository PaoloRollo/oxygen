import { type Wallet } from '@/api';

export const mockWallet: Wallet = {
  changes: { absolute_1d: -9.78820760739999, percent_1d: -1.0449355757127263 },
  positions_distribution_by_chain: {
    arbitrum: 5.417998683535891,
    base: 777.0656060723464,
    ethereum: 3.4401761353938247,
    linea: 0.06635328423099801,
    optimism: 30.709316469683333,
    polygon: 104.39010552278926,
    scroll: 5.85057,
  },
  positions_distribution_by_type: {
    borrowed: 0,
    deposited: 0,
    locked: 0,
    staked: 0,
    wallet: 926.9401261679795,
  },
  total: { positions: 926.9401261679795 },
};
