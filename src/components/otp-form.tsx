/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';

const schema = z.object({
  code: z.string().length(6),
});

export type FormType = z.infer<typeof schema>;

export type OTPFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const OTPForm = ({ onSubmit = () => {} }: OTPFormProps) => {
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
          testID="code-input"
          control={control}
          name="code"
          label="OTP Code"
          keyboardType="numeric"
          submitBehavior="submit"
          autoFocus={true}
          maxLength={6}
          textContentType="oneTimeCode"
        />
        <Button
          testID="login-button"
          label="Enter"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
