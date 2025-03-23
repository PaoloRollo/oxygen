/* eslint-disable max-lines-per-function */
import { useChat } from '@ai-sdk/react';
import { usePrivy } from '@privy-io/expo';
import { fetch as expoFetch } from 'expo/fetch';
import { useRouter } from 'expo-router';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';
import {
  AudioWaveformIcon,
  ChevronLeftIcon,
  SendHorizonalIcon,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { twMerge } from 'tailwind-merge';

import {
  FocusAwareStatusBar,
  List,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { BridgeMessage } from '@/components/ui/messages/bridge-message';
import { DepositMessage } from '@/components/ui/messages/deposit-message';
import { SwapMessage } from '@/components/ui/messages/swap-message';
import { TransferMessage } from '@/components/ui/messages/transfer-message';
import { WithdrawMessage } from '@/components/ui/messages/withdraw-message';
import { getWalletAddress } from '@/lib';

export default function Chat() {
  const { user } = usePrivy();
  const router = useRouter();
  const { messages, handleInputChange, input, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: 'http://localhost:3000/api/chat',
    onError: (error) => console.error(error, 'ERROR'),
    headers: {
      'x-brian-address': getWalletAddress(user) ?? '',
      // 'x-brian-address': '0xA9bC8A58B39935BA3D8D1Ce4b0d3383153F184E1',
    },
  });

  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState('');

  useSpeechRecognitionEvent('start', () => setRecognizing(true));
  useSpeechRecognitionEvent('end', () => setRecognizing(false));
  useSpeechRecognitionEvent('result', (event) => {
    setTranscript(event.results[0]?.transcript);
    // @ts-ignore
    handleInputChange({ target: { value: transcript } });
  });
  useSpeechRecognitionEvent('error', (event) => {
    console.log('error code:', event.error, 'error message:', event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn('Permissions not granted', result);
      return;
    }
    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      lang: 'en-US',
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      requiresOnDeviceRecognition: false,
      addsPunctuation: false,
      contextualStrings: ['Carlsen', 'Nepomniachtchi', 'Praggnanandhaa'],
    });
  };

  const Message = ({ part, role }: { part: any; role: string }) => {
    const result = part?.toolInvocation?.result;

    const renderResult = (result: any) => {
      if (result.action === 'swap') {
        return <SwapMessage {...result} />;
      }
      if (result.action === 'bridge') {
        return <BridgeMessage {...result} />;
      }
      if (result.action === 'deposit') {
        return <DepositMessage {...result} />;
      }
      if (result.action === 'transfer') {
        return <TransferMessage {...result} />;
      }
      if (result.action === 'withdraw') {
        return <WithdrawMessage {...result} />;
      }
      return <Markdown>{result.text}</Markdown>;
    };

    const renderThinkingStep = (part: any) => {
      if (part.toolInvocation.toolName === 'getChainsTool') {
        return (
          <Text
            key={part.toolInvocation.toolCallId}
            className="animate-pulse py-2 text-gray-900"
          >
            Checking if chain is supported...
          </Text>
        );
      }
      if (part.toolInvocation.toolName === 'searchDataTool') {
        return (
          <Text
            key={part.toolInvocation.toolCallId}
            className="animate-pulse py-2 text-gray-900"
          >
            Fetching tokens prices...
          </Text>
        );
      }
      if (part.toolInvocation.toolName === 'balanceTool') {
        return (
          <Text
            key={part.toolInvocation.toolCallId}
            className="animate-pulse py-2 text-gray-900"
          >
            Checking your balance...
          </Text>
        );
      }
      if (part.toolInvocation.toolName === 'swapTool') {
        return (
          <Text
            key={part.toolInvocation.toolCallId}
            className="animate-pulse py-2 text-gray-900"
          >
            Generating swap transaction..
          </Text>
        );
      }
      if (part.toolInvocation.toolName === 'bridgeTool') {
        return (
          <Text
            key={part.toolInvocation.toolCallId}
            className="animate-pulse py-2 text-gray-900"
          >
            Generating bridge transaction...
          </Text>
        );
      }
      if (part.toolInvocation.toolName === 'depositTool') {
        return (
          <Text
            key={part.toolInvocation.toolCallId}
            className="animate-pulse py-2 text-gray-900"
          >
            Generating deposit transaction...
          </Text>
        );
      }
      if (part.toolInvocation.toolName === 'withdrawTool') {
        return (
          <Text
            key={part.toolInvocation.toolCallId}
            className="animate-pulse py-2 text-gray-900"
          >
            Generating withdraw transaction...
          </Text>
        );
      }
      if (part.toolInvocation.toolName === 'transferTool') {
        return (
          <Text
            key={part.toolInvocation.toolCallId}
            className="animate-pulse py-2 text-gray-900"
          >
            Generating transfer transaction...
          </Text>
        );
      }
      if (part.toolInvocation.toolName === 'fallbackTool') {
        return (
          <Text
            key={part.toolInvocation.toolCallId}
            className="animate-pulse py-2 text-gray-900"
          >
            Searching on the internet...
          </Text>
        );
      }

      return (
        <Text
          key={part.toolInvocation.toolCallId}
          className="animate-pulse py-2 text-gray-900"
        >
          Brian is thinking...
        </Text>
      );
    };

    return (
      <View className="px-4">
        <View
          className={`mb-2 max-w-[80%] rounded-2xl px-3 ${
            role === 'user' ? 'self-end bg-black' : 'self-start bg-gray-200'
          }`}
        >
          {role === 'user' && part.type === 'text' ? (
            <Markdown
              style={{
                text: { color: 'white', fontSize: 14, fontWeight: 600 },
              }}
            >
              {part.text}
            </Markdown>
          ) : part.type === 'tool-invocation' &&
            part.toolInvocation.state === 'call' ? (
            renderThinkingStep(part)
          ) : part.type === 'tool-invocation' &&
            part.toolInvocation.state === 'result' ? (
            renderResult(result)
          ) : (
            <Markdown
              style={{
                text: { color: 'black', fontSize: 14 },
              }}
            >
              {part.text}
            </Markdown>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <FocusAwareStatusBar />
        <View className="flex flex-row items-center gap-x-4 border-b border-gray-300 p-4">
          <Pressable onPress={() => router.back()}>
            <ChevronLeftIcon size={20} className="text-black" />
          </Pressable>
          <Text className="text-2xl">
            Chat with <Text className="text-2xl font-bold">Oxygen</Text>
          </Text>
        </View>
        <View className="flex-1">
          <List
            className="flex-1 bg-gray-100 py-2"
            data={messages}
            automaticallyAdjustContentInsets
            // @ts-ignore
            renderItem={({ item, index }) =>
              item.parts.map((part: any) => {
                const result = part?.toolInvocation?.result;
                const toolCallId = part?.toolInvocation?.toolCallId;

                if (
                  result &&
                  (result.action === 'searchdata' ||
                    result.action === 'balance' ||
                    result.action === 'ensresolution' ||
                    result.action === 'chains' ||
                    result.action === 'fallback')
                ) {
                  return (
                    <View
                      key={`${part.type}-${index}-${item.role}-${part.id}-${toolCallId}`}
                      className="-mt-0"
                    />
                  );
                }

                return (
                  <Message
                    key={`${part.type}-${index}-${item.role}-${part.id}-${toolCallId}`}
                    part={part}
                    role={item.role}
                  />
                );
              })
            }
          />

          <View className="border-t border-gray-200 bg-white p-4">
            <Text className="mb-2 text-center text-xs text-gray-500">
              Oxygen can make mistakes, please double check everything!
            </Text>

            <View className="flex-row items-center gap-x-2">
              <Pressable
                onPress={handleStart}
                className={twMerge(
                  'rounded-full  p-2',
                  recognizing && 'bg-green-600',
                  !recognizing && 'bg-black'
                )}
                disabled={recognizing}
              >
                <AudioWaveformIcon size={20} className="text-white" />
              </Pressable>
              <TextInput
                className="flex-1 rounded-full border border-gray-300 bg-gray-100 px-4 py-2"
                placeholder="Type your message..."
                value={input}
                onChangeText={(text) =>
                  // @ts-ignore
                  handleInputChange({ target: { value: text } })
                }
              />
              <Pressable
                onPress={handleSubmit}
                className="rounded-full bg-black p-2"
                disabled={!input.trim()}
              >
                <SendHorizonalIcon size={20} className="text-white" />
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
