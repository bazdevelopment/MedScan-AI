import { useVideoPlayer, VideoView } from 'expo-video';
import { useRef } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

export default function VideoPlayer({
  videoSource,
  additionalVideoStyles = styles.video,
}: {
  videoSource: string;
  additionalVideoStyles?: ViewStyle;
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
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 180,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
});
