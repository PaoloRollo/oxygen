/* eslint-disable max-lines-per-function */
/* eslint-disable react/react-in-jsx-scope */

import { usePrivy } from '@privy-io/expo';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { ChevronLeftIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Linking } from 'react-native';

import {
  FocusAwareStatusBar,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { Github, Share, Website } from '@/components/ui/icons';
import { translate } from '@/lib';

export default function Settings() {
  const router = useRouter();
  const { logout } = usePrivy();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#9CA3AF' : '#6B7280';

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <FocusAwareStatusBar />
      <View className="flex-1 flex-col">
        <View className="flex flex-row border border-gray-300 px-4">
          <View className="flex w-1/3 flex-row items-center border-x border-gray-300 py-4 pr-2">
            <Pressable onPress={() => router.back()} className="">
              <ChevronLeftIcon size={24} className="text-black" />
            </Pressable>
            <Text className="text-2xl font-semibold">Settings</Text>
          </View>
          <View className="w-2/3 border-r border-gray-300" />
        </View>

        <View className="px-4">
          <View className="mt-4 border-x border-t border-gray-300 bg-white">
            <Text className="border-b border-gray-300 px-4 py-2 text-lg text-gray-500">
              {translate('settings.about')}
            </Text>
            <View className="border-b border-gray-300 p-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg">App Name</Text>
                <Text className="text-gray-500">Oxygen</Text>
              </View>
            </View>
            <View className="border-b border-gray-300 p-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg">Version</Text>
                <Text className="text-gray-500">1.0.0</Text>
              </View>
            </View>
          </View>

          <View className="mt-4 border-x border-t border-gray-300 bg-white">
            <Text className="border-b border-gray-300 px-4 py-2 text-lg text-gray-500">
              {translate('settings.support_us')}
            </Text>
            <Pressable className="flex-row items-center justify-between border-b border-gray-300 p-4">
              <View className="flex-row items-center gap-x-2">
                <Share color={iconColor} />
                <Text className="text-lg">Share</Text>
              </View>
            </Pressable>
          </View>

          <View className="mt-4 border-x border-t border-gray-300 bg-white">
            <Text className="border-b border-gray-300 px-4 py-2 text-lg text-gray-500">
              {translate('settings.links')}
            </Text>
            <Pressable
              onPress={() => {
                WebBrowser.openBrowserAsync(
                  'https://brianknows.org/privacy-policy'
                );
              }}
              className="flex-row items-center justify-between border-b border-gray-300 p-4"
            >
              <Text className="text-lg">Privacy Policy</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                WebBrowser.openBrowserAsync(
                  'https://brianknows.org/terms-and-conditions'
                );
              }}
              className="flex-row items-center justify-between border-b border-gray-300 p-4"
            >
              <Text className="text-lg">Terms & Conditions</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                Linking.openURL('https://github.com/PaoloRollo/oxygen');
              }}
              className="flex-row items-center justify-between border-b border-gray-300 p-4"
            >
              <View className="flex-row items-center gap-x-2">
                <Github color={iconColor} />
                <Text className="text-lg">GitHub</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                WebBrowser.openBrowserAsync('https://brianknows.org');
              }}
              className="flex-row items-center justify-between border-b border-gray-300 p-4"
            >
              <View className="flex-row items-center gap-x-2">
                <Website color={iconColor} />
                <Text className="text-lg">Website</Text>
              </View>
            </Pressable>
          </View>

          <View className="mt-4 border-x border-t border-gray-300 bg-white">
            <Pressable
              onPress={logout}
              className="flex-row items-center justify-center border-b border-gray-300 p-4"
            >
              <Text className="text-lg text-red-500">Logout</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
