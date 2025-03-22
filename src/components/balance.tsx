import { ArrowBigDownIcon, ArrowBigUpIcon } from 'lucide-react-native';

import { type Wallet } from '@/api';

import { Text, View } from './ui';

export function BalanceComponent({ data }: { data: Wallet | undefined }) {
  return (
    <View className="border-x border-gray-300 bg-white p-4">
      <Text className="text-2xl text-gray-600">Balance</Text>
      <Text className="mt-2 text-5xl font-semibold">
        ${data?.total.positions ? data?.total.positions.toFixed(2) : '0'}
      </Text>
      <View className="flex flex-row justify-between">
        <View className="flex flex-col">
          <Text className="mt-4 text-xl text-gray-400">
            Last day change (%)
          </Text>
          <View className="flex flex-row items-center gap-x-2">
            {data?.changes.percent_1d && data?.changes.percent_1d > 0 ? (
              <ArrowBigUpIcon className="size-4 text-green-500" />
            ) : (
              <ArrowBigDownIcon className="size-4 text-red-500" />
            )}
            <Text className="mt-2 text-2xl font-semibold">
              {data?.changes.percent_1d
                ? data?.changes.percent_1d.toFixed(2)
                : '0'}
              %
            </Text>
          </View>
        </View>
        <View className="flex flex-col">
          <Text className="mt-4 text-xl text-gray-400">Last day change</Text>
          <View className="just flex flex-row items-center gap-x-2">
            {data?.changes.absolute_1d && data?.changes.absolute_1d > 0 ? (
              <ArrowBigUpIcon className="size-4 text-green-500" />
            ) : (
              <ArrowBigDownIcon className="size-4 text-red-500" />
            )}
            <Text className="mt-2 text-2xl font-semibold">
              {data?.changes.absolute_1d
                ? (data?.changes.absolute_1d).toFixed(2)
                : '0'}
              $
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
