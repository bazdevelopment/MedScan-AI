import { useVideoPlayer, type VideoSource, VideoView } from 'expo-video';
import { useRef } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import TapToViewLabel from '../tap-to-view-label';

export default function VideoPlayer({
  videoSource,
  additionalVideoStyles = styles.video,
  onTapToView,
  showAdditionalInfo,
}: {
  videoSource: VideoSource;
  additionalVideoStyles?: ViewStyle;
  className?: string;
  onTapToView?: () => void;
  showAdditionalInfo?: boolean;
}) {
  const ref = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(true);
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    // player.play();
  });

  return (
    <View>
      <VideoView
        ref={ref}
        style={additionalVideoStyles}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        contentFit="fill"
      />
      {!!onTapToView && (
        <TapToViewLabel
          onTapToView={onTapToView}
          className={`absolute ${showAdditionalInfo ? 'bottom-10' : 'bottom-8'} right-6`}
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
