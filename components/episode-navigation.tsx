import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

interface EpisodeNavigationProps {
  prevEpisode?: string | null;
  nextEpisode?: string | null;
  isDark: boolean;
}

export const EpisodeNavigation: React.FC<EpisodeNavigationProps> = ({
  prevEpisode,
  nextEpisode,
  isDark,
}) => {
  if (!prevEpisode && !nextEpisode) return null;

  const handlePrevEpisode = () => {
    if (prevEpisode) {
      router.push({
        pathname: '/xem-phim/[id]',
        params: { id: prevEpisode }
      });
    }
  };

  const handleNextEpisode = () => {
    if (nextEpisode) {
      router.push({
        pathname: '/xem-phim/[id]',
        params: { id: nextEpisode }
      });
    }
  };

  return (
    <View className="flex-row gap-3 px-4 py-3 bg-black/50">
      <Pressable
        onPress={handlePrevEpisode}
        disabled={!prevEpisode}
        className={`flex-1 py-3 rounded-lg items-center justify-center ${
          prevEpisode ? 'bg-gray-700 active:bg-gray-600' : 'bg-gray-800 opacity-50'
        }`}
      >
        <Text className="text-white font-semibold">← Tập trước</Text>
      </Pressable>
      
      <Pressable
        onPress={handleNextEpisode}
        disabled={!nextEpisode}
        className={`flex-1 py-3 rounded-lg items-center justify-center ${
          nextEpisode ? 'bg-red-600 active:bg-red-700' : 'bg-gray-800 opacity-50'
        }`}
      >
        <Text className="text-white font-semibold">Tập tiếp →</Text>
      </Pressable>
    </View>
  );
};

