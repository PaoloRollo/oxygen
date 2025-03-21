/* eslint-disable max-lines-per-function */
/* eslint-disable react/react-in-jsx-scope */

import { usePrivy } from '@privy-io/expo';
import * as WebBrowser from 'expo-web-browser';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Linking } from 'react-native';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { ThemeItem } from '@/components/settings/theme-item';
import {
  colors,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { Github, Rate, Share, Support, Website } from '@/components/ui/icons';
import { translate } from '@/lib';

export default function Settings() {
  const { logout } = usePrivy();
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];
  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <Text className="text-xl font-bold">
            {translate('settings.title')}
          </Text>
          <ItemsContainer title="settings.generale">
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={'Oxygen'} />
            <Item text="settings.version" value={'1.0.0'} />
          </ItemsContainer>

          <ItemsContainer title="settings.support_us">
            <Item
              text="settings.share"
              icon={<Share color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.support"
              icon={<Support color={iconColor} />}
              onPress={() => {}}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item
              text="settings.privacy"
              onPress={() => {
                WebBrowser.openBrowserAsync(
                  'https://brianknows.org/privacy-policy'
                );
              }}
            />
            <Item
              text="settings.terms"
              onPress={() => {
                WebBrowser.openBrowserAsync(
                  'https://brianknows.org/terms-and-conditions'
                );
              }}
            />
            <Item
              text="settings.github"
              icon={<Github color={iconColor} />}
              onPress={() => {
                Linking.openURL('https://github.com/brian-knows');
              }}
            />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => {
                WebBrowser.openBrowserAsync('https://brianknows.org');
              }}
            />
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={logout} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
