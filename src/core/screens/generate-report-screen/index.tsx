import React from 'react';

import { FinalReportForeground } from '@/components/final-report-foreground';
import { FinalReportHeader } from '@/components/final-report-header';
import ParallaxScrollView from '@/components/parallax-scrollview';
import { Text, View } from '@/ui';

const PARALLAX_HEIGHT = 100;
const _HEADER_BAR_HEIGHT = 110;
const SNAP_START_THRESHOLD = 70;
const SNAP_STOP_THRESHOLD = 300;

const GenerateReportScreen = ({ collectedData }) => {
  // const [response, setResponse] = useState('');
  // const generateResponse = async () => {
  //   try {
  //     const message = await anthropic.messages.create({
  //       model: 'claude-3-haiku-20240307',
  //       max_tokens: 1024,
  //       messages: [
  //         {
  //           role: 'user',
  //           content: [
  //             {
  //               type: 'image',
  //               source: {
  //                 type: 'base64',
  //                 media_type: 'image/png',
  //                 data: collectedData.base64Image,
  //               },
  //             },
  //             {
  //               type: 'text',
  //               text: 'Please analyze this image and describe what you see in detail, consider that you are an expert in analyzing X-Ray images and be professional.',
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     console.log('message here', message);
  //     setResponse(message.content[0].text);
  //     return message;
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // };

  // useEffect(() => {
  //   generateResponse();
  // }, []);

  return (
    <ParallaxScrollView
      parallaxHeight={PARALLAX_HEIGHT}
      headerHeight={60}
      snapStartThreshold={SNAP_START_THRESHOLD}
      snapStopThreshold={SNAP_STOP_THRESHOLD}
      ForegroundComponent={<FinalReportForeground />}
      HeaderBarComponent={<FinalReportHeader />}
    >
      <View className="top-[-150px] ml-4">
        <Text className="my-5">Recent reports</Text>
        <Text>{collectedData.interpretationResult}</Text>
      </View>
    </ParallaxScrollView>
  );
};

export default GenerateReportScreen;
