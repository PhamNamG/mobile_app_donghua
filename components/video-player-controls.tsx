import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';

interface VideoPlayerControlsProps {
  showControls: boolean;
  isPlaying: boolean;
  episodeNumber: string;
  seriesName: string;
  seriesNameChinese?: string;
  onPlayPause: () => void;
  onBack: () => void;
}

export const VideoPlayerControls: React.FC<VideoPlayerControlsProps> = ({
  showControls,
  isPlaying,
  episodeNumber,
  seriesName,
  seriesNameChinese,
  onPlayPause,
  onBack,
}) => {
  if (!showControls) return null;

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.7)']}
      className="absolute inset-0 justify-between"
    >
      {/* Top Bar */}
      <View className="flex-row justify-between items-center px-4 pt-12 pb-4">
        <Pressable
          onPress={onBack}
          className="w-10 h-10 rounded-full items-center justify-center bg-black/50"
        >
          <IconSymbol
            name="chevron.right"
            size={24}
            color="#fff"
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        </Pressable>

        <View className="flex-row gap-3">
          <Pressable className="w-10 h-10 rounded-full items-center justify-center bg-black/50">
            <IconSymbol name="heart.fill" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>

      {/* Play/Pause Button */}
      <View className="flex-1 items-center justify-center">
        <Pressable
          onPress={onPlayPause}
          className="w-16 h-16 rounded-full bg-white/90 items-center justify-center"
        >
          <IconSymbol
            name={isPlaying ? 'pause.fill' : 'play.fill'}
            size={32}
            color="#000"
            style={isPlaying ? {} : { marginLeft: 4 }}
          />
        </Pressable>
      </View>

      {/* Bottom Info */}
      <View className="px-4 pb-4">
        <Text className="text-white text-lg font-bold mb-1">
          Tập {episodeNumber}: {seriesName}
        </Text>
        {seriesNameChinese && (
          <Text className="text-white text-sm opacity-80">{seriesNameChinese}</Text>
        )}
      </View>
    </LinearGradient>
  );
};

