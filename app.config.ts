/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';
import type { AppIconBadgeConfig } from 'app-icon-badge/types';

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: true,
  badges: [
    {
      text: '1.0.0',
      type: 'ribbon',
      color: 'white',
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Oxygen',
  description: 'Oxygen',
  owner: 'Paolo Rollo',
  scheme: 'oxygen',
  slug: 'oxygen',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'org.brianknows.oxygen',
    config: {
      usesNonExemptEncryption: false, // Avoid the export compliance warning on the app store
    },
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#2E3C4B',
    },
    package: 'org.brianknows.oxygen',
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        backgroundColor: '#2E3C4B',
        image: './assets/splash-icon.png',
        imageWidth: 150,
      },
    ],
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/Inter.ttf', './assets/fonts/Outfit.ttf'],
      },
    ],
    'expo-localization',
    'expo-router',
    ['app-icon-badge', appIconBadgeConfig],
    ['react-native-edge-to-edge'],
    'expo-secure-store',
    [
      'expo-speech-recognition',
      {
        microphonePermission: 'Allow Oxygen to use the microphone.',
        speechRecognitionPermission: 'Allow Oxygen to use speech recognition.',
        androidSpeechServicePackages: [
          'com.google.android.googlequicksearchbox',
        ],
      },
    ],
  ],
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
});
