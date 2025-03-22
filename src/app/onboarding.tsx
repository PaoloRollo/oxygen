/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import {
  BrainCircuitIcon,
  MessageSquareTextIcon,
  WalletIcon,
} from 'lucide-react-native';
import React from 'react';

import { BalanceComponent } from '@/components/balance';
import {
  Button,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { useIsFirstTime } from '@/lib/hooks';
import { mockWallet } from '@/lib/mock';

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();

  const handleStart = () => {
    setIsFirstTime(false);
    router.replace('/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <FocusAwareStatusBar />
      <View className="flex-1 flex-col">
        <View className="flex flex-row border-y border-gray-300 px-4">
          <View className="w-full items-center border-x border-gray-300 py-4">
            <Text className="text-4xl font-semibold">Oxygen</Text>
          </View>
        </View>
        <View className="h-[30px] border-y border-gray-300" />
        <View className="px-4">
          <BalanceComponent data={mockWallet} />
        </View>
        <View className="h-[30px] border-y border-gray-300" />
        <View className="border border-gray-300">
          <View className="flex flex-col">
            <View className="flex flex-row">
              <View className="flex w-1/2 flex-col items-center justify-center gap-y-2 border-b border-r border-gray-300 bg-white p-4">
                <View className="flex aspect-square w-12 items-center justify-center rounded-lg bg-black p-2">
                  <BrainCircuitIcon className="size-full text-white" />
                </View>
                <Text className="text-center text-lg font-medium">
                  AI-Powered Assistant
                </Text>
                <Text className="text-center text-sm text-gray-500">
                  Get help with your crypto tasks
                </Text>
              </View>
            </View>
            <View className="flex flex-row justify-end">
              <View className="flex w-1/2 flex-col items-center justify-center gap-y-2 border-y border-l border-gray-300 bg-white p-4">
                <View className="flex aspect-square w-12 items-center justify-center rounded-lg bg-black p-2">
                  <WalletIcon className="size-full text-white" />
                </View>
                <Text className="text-center text-lg font-medium">
                  Multi-Chain Wallet
                </Text>
                <Text className="text-center text-sm text-gray-500">
                  Manage assets across chains
                </Text>
              </View>
            </View>
            <View className="flex flex-row">
              <View className="col-span-2 flex w-1/2 flex-col items-center justify-center gap-y-2 border-r border-gray-300 bg-white p-4">
                <View className="flex aspect-square w-12 items-center justify-center rounded-lg bg-black p-2">
                  <MessageSquareTextIcon className="size-full text-white" />
                </View>
                <Text className="text-center text-lg font-medium">
                  Smart Chat
                </Text>
                <Text className="text-center text-sm text-gray-500">
                  Chat to manage your assets
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-auto px-4 pb-4">
          <Button label="Start your journey" onPress={handleStart} size="lg" />
        </View>
      </View>
    </SafeAreaView>
  );
}
