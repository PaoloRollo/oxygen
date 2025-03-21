import { useEmbeddedEthereumWallet } from '@privy-io/expo';
import { useState } from 'react';

import { sendTransaction } from '@/lib';

import { Text, View } from '..';
import { Button } from '../button';

type WithdrawMessageProps = {
  action: 'withdraw';
  inputToken: any;
  outputToken: any;
  data: any[];
};

export const WithdrawMessage = ({ data }: WithdrawMessageProps) => {
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
      <Text>Click the button to confirm your withdrawal of tokens.</Text>
      <View className="flex flex-row gap-x-3">
        {!isSuccess && !isError && (
          <Button
            key={data[0].solver}
            label={`Confirm withdraw`}
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
            label={`Withdraw executed!`}
            variant="success"
            // onPress={() => executeTransaction(data[0].data)}
          />
        )}
      </View>
    </View>
  );
};
