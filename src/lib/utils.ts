import { type ConnectedEthereumWallet, type PrivyUser } from '@privy-io/expo';
import { Linking } from 'react-native';
import type { StoreApi, UseBoundStore } from 'zustand';

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const getWalletAddress = (user: PrivyUser | null) => {
  if (!user) return undefined;
  return user?.linked_accounts.filter(
    (accounts) => accounts.type === 'wallet'
  )[0].address;
};

export const sliceAddress = (address?: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const roundToFirstDecimal = (value: number) => {
  if (value >= 1) {
    return value.toFixed(1);
  }
  if (!value) return '0';
  const decimalPlaces = 1 - Math.floor(Math.log10(value));
  return value.toFixed(decimalPlaces);
};

export const sendTransaction = async (
  wallet: ConnectedEthereumWallet,
  data: any
) => {
  const provider = await wallet.getProvider();
  const accounts = await provider.request({
    method: 'eth_requestAccounts',
  });

  console.log(data.value, typeof data.value);

  // Send transaction (will be signed and populated)
  await provider.request({
    method: 'eth_sendTransaction',
    params: [
      {
        to: data.to,
        value: data.value === '0' ? 0 : data.value,
        data: data.data,
        from: accounts[0],
      },
    ],
  });
};
