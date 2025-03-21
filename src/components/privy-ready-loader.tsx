import { usePrivy } from '@privy-io/expo';
import React from 'react';
import { Text, View } from 'react-native';

export default function PrivyReadyLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isReady } = usePrivy();

  if (!isReady) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <>{children}</>;
}
