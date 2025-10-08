import { View, Text, ScrollView, Pressable, StatusBar, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAnimeById } from '@/hooks/api';
import { Ionicons } from '@expo/vector-icons';
import { EpisodesGrid } from '@/components/episodes-grid';
import React, { useMemo } from 'react';

// Sub-component cho các hàng thông tin chi tiết
const InfoRow = React.memo(({ label, value, isDark }: { label: string; value: string | null | undefined; isDark: boolean }) => {
  if (!value) return null;
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const labelColor = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <View className="flex-row justify-between items-start py-2 border-b border-gray-200/20 last:border-b-0">
      <Text className={`text-base ${labelColor} w-1/3`}>
        {label}
      </Text>
      <Text
        className={`text-base font-semibold text-right flex-1 ${textColor}`}
        numberOfLines={2}
      >
        {value}
      </Text>
    </View>
  );
});

// Component chính
export default function AnimeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError }: any = useAnimeById(id);
  const anime = data?.data;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const styles = useMemo(() => ({
    containerBg: isDark ? 'bg-gray-950' : 'bg-white',
    primaryText: isDark ? 'text-white' : 'text-gray-900',
    secondaryText: isDark ? 'text-gray-300' : 'text-gray-700',
    secondaryBg: isDark ? 'bg-gray-800' : 'bg-gray-100',
  }), [isDark]);

  const averageRating = anime?.rating?.length > 0
    ? anime.rating.reduce((acc: number, r: number) => acc + (r || 0), 0) / anime.rating.length
    : 0;

  const imgPoster = anime?.posters?.find((item: any) => item.coverPoster === 'cover');
  const backdropImage = imgPoster?.imageUrl || anime?.linkImg;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-950">
        <ActivityIndicator size="large" color="#ff4757" />
        <Text className="text-white text-lg mt-4">Đang tải...</Text>
      </View>
    );
  }

  if (isError || !anime) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-950 px-6">
        <Text className="text-white text-xl mb-6 text-center">⚠️ Không tìm thấy phim!</Text>
        <Pressable
          className="bg-red-600 px-8 py-3 rounded-xl shadow-lg shadow-red-500/50"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold text-base">Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  const handleEpisodePress = (episodeSlug: string) => {
    router.push({
      pathname: '/xem-phim/[id]',
      params: {
        id: episodeSlug
      },
    });
  };

  return (
    <View className={`flex-1 ${styles.containerBg}`}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Hero Section */}
      <View className="relative h-[350px]">
        <Image
          source={{ uri: backdropImage }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', isDark ? '#030712' : '#ffffff']}
          locations={[0.6, 1]}
          className="absolute inset-0"
        >
          {/* Header with Back Button */}
          <View className="flex-row items-center justify-between px-4 pt-14 z-20">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-black/40 items-center justify-center active:bg-black/60"
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
            <Pressable
              className="w-10 h-10 rounded-full bg-black/40 items-center justify-center active:bg-black/60"
            >
              <Ionicons name="bookmark-outline" size={20} color="#fff" />
            </Pressable>
          </View>
        </LinearGradient>
      </View>

      {/* Main Content Scrollable */}
      <ScrollView className="flex-1 -mt-20" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-12">

          {/* 1. Movie Header Info */}
          <View className="mb-4">
            <View className="flex-row mb-4">
              {/* Poster */}
              <Image
                source={{ uri: anime.linkImg }}
                style={{ width: 110, height: 165, borderRadius: 12 }}
                contentFit="cover"
              />

              {/* Title & Meta */}
              <View className="flex-1 ml-4 justify-center">
                <Text
                  className={`text-2xl font-extrabold mb-2 ${styles.primaryText}`}
                  numberOfLines={3}
                >
                  {anime.name}
                </Text>
                {anime.anotherName && (
                  <Text className={`text-sm mb-2 italic ${styles.secondaryText}`} numberOfLines={1}>
                    {anime.anotherName}
                  </Text>
                )}

                {/* Rating & Year */}
                <View className="flex-row items-center flex-wrap mb-3">
                  {averageRating > 0 && (
                    <View className="flex-row items-center mr-3">
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text className="text-yellow-500 text-base font-bold ml-1">
                        {averageRating.toFixed(1)}
                      </Text>
                    </View>
                  )}
                  {anime.year && (
                    <Text className={`text-sm font-medium ${styles.secondaryText}`}>{anime.year}</Text>
                  )}
                </View>

                {/* Badges */}
                <View className="flex-row gap-2 flex-wrap">
                  {anime.quality && (
                    <View className="bg-red-600 px-2.5 py-1 rounded-md">
                      <Text className="text-white text-xs font-bold">{anime.quality}</Text>
                    </View>
                  )}
                  {anime.lang && (
                    <View className="bg-blue-600 px-2.5 py-1 rounded-md">
                      <Text className="text-white text-xs font-bold">{anime.lang == "Vietsub" ? "Vietsub" : anime.lang == "ThuyetMinh" ? "Thuyết Minh" : anime.lang == "ThuyetMinh-Vietsub" ? "TM & Vietsub" : anime.lang}</Text>
                    </View>
                  )}
                  {anime.sumSeri && (
                    <View className={`px-2.5 py-1 rounded-md ${styles.secondaryBg}`}>
                      <Text className={`text-xs font-bold ${styles.primaryText}`}>{anime.sumSeri} tập</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* Action Buttons - Full Width */}
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => handleEpisodePress(anime.products?.[0]?.slug || '')}
                className="flex-1 bg-red-600 flex-row items-center justify-center py-3 rounded-xl active:bg-red-700"
              >
                <Ionicons name="play" size={20} color="#fff" />
                <Text className="text-white text-base font-bold ml-2">
                  Xem ngay
                </Text>
              </Pressable>

              <Pressable
                className={`w-14 h-14 items-center justify-center rounded-xl ${styles.secondaryBg} active:opacity-70`}
              >
                <Ionicons name="bookmark-outline" size={24} color={isDark ? '#fff' : '#000'} />
              </Pressable>

              <Pressable
                className={`w-14 h-14 items-center justify-center rounded-xl ${styles.secondaryBg} active:opacity-70`}
              >
                <Ionicons name="share-social-outline" size={24} color={isDark ? '#fff' : '#000'} />
              </Pressable>
            </View>
          </View>

           {/* 2. Episodes Grid (Chuyển lên đầu) */}
           <EpisodesGrid
             episodes={anime.products || []}
             isDark={isDark}
             title="Danh sách tập"
             showCount={true}
             maxHeight={280}
             columns={6}
             onEpisodePress={handleEpisodePress}
           />

          {/* 3. Description */}
          {anime.des && (
            <View className="mb-6">
              <Text className={`text-xl font-bold mb-3 ${styles.primaryText}`}>
                Nội dung
              </Text>
              <Text className={`text-base leading-relaxed ${styles.secondaryText}`}>
                {anime.des}
              </Text>
            </View>
          )}

          {/* 4. Tags */}
          {anime.tags?.length > 0 && (
            <View className="mb-6">
              <Text className={`text-xl font-bold mb-3 ${styles.primaryText}`}>
                Thể loại
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {anime.tags.map((tag: any) => (
                  <View
                    key={tag._id}
                    className={`px-3 py-1 rounded-full ${styles.secondaryBg}`}
                  >
                    <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                      {tag.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* 5. Info Grid */}
          <View className={`mb-6 p-4 rounded-xl ${styles.secondaryBg}`}>
            <Text className={`text-xl font-bold mb-2 ${styles.primaryText}`}>
              Thông tin chi tiết
            </Text>
            <View className="divide-y divide-gray-200/20">
              <InfoRow label="Tổng tập" value={anime.sumSeri ? `${anime.sumSeri} tập` : undefined} isDark={isDark} />
              <InfoRow label="Quốc gia" value={anime.country} isDark={isDark} />
              <InfoRow label="Thời lượng" value={anime.time} isDark={isDark} />
              <InfoRow label="Tổng thời gian" value={anime.hour} isDark={isDark} />
              <InfoRow
                label="Lịch chiếu"
                value={anime.week && Array.isArray(anime.week) ? anime.week.map((w: any) => w.name).join(', ') : anime.week}
                isDark={isDark}
              />
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}