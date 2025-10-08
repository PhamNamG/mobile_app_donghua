import { View, Text, ScrollView, Pressable, StatusBar, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAnimeById } from '@/hooks/api';
import { Ionicons } from '@expo/vector-icons';
import stylesCategory from './style';

export default function AnimeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError }: any = useAnimeById(id);
  const anime = data?.data;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (isLoading) {
    return (
      <View style={stylesCategory.loadingContainer}>
        <ActivityIndicator size="large" color="#ff4757" />
        <Text style={stylesCategory.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  if (isError || !anime) {
    return (
      <View style={stylesCategory.errorContainer}>
        <Text style={stylesCategory.errorText}>⚠️ Không tìm thấy phim</Text>
        <Pressable style={stylesCategory.backButtonError} onPress={() => router.back()}>
          <Text style={stylesCategory.backButtonText}>Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  const handleEpisodePress = (episodeSlug: string) => {
    router.push({
      pathname: '/watch/[seriesId]/[episodeId]',
      params: {
        seriesId: anime._id,
        episodeId: episodeSlug
      },
    });
  };

  const averageRating = anime.rating?.length > 0
    ? anime.rating.reduce((acc: number, r: number) => acc + (r || 0), 0) / anime.rating.length
    : 0;

  const imgPoster = anime.posters?.find((item: any) => item.coverPoster === 'cover');
  const backdropImage = imgPoster?.imageUrl || anime.linkImg;

  return (
    <View style={[stylesCategory.container, isDark ? stylesCategory.containerDark : stylesCategory.containerLight]}>
      <StatusBar barStyle="light-content" />

      {/* Hero Section */}
      <View style={stylesCategory.heroSection}>
        <Image
          source={{ uri: backdropImage }}
          style={stylesCategory.backdrop}
          contentFit="cover"
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)', isDark ? '#0a0a0a' : '#f5f5f5']}
          locations={[0, 0.6, 1]}
          style={stylesCategory.gradient}
        >
          {/* Back Button */}
          <View style={stylesCategory.header}>
            <Pressable onPress={() => router.back()} style={stylesCategory.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
          </View>

          {/* Series Info */}
          <View style={stylesCategory.seriesInfo}>
            <Image
              source={{ uri: anime.linkImg }}
              style={stylesCategory.poster}
              contentFit="cover"
            />
            <View style={stylesCategory.seriesDetails}>
              <Text style={stylesCategory.seriesTitle} numberOfLines={2}>
                {anime.name}
              </Text>
              {anime.anotherName && (
                <Text style={stylesCategory.seriesTitleChinese}>{anime.anotherName}</Text>
              )}

              {/* Meta Info */}
              <View style={stylesCategory.metaRow}>
                {averageRating > 0 && (
                  <>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={stylesCategory.ratingText}>{averageRating.toFixed(1)}</Text>
                    <Text style={stylesCategory.metaDot}>•</Text>
                  </>
                )}
                <Text style={stylesCategory.metaText}>{anime.year}</Text>
                {anime.sumSeri && (
                  <>
                    <Text style={stylesCategory.metaDot}>•</Text>
                    <Text style={stylesCategory.metaText}>{anime.sumSeri} tập</Text>
                  </>
                )}
              </View>

               {/* Badges */}
               <View style={stylesCategory.badgeRow}>
                 {anime.quality && (
                   <View style={stylesCategory.qualityBadge}>
                     <Text style={stylesCategory.badgeText}>{anime.quality}</Text>
                   </View>
                 )}
                 {anime.lang && (
                   <View style={stylesCategory.langBadge}>
                     <Text style={stylesCategory.badgeText}>{anime.lang}</Text>
                   </View>
                 )}
               </View>

               {/* Action Buttons */}
               {/* <View style={stylesCategory.actionButtons}>
                 <Pressable 
                   style={stylesCategory.playButton}
                   onPress={() => {
                     if (anime.products && anime.products.length > 0) {
                       handleEpisodePress(anime.products[0].slug);
                     }
                   }}
                 >
                   <Ionicons name="play" size={18} color="#fff" />
                   <Text style={stylesCategory.playButtonText}>Xem ngay</Text>
                 </Pressable>

                 <Pressable style={stylesCategory.addToListButton}>
                   <Ionicons name="add" size={20} color="#fff" />
                   <Text style={stylesCategory.addToListButtonText}>Thêm vào</Text>
                 </Pressable>
               </View> */}
             </View>
           </View>
         </LinearGradient>
       </View>

      {/* Content */}
      <ScrollView style={stylesCategory.scrollView} showsVerticalScrollIndicator={false}>
        <View style={stylesCategory.content}>
     

          {/* Episodes */}
          {anime.products?.length > 0 && (
            <View style={stylesCategory.section}>
              <View style={stylesCategory.sectionHeader}>
                <Text style={[stylesCategory.sectionTitle, isDark ? stylesCategory.textWhite : stylesCategory.textGray900]}>
                  Danh sách tập
                </Text>
                <Text style={[stylesCategory.episodeCount, isDark ? stylesCategory.textGray400 : stylesCategory.textGray600]}>
                  {anime.products.length} tập
                </Text>
              </View>
              <ScrollView
                style={stylesCategory.episodeGrid}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              >
                <View style={stylesCategory.episodeGridContent}>
                  {anime.products.map((episode: any) => (
                    <Pressable
                      key={episode._id}
                      onPress={() => handleEpisodePress(episode.slug)}
                      style={[stylesCategory.episodeButton, isDark ? stylesCategory.episodeButtonDark : stylesCategory.episodeButtonLight]}
                    >
                      <Text style={[stylesCategory.episodeNumber, isDark ? stylesCategory.textWhite : stylesCategory.textGray900]}>
                        {episode.seri}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Info Grid */}
          <View style={stylesCategory.section}>
            <Text style={[stylesCategory.sectionTitle, isDark ? stylesCategory.textWhite : stylesCategory.textGray900]}>
              Thông tin
            </Text>
            <View style={stylesCategory.infoGrid}>
              {anime.time && (
                <View style={stylesCategory.infoItem}>
                  <Text style={[stylesCategory.infoLabel, isDark ? stylesCategory.textGray400 : stylesCategory.textGray600]}>
                    Thời lượng
                  </Text>
                  <Text style={[stylesCategory.infoValue, isDark ? stylesCategory.textWhite : stylesCategory.textGray900]}>
                    {anime.time}
                  </Text>
                </View>
              )}
              {anime.hour && (
                <View style={stylesCategory.infoItem}>
                  <Text style={[stylesCategory.infoLabel, isDark ? stylesCategory.textGray400 : stylesCategory.textGray600]}>
                    Tổng thời gian
                  </Text>
                  <Text style={[stylesCategory.infoValue, isDark ? stylesCategory.textWhite : stylesCategory.textGray900]}>
                    {anime.hour}
                  </Text>
                </View>
              )}
              {anime.week && (
                <View style={stylesCategory.infoItem}>
                  <Text style={[stylesCategory.infoLabel, isDark ? stylesCategory.textGray400 : stylesCategory.textGray600]}>
                    Lịch chiếu
                  </Text>
                  <Text style={[stylesCategory.infoValue, isDark ? stylesCategory.textWhite : stylesCategory.textGray900]}>
                    {Array.isArray(anime.week) ? anime.week.map((w: any) => w.name).join(', ') : anime.week}
                  </Text>
                </View>
              )}
              {anime.country && (
                <View style={stylesCategory.infoItem}>
                  <Text style={[stylesCategory.infoLabel, isDark ? stylesCategory.textGray400 : stylesCategory.textGray600]}>
                    Quốc gia
                  </Text>
                  <Text style={[stylesCategory.infoValue, isDark ? stylesCategory.textWhite : stylesCategory.textGray900]}>
                    {anime.country}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Tags */}
          {anime.tags?.length > 0 && (
            <View style={stylesCategory.section}>
              <Text style={[stylesCategory.sectionTitle, isDark ? stylesCategory.textWhite : stylesCategory.textGray900]}>
                Thể loại
              </Text>
              <View style={stylesCategory.tagsContainer}>
                {anime.tags.map((tag: any) => (
                  <View key={tag._id} style={stylesCategory.tag}>
                    <Text style={[stylesCategory.tagText, isDark ? stylesCategory.textGray300 : stylesCategory.textGray700]}>
                      {tag.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
              {/* Description */}
              {anime.des && (
            <View style={stylesCategory.section}>
              <Text style={[stylesCategory.sectionTitle, isDark ? stylesCategory.textWhite : stylesCategory.textGray900]}>
                Nội dung
              </Text>
              <Text style={[stylesCategory.description, isDark ? stylesCategory.textGray300 : stylesCategory.textGray700]}>
                {anime.des}
              </Text>
            </View>
          )}

        </View>

        <View style={stylesCategory.bottomSpacing} />
      </ScrollView>
    </View>
  );
}