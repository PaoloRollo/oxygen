import { Text, View } from 'react-native';

type SwapMessageProps = {
  action: 'swap';
  inputToken: any;
  outputToken: any;
  data: any[];
};

export const SwapMessage = ({
  action,
  inputToken,
  outputToken,
  data,
}: SwapMessageProps) => {
  return (
    <View>
      <Text>Swap</Text>
    </View>
  );
};
