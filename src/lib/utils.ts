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

interface ChainIconsMap {
  [key: string]: string;
}

export const chainIcons: ChainIconsMap = {
  // goerli:
  //   "https://github.com/thirdweb-dev/chain-icons/blob/main/png/ethereum/32.png?raw=true",
  /*sepolia:
    "https://github.com/thirdweb-dev/chain-icons/blob/main/png/ethereum/32.png?raw=true",
    */
  'taiko mainnet': 'https://avatars.githubusercontent.com/u/99078433?s=280&v=4',
  holesky:
    'https://github.com/thirdweb-dev/chain-icons/blob/main/png/ethereum/32.png?raw=true',
  'gnosis chiado':
    'https://github.com/thirdweb-dev/chain-icons/blob/main/png/gnosis-gno/32.png?raw=true',
  'linea goerli testnet':
    'https://github.com/thirdweb-dev/chain-icons/blob/main/png/ethereum/32.png?raw=true',
  'optimism goerli':
    'https://github.com/thirdweb-dev/chain-icons/blob/main/png/optimism/32.png?raw=true',
  'polygon mumbai':
    'https://github.com/thirdweb-dev/chain-icons/blob/main/png/polygon/32.png?raw=true',
  gnosis:
    'https://github.com/thirdweb-dev/chain-icons/blob/main/png/gnosis-gno/32.png?raw=true',
  arbitrum:
    'https://github.com/thirdweb-dev/chain-icons/blob/main/png/arbitrum/32.png?raw=true',
  'arbitrum one':
    'https://github.com/thirdweb-dev/chain-icons/blob/main/png/arbitrum/32.png?raw=true',
  ethereum:
    'https://raw.githubusercontent.com/thirdweb-dev/chain-icons/main/png/ethereum/32.png',
  polygon:
    'https://raw.githubusercontent.com/thirdweb-dev/chain-icons/main/png/polygon/32.png',
  optimism:
    'https://raw.githubusercontent.com/thirdweb-dev/chain-icons/main/png/optimism/32.png',
  linea:
    'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/linea.svg',
  base: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/base.svg',
  fantom:
    'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/fantom.svg',
  avalanche:
    'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/avalanche.svg',
  'bnb smart chain':
    'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/bsc.svg',
  aurora:
    'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/aurora.png',
  'zksync era':
    'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/zksync.svg',
  okc: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/okx.svg',
  scroll:
    'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/scroll.png',
  blast:
    'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/blast.png',
  mode: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/mode.png',
  //mantle:
  //"https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/mantle.png",
};
