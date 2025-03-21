import { useEmbeddedEthereumWallet } from '@privy-io/expo';
import { useState } from 'react';

import { sendTransaction } from '@/lib';

import { Text, View } from '..';
import { Button } from '../button';

type DepositMessageProps = {
  action: 'deposit';
  inputToken: any;
  outputToken: any;
  data: any[];
};

export const DepositMessage = ({ data }: DepositMessageProps) => {
  const { wallets } = useEmbeddedEthereumWallet();
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const executeTransaction = async (data: any) => {
    setIsExecuting(true);
    setIsError(false);
    const wallet = wallets[0];
    try {
      for (const tx of data) {
        await sendTransaction(wallet, tx);
      }
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <View className="flex flex-col gap-y-2 pt-3">
      <Text>Click the button to confirm the deposit of your tokens.</Text>
      <View className="flex flex-row gap-x-3">
        {!isSuccess && !isError && (
          <Button
            key={data[0].solver}
            label={`Confirm deposit`}
            loading={isExecuting}
            disabled={isExecuting}
            onPress={() => executeTransaction(data[0].data)}
          />
        )}
        {isError && (
          <Button
            key={data[0].solver}
            label={`Try again`}
            loading={isExecuting}
            disabled={isExecuting}
            variant="destructive"
            onPress={() => executeTransaction(data[0].data)}
          />
        )}
        {isSuccess && !isError && (
          <Button
            key={data[0].solver}
            label={`Deposit executed!`}
            variant="success"
            // onPress={() => executeTransaction(data[0].data)}
          />
        )}
      </View>
    </View>
  );
};
