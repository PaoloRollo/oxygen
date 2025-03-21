/* eslint-disable react/no-unstable-nested-components */
import { usePrivy } from '@privy-io/expo';
import { Redirect, SplashScreen, Stack } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { useIsFirstTime } from '@/lib';

export default function TabLayout() {
  const { user } = usePrivy();

  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      hideSplash();
    }, 1000);
  }, [hideSplash]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (!user) {
    return <Redirect href="/login" />;
  }
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="receive"
        options={{
          title: 'Receive',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="token/[address]"
        options={{
          title: 'Token',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
