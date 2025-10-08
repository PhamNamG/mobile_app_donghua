import { View, Text, ScrollView, Pressable, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAnimeEpisodeById } from '@/hooks';
import { IframeVideoPlayer } from '@/components/iframe-video-player';
import { EpisodeNavigation } from '@/components/episode-navigation';
import { EpisodesGrid } from '@/components/episodes-grid';
import React from 'react';


export default function MoviePlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError }: any = useAnimeEpisodeById(id);
  const colorScheme = useColorScheme();

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-950">
        <Text className="text-white text-lg">Đang tải...</Text>
      </View>
    );
  }

  // Error or no data
  if (isError || !data?.data) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-950">
        <Text className="text-white text-lg">Không tìm thấy tập phim</Text>
      </View>
    );
  }

  // Extract data
  const episode = data.data;
  const seriesData = episode.category;
  const currentEpisodeSlug = episode.slug;
  const episodeNumber = episode.seri;
  const videoUrl = episode.dailyMotionServer;
  const nextEpisode = episode.nextEpisode;
  const prevEpisode = episode.prevEpisode;
  const allEpisodes = seriesData?.products || [];
  const isDark = colorScheme === 'dark';

  const handleBack = () => {
    router.back();
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <StatusBar hidden />

      {/* Video Player với Iframe */}
      <IframeVideoPlayer
        videoUrl={videoUrl}
        episodeNumber={episodeNumber}
        seriesName={seriesData?.name}
        seriesNameChinese={seriesData?.anotherName}
        onBack={handleBack}
      />

      {/* Episode Navigation */}
      {/* <EpisodeNavigation
        prevEpisode={prevEpisode}
        nextEpisode={nextEpisode}
        isDark={isDark}
      /> */}

      {/* Movie Details */}
      <ScrollView
        className={`flex-1 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 pt-6 pb-4">
          {/* Title & Episode Info */}
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1">
              <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {seriesData?.name + ' - Tập ' + episodeNumber}
              </Text>
              {seriesData?.anotherName && (
                <Text className={`text-base mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {seriesData.anotherName}
                </Text>
              )}
              <Text className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Tập {episodeNumber}/{seriesData?.sumSeri || '?'}
              </Text>
            </View>

            {episode.view && (
              <View className="items-center ml-4">
                <View className="flex-row items-center bg-yellow-400/20 px-3 py-1.5 rounded-full">
                  <IconSymbol name="eye.fill" size={16} color="#facc15" />
                  <Text className="text-yellow-400 font-bold ml-1 text-base">
                    {episode.view}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Meta Info */}
          <View className="flex-row flex-wrap gap-2 mb-6">
            {seriesData?.year && (
              <View className={`px-3 py-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <Text className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {seriesData.year}
                </Text>
              </View>
            )}
            {seriesData?.time && (
              <View className={`px-3 py-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <Text className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {seriesData.time}
                </Text>
              </View>
            )}
            {seriesData?.quality && (
              <View className="px-3 py-1.5 rounded-full bg-red-600">
                <Text className="text-xs font-bold text-white">{seriesData.quality}</Text>
              </View>
            )}
            {seriesData?.lang && (
              <View className="px-3 py-1.5 rounded-full bg-blue-600">
                <Text className="text-xs font-bold text-white">{seriesData.lang}</Text>
              </View>
            )}
            {seriesData?.tags?.map((tag: any) => (
              <View
                key={tag._id}
                className="px-3 py-1.5 rounded-full bg-purple-600/20"
              >
                <Text className="text-xs font-medium text-purple-400">{tag.name}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          {seriesData?.des && (
            <View className="mb-6">
              <Text className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Nội dung
              </Text>
              <Text className={`text-sm leading-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {seriesData.des}
              </Text>
            </View>
          )}

          {/* Series Info */}
          <View className="mb-6">
            {seriesData?.sumSeri && (
              <View className="flex-row mb-2">
                <Text className={`w-32 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tổng số tập:
                </Text>
                <Text className={`flex-1 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {seriesData.sumSeri} tập
                </Text>
              </View>
            )}
            {seriesData?.status && (
              <View className="flex-row mb-2">
                <Text className={`w-32 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Trạng thái:
                </Text>
                <Text className={`flex-1 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {seriesData.status === 'pending' ? 'Đang cập nhật' : 'Hoàn thành'}
                </Text>
              </View>
            )}
            {episode.uploadDate && (
              <View className="flex-row mb-2">
                <Text className={`w-32 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Ngày đăng:
                </Text>
                <Text className={`flex-1 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {new Date(episode.uploadDate).toLocaleDateString('vi-VN')}
                </Text>
              </View>
            )}
          </View>

          {/* Episodes Grid */}
          <EpisodesGrid
            episodes={allEpisodes}
            currentSlug={currentEpisodeSlug}
            isDark={isDark}
            title="Danh sách tập"
            showCount={true}
            maxHeight={300}
            columns={6}
            onEpisodePress={(slug) => router.push({
              pathname: '/xem-phim/[id]',
              params: { id: slug }
            })}
          />
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}