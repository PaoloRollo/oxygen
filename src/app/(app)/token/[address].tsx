/* eslint-disable max-lines-per-function */
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowBigDownIcon,
  ArrowBigUpIcon,
  ChevronLeftIcon,
} from 'lucide-react-native';
import React, { useMemo } from 'react';

import { useTokenChart } from '@/api';
import {
  FocusAwareStatusBar,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
type TokenParams = {
  id: string;
  address: string;
  symbol: string;
  name: string;
  icon: string;
  price: string;
  balance: string;
  value: string;
  change: string;
};

export default function Token() {
  const router = useRouter();
  const params = useLocalSearchParams<TokenParams>();
  const changeValue = Number(params.change);
  const { data: chartData } = useTokenChart({
    variables: { tokenAddress: params.id },
  });

  const chartDataPoints = useMemo(() => {
    if (!chartData) return [];
    return chartData.map((point) => ({
      value: point[1],
    }));
  }, [chartData]);

  console.log(chartDataPoints);

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <FocusAwareStatusBar />
      <View className="flex-1 flex-col">
        <View className="flex flex-row border border-gray-300 px-4">
          <View className="h-[60px] w-1/3 items-start justify-center border-x border-gray-300 py-4">
            <Pressable onPress={() => router.back()} className="">
              <ChevronLeftIcon size={24} className="text-black" />
            </Pressable>
          </View>
          <View className="w-2/3 border-r border-gray-300" />
        </View>

        <View className="px-4">
          <View className="border-x border-gray-300 bg-white p-4">
            <View className="flex-row items-center gap-x-2">
              <Image
                source={params.icon}
                placeholder={'https://cdn.zerion.io/eth.png'}
                placeholderContentFit="cover"
                className="size-12 rounded-full"
              />
              <View>
                <Text className="text-2xl font-semibold">{params.name}</Text>
                <Text className="text-lg text-gray-500">{params.symbol}</Text>
              </View>
            </View>

            <View className="mt-6">
              <Text className="text-2xl text-gray-600">Current Price</Text>
              <Text className="mt-2 text-5xl font-semibold">
                ${params.price}
              </Text>
            </View>

            <View className="mt-6 flex flex-row justify-between">
              <View className="flex flex-col">
                <Text className="text-xl text-gray-400">24h Change (%)</Text>
                <View className="flex flex-row items-center gap-x-2">
                  {changeValue >= 0 ? (
                    <ArrowBigUpIcon className="size-4 text-green-500" />
                  ) : (
                    <ArrowBigDownIcon className="size-4 text-red-500" />
                  )}
                  <Text className="mt-2 text-2xl font-semibold">
                    {params.change}%
                  </Text>
                </View>
              </View>
              <View className="flex flex-col">
                <Text className="text-xl text-gray-400">Your Balance</Text>
                <Text className="mt-2 text-2xl font-semibold">
                  {params.balance} {params.symbol}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="border border-gray-300">
          <View className="flex w-full flex-row px-4">
            <View className="flex w-1/2 flex-col items-center justify-center gap-y-2 border-x border-gray-300 py-6">
              <Text className="text-lg text-gray-500">Total Value</Text>
              <Text className="text-2xl font-semibold">${params.value}</Text>
            </View>
            <View className="flex w-1/2 flex-col items-center justify-center gap-y-2 border-r border-gray-300 py-6">
              <Text className="text-lg text-gray-500">Token Price</Text>
              <Text className="text-2xl font-semibold">${params.price}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
