import { useVideoPlayer, type VideoSource, VideoView } from 'expo-video';
import { useRef } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import TapToViewLabel from '../tap-to-view-label';

export default function VideoPlayer({
  videoSource,
  additionalVideoStyles = styles.video,
  onTapToView,
}: {
  videoSource: VideoSource;
  additionalVideoStyles?: ViewStyle;
  className?: string;
  onTapToView?: () => void;
}) {
  const ref = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(true);
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View className="justify-center-items-center">
      <VideoView
        ref={ref}
        style={additionalVideoStyles}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      {!!onTapToView && (
        <TapToViewLabel
          onTapToView={onTapToView}
          className="absolute bottom-10 right-6"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 220,
    borderRadius: 20,
  },
});
