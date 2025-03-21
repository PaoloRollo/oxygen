import { useLoginWithEmail, usePrivy } from '@privy-io/expo';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { OTPForm, type OTPFormProps } from '@/components/otp-form';
import { FocusAwareStatusBar } from '@/components/ui';

export default function Login() {
  const router = useRouter();
  const { user, isReady } = usePrivy();
  const { sendCode, loginWithCode } = useLoginWithEmail();
  const [authStatus, setAuthStatus] = useState<'idle' | 'otp'>('idle');
  const [email, setEmail] = useState<string>('');

  console.log(user);

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    try {
      console.log('data', data);
      const result = await sendCode({ email: data.email });
      console.log('result', result);
      if (result.success) {
        setAuthStatus('otp');
        setEmail(data.email);
      }
    } catch (error) {
      console.error(error);
    }
    // router.push('/');
  };

  const onOTPSubmit: OTPFormProps['onSubmit'] = async (data) => {
    console.log('data', data);
    try {
      const result = await loginWithCode({ code: data.code, email });
      console.log('result', result);

      if (result) {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && isReady) {
      router.push('/');
    }
  }, [router, user, isReady]);

  if (authStatus === 'otp') {
    return (
      <>
        <FocusAwareStatusBar />
        <OTPForm onSubmit={onOTPSubmit} />
      </>
    );
  }

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
