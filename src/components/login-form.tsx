import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <View className="items-center justify-center">
          <Text
            testID="form-title"
            className="pb-6 text-center text-4xl font-bold"
          >
            Oxygen
          </Text>

          <Text className="max-w-xs text-center text-gray-500">
            Welcome to Oxygen! 👋
          </Text>
          <Text className="mb-6 max-w-xs text-center text-gray-500">
            Enter an email address to login or to create a new account.
          </Text>
        </View>

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Email"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button
          testID="login-button"
          label="Send code"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
