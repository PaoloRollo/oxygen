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

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    try {
      const result = await sendCode({ email: data.email });

      if (result.success) {
        setAuthStatus('otp');
        setEmail(data.email);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onOTPSubmit: OTPFormProps['onSubmit'] = async (data) => {
    try {
      const result = await loginWithCode({ code: data.code, email });

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
