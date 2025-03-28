/* eslint-disable max-lines-per-function */
import { usePrivy } from '@privy-io/expo';
import { useFundWallet } from '@privy-io/expo';
import { Redirect, useRouter } from 'expo-router';
import {
  CogIcon,
  HandCoinsIcon,
  MessageCircleIcon,
  PiggyBankIcon,
  RefreshCcwIcon,
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { base } from 'viem/chains';

import { useTokens, useWallet } from '@/api';
import { BalanceComponent } from '@/components/balance';
import {
  FocusAwareStatusBar,
  Image,
  List,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { chainIcons, getWalletAddress, roundToFirstDecimal } from '@/lib';

export default function Home() {
  const router = useRouter();
  const { user } = usePrivy();
  const { fundWallet } = useFundWallet();

  const {
    data,
    isLoading: isLoadingWallet,
    refetch,
  } = useWallet({
    variables: { walletAddress: getWalletAddress(user) },
  });
  const {
    data: tokens,
    isLoading: isLoadingTokens,
    refetch: refetchTokens,
  } = useTokens({
    variables: { walletAddress: getWalletAddress(user) },
  });

  const [isLoading, setIsLoading] = useState(
    isLoadingWallet || isLoadingTokens
  );

  useEffect(() => {
    if (!user) return;

    if (user && !data) {
      refetch();
    }

    if (user && !tokens) {
      refetchTokens();
    }
  }, [user]);

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View className="max-h-sreen flex-1 bg-gray-200">
      <FocusAwareStatusBar />
      {isLoading && (
        <View className="absolute z-10 flex size-full items-center justify-center bg-black/30">
          <View className="flex items-center justify-center rounded-lg bg-white p-4">
            <ActivityIndicator size="large" color="#000" />
          </View>
        </View>
      )}
      <SafeAreaView className="flex-1 flex-col">
        <View className="flex flex-row  border border-gray-300 px-4">
          <View className="w-1/3 items-center border-x border-gray-300 py-4">
            <Text className="text-3xl font-semibold">Oxygen</Text>
          </View>
          {/* 
            <Text className="text-sm text-gray-500">
              {sliceAddress(getWalletAddress(user))}
            </Text> */}
          <View className="w-2/3 border-r border-gray-300" />
        </View>
        <View className="px-4">
          <BalanceComponent data={data} />
        </View>
        <View className="border border-gray-300">
          <View className="flex w-full flex-row px-4">
            <Pressable
              onPress={() => router.push('/chat')}
              className="flex w-1/4 flex-col items-center justify-center gap-y-2 border-x border-gray-300 py-6"
            >
              <View className="aspect-square rounded-lg bg-black p-2">
                <MessageCircleIcon className="h-24 text-white" size={24} />
              </View>
              <Text className="text-xl">Chat</Text>
            </Pressable>
            <Pressable
              className="flex w-1/4 flex-col items-center justify-center gap-y-2 border-r border-gray-300 py-6"
              onPress={async () => {
                try {
                  await fundWallet({
                    address: getWalletAddress(user)!,
                    chain: base,
                    amount: '1',
                    asset: 'native-currency',
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <View className="aspect-square rounded-lg bg-black p-2">
                <HandCoinsIcon className="h-24 text-white" size={24} />
              </View>
              <Text className="text-xl">Top up</Text>
            </Pressable>
            <Pressable
              className="flex w-1/4 flex-col items-center justify-center gap-y-2 border-r border-gray-300 py-6"
              onPress={async () => {
                try {
                  setIsLoading(true);
                  await refetch();
                  await refetchTokens();
                } catch (error) {
                  // console.error(error);
                } finally {
                  // wait 1 seconds before setting isLoading to false
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 1000);
                }
              }}
            >
              <View className="aspect-square rounded-lg bg-black p-2">
                <RefreshCcwIcon className="h-24 text-white" size={24} />
              </View>
              <Text className="text-xl">Refresh</Text>
            </Pressable>
            <Pressable
              className="flex w-1/4 flex-col items-center justify-center gap-y-2 border-r border-gray-300 py-6"
              onPress={() => router.push('/settings')}
            >
              <View className="aspect-square rounded-lg bg-black p-2">
                <CogIcon className="h-24 text-white" size={24} />
              </View>
              <Text className="text-xl">Settings</Text>
            </Pressable>
          </View>
        </View>
        <View className="px-6s border-b border-gray-300 px-4 py-2">
          <Text className="text-2xl font-semibold">Tokens</Text>
        </View>
        <View className="border-b border-gray-300 px-4">
          {tokens && tokens.length > 0 && (
            <View className="h-2/3 border-x border-b border-gray-300 bg-white">
              <View className="h-full">
                <List
                  estimatedItemSize={64}
                  data={tokens.filter((token) => token.attributes.value > 0)}
                  renderItem={({ item, index }) => (
                    <Pressable
                      onPress={() =>
                        router.push({
                          // pathname: '/token/[address]',
                          // @ts-ignore
                          pathname: `/token/${item.id.split('-')[0]}`,
                          params: {
                            id: item.relationships.fungible.data.id,
                            address: item.id.split('-')[0],
                            symbol: item.attributes.fungible_info.symbol,
                            name: item.attributes.fungible_info.name,
                            icon: item.attributes.fungible_info?.icon?.url,
                            price: roundToFirstDecimal(
                              item.attributes.price ?? 0
                            ),
                            balance: roundToFirstDecimal(
                              item.attributes.quantity.float
                            ),
                            value: roundToFirstDecimal(item.attributes.value),
                            change: roundToFirstDecimal(
                              item.attributes?.changes?.percent_1d
                            ),
                            chain: item.relationships.chain.data.id,
                          },
                        })
                      }
                    >
                      <View
                        className={`flex flex-row items-center gap-x-2 border-b border-gray-300 px-2 ${
                          index === 0 ? 'border-t' : ''
                        }`}
                      >
                        <View className="flex items-center justify-center border-r border-gray-300 py-4 pl-2 pr-4">
                          <View className="relative flex items-center justify-center">
                            <Image
                              source={item.attributes.fungible_info?.icon?.url}
                              placeholder={'https://cdn.zerion.io/eth.png'}
                              placeholderContentFit="cover"
                              className="size-10 rounded-full"
                            />
                            <Image
                              source={
                                chainIcons[item.relationships.chain.data.id]
                              }
                              placeholder={'https://cdn.zerion.io/eth.png'}
                              placeholderContentFit="cover"
                              className="absolute bottom-0 right-0 size-4 rounded-full bg-white p-1"
                            />
                          </View>
                        </View>
                        <View className="flex w-5/6 flex-row justify-between">
                          <View className="flex flex-col">
                            <Text className="text-lg font-semibold">
                              {item.attributes.fungible_info.symbol}
                            </Text>
                            <Text className="text-sm text-gray-500">
                              {roundToFirstDecimal(
                                item.attributes.quantity.float
                              )}
                            </Text>
                          </View>
                          <View className="flex flex-col items-end">
                            <Text className="text-lg font-semibold">
                              ${roundToFirstDecimal(item.attributes.value)}
                            </Text>
                            <Text className="text-sm text-gray-500">
                              {roundToFirstDecimal(
                                item.attributes?.changes?.percent_1d
                              )}
                              %
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  )}
                />
              </View>
            </View>
          )}
          {tokens && tokens.length === 0 && (
            <View className="flex h-2/3 flex-col items-center justify-center border-x border-b border-gray-300 bg-white">
              <PiggyBankIcon className="h-64 text-black/50" size={64} />
              <Text className="text-center text-xl font-semibold text-black/50">
                You don't have any tokens yet.
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
