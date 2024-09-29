import React from 'react';

import { Foreground } from '@/components/home-foreground';
import { HomeHeaderBar } from '@/components/home-header-bar';
import ParallaxScrollView from '@/components/parallax-scrollview';
import { Text, View } from '@/ui';

const PARALLAX_HEIGHT = 330;
const HEADER_BAR_HEIGHT = 110;
const SNAP_START_THRESHOLD = 70;
const SNAP_STOP_THRESHOLD = 330;

export default function Home() {
  return (
    <ParallaxScrollView
      parallaxHeight={PARALLAX_HEIGHT}
      headerHeight={HEADER_BAR_HEIGHT}
      snapStartThreshold={SNAP_START_THRESHOLD}
      snapStopThreshold={SNAP_STOP_THRESHOLD}
      ForegroundComponent={<Foreground />}
      HeaderBarComponent={<HomeHeaderBar />}
    >
      <View>
        <Text>{MOCK_TEXT}</Text>
      </View>
    </ParallaxScrollView>
  );
}

export const MOCK_TEXT = `
Lorem ipsum dolor sit amet,  acilisi. Vestibulum tempor varius dolor, non condimentum lorem lacinia eu. Suspendisse dictum luctus facilisis. Suspendisse vehicula eget justo vitae viverra. Aenean eu augue quis massa faucibus auctor et ut metus. Praesent tincidunt risus ut ex convallis, non aliquam tortor euismod. Vestibulum congue, lorem vel vulputate tempus, enim magna eleifend orci, id semper diam orci at lorem. Curabitur eget metus faucibus neque facilisis scelerisque.

Proin in mi scelerisque, luctus ante vel, rutrum odio. Curabitur placerat sit amet dui in fringilla. Morbi bibendum feugiat ultrices. Mauris pharetra ullamcorper ante vel semper. Mauris pulvinar, purus non egestas ornare, nibh purus vestibulum enim, nec feugiat nibh orci non ante. Praesent elementum mattis elit, eget facilisis dolor. Ut eget posuere lacus, nec ultricies dolor. Nunc a nunc eu felis dictum molestie. Etiam bibendum, dolor at vestibulum ornare, nisi lorem pharetra odio, in lacinia orci mi non odio. Vestibulum quis vulputate augue, finibus elementum odio. Vestibulum quis porttitor enim, nec dapibus risus. In hac habitasse platea dictumst.

Nunc sollicitudin viverra se .
.
`;
