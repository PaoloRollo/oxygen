import { usePrivy } from '@privy-io/expo';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { ChevronLeftIcon, CopyIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';

import {
  FocusAwareStatusBar,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { getWalletAddress, sliceAddress } from '@/lib';

export default function Receive() {
  const router = useRouter();
  const { user } = usePrivy();
  const walletAddress = getWalletAddress(user);
  const [isCopying, setIsCopying] = useState(false);

  const copyToClipboard = async () => {
    if (walletAddress && !isCopying) {
      setIsCopying(true);
      await Clipboard.setStringAsync(walletAddress);

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Address copied!',
        text2: 'Wallet address copied to clipboard',
        visibilityTime: 2000,
        autoHide: true,
      });

      // Prevent multiple rapid copies
      setTimeout(() => setIsCopying(false), 1000);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FocusAwareStatusBar />
      <View className="flex flex-row items-center gap-x-4 border-b border-gray-300 p-4">
        <Pressable onPress={() => router.back()}>
          <ChevronLeftIcon size={20} className="text-black" />
        </Pressable>
        <Text className="text-2xl font-bold">Receive</Text>
      </View>

      <View className="flex-1 items-center justify-center bg-gray-200 p-4">
        <View className="border border-gray-300 bg-white p-6">
          <View className="mb-6 items-center">
            <Text className="mb-2 text-lg text-gray-600">
              Scan to receive funds
            </Text>
            {walletAddress && (
              <View className="p-4">
                <QRCode value={walletAddress} size={200} />
              </View>
            )}
          </View>

          <View className="gap-y-2">
            <Text className="text-center text-sm text-gray-600">
              Your wallet address
            </Text>
            <Pressable
              onPress={copyToClipboard}
              disabled={isCopying}
              className={`flex-row items-center justify-center gap-x-2 rounded-full px-4 py-3 ${
                isCopying ? 'bg-gray-50' : 'bg-gray-100 active:bg-gray-200'
              }`}
            >
              <Text className="font-medium">
                {walletAddress ? sliceAddress(walletAddress) : '...'}
              </Text>
              <CopyIcon size={16} className="text-gray-600" />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
