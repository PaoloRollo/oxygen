export type Wallet = {
  positions_distribution_by_type: {
    [key: string]: number;
  };
  positions_distribution_by_chain: {
    [key: string]: number;
  };
  total: {
    positions: number;
  };
  changes: {
    absolute_1d: number;
    percent_1d: number;
  };
};
