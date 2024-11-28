import { View } from 'react-native';

import { colors, Text } from '@/ui';

const CustomHeader = ({ ...props }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 100,
        backgroundColor: colors.primary[300],
        position: 'relative',
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 15,
        }}
      >
        {props.options.title}
      </Text>
    </View>
  );
};

export default CustomHeader;
