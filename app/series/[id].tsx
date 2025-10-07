import { View, Text, ScrollView, Pressable, StatusBar, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { series } from '@/data/series';
import { Series, Episode } from '@/types/movie';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SeriesDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  
  const seriesItem = series.find((s) => s.id === id);

  if (!seriesItem) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Series not found</Text>
      </View>
    );
  }

  const handleEpisodePress = (episodeId: string) => {
    router.push({
      pathname: '/watch/[seriesId]/[episodeId]',
      params: { seriesId: seriesItem.id, episodeId },
    });
  };

  const handleBack = () => {
    router.back();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return '#f97316';
      case 'completed': return '#10b981';
      case 'upcoming': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ongoing': return 'Đang chiếu';
      case 'completed': return 'Hoàn thành';
      case 'upcoming': return 'Sắp ra mắt';
      default: return status;
    }
  };

  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <StatusBar hidden />
      
      {/* Hero Section with Backdrop */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: seriesItem.backdrop || seriesItem.poster }}
          style={styles.backdrop}
          contentFit="cover"
        />
        
        <LinearGradient
          colors={[
            'transparent',
            isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            isDark ? '#0a0a0a' : '#f9fafb',
          ]}
          style={styles.gradient}
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable 
              onPress={handleBack}
              style={styles.backButton}
            >
              <IconSymbol 
                name="chevron.right" 
                size={24} 
                color="#fff"
                style={{ transform: [{ rotate: '180deg' }] }}
              />
            </Pressable>
          </View>

          {/* Series Info */}
          <View style={styles.seriesInfo}>
            <Image
              source={{ uri: seriesItem.poster }}
              style={styles.poster}
              contentFit="cover"
            />
            
            <View style={styles.seriesDetails}>
              <View style={styles.seriesHeader}>
                <Text style={styles.seriesTitle}>{seriesItem.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(seriesItem.status) }]}>
                  <Text style={styles.statusText}>
                    {getStatusText(seriesItem.status)}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.seriesTitleChinese}>{seriesItem.titleChinese}</Text>
              
              <View style={styles.ratingContainer}>
                <IconSymbol name="star.fill" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{seriesItem.rating.toFixed(1)}</Text>
                <Text style={styles.metaText}>• {seriesItem.year} • {seriesItem.totalEpisodes} tập</Text>
              </View>
              
              {/* Genre Tags */}
              <View style={styles.genreContainer}>
                {seriesItem.genre.map((genre, index) => (
                  <View key={index} style={styles.genreTag}>
                    <Text style={styles.genreText}>{genre}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark ? styles.textWhite : styles.textGray900]}>
              Nội dung
            </Text>
            <Text style={[styles.description, isDark ? styles.textGray300 : styles.textGray700]}>
              {seriesItem.description}
            </Text>
          </View>

          {/* Series Info */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark ? styles.textWhite : styles.textGray900]}>
              Thông tin
            </Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, isDark ? styles.textGray400 : styles.textGray600]}>
                  Đạo diễn
                </Text>
                <Text style={[styles.infoValue, isDark ? styles.textWhite : styles.textGray900]}>
                  {seriesItem.director}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, isDark ? styles.textGray400 : styles.textGray600]}>
                  Studio
                </Text>
                <Text style={[styles.infoValue, isDark ? styles.textWhite : styles.textGray900]}>
                  {seriesItem.studio}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, isDark ? styles.textGray400 : styles.textGray600]}>
                  Năm sản xuất
                </Text>
                <Text style={[styles.infoValue, isDark ? styles.textWhite : styles.textGray900]}>
                  {seriesItem.year}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, isDark ? styles.textGray400 : styles.textGray600]}>
                  Trạng thái
                </Text>
                <Text style={[styles.infoValue, { color: getStatusColor(seriesItem.status) }]}>
                  {getStatusText(seriesItem.status)}
                </Text>
              </View>
            </View>
          </View>

          {/* Episodes */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark ? styles.textWhite : styles.textGray900]}>
              Danh sách tập ({seriesItem.episodes.length})
            </Text>
            
            {seriesItem.episodes.map((episode, index) => (
              <Pressable
                key={episode.id}
                onPress={() => handleEpisodePress(episode.id)}
                style={[styles.episodeCard, isDark ? styles.episodeCardDark : styles.episodeCardLight]}
              >
                <Image
                  source={{ uri: episode.thumbnail }}
                  style={styles.episodeThumbnail}
                  contentFit="cover"
                />
                
                <View style={styles.episodeInfo}>
                  <View style={styles.episodeHeader}>
                    <Text style={[styles.episodeTitle, isDark ? styles.textWhite : styles.textGray900]}>
                      {episode.title}
                    </Text>
                    <Text style={[styles.episodeNumber, isDark ? styles.textGray400 : styles.textGray600]}>
                      Tập {episode.episodeNumber}
                    </Text>
                  </View>
                  
                  <Text style={[styles.episodeTitleChinese, isDark ? styles.textGray400 : styles.textGray600]}>
                    {episode.titleChinese}
                  </Text>
                  
                  {episode.description && (
                    <Text style={[styles.episodeDescription, isDark ? styles.textGray300 : styles.textGray700]} numberOfLines={2}>
                      {episode.description}
                    </Text>
                  )}
                  
                  <View style={styles.episodeMeta}>
                    <Text style={[styles.episodeDuration, isDark ? styles.textGray500 : styles.textGray600]}>
                      {episode.duration} phút
                    </Text>
                    {episode.isWatched && (
                      <View style={styles.watchedBadge}>
                        <IconSymbol name="star.fill" size={12} color="#10b981" />
                        <Text style={styles.watchedText}>Đã xem</Text>
                      </View>
                    )}
                  </View>
                </View>
                
                <View style={styles.playButton}>
                  <IconSymbol name="house.fill" size={20} color="#fff" />
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        
        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDark: {
    backgroundColor: '#0a0a0a',
  },
  containerLight: {
    backgroundColor: '#f9fafb',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
  },
  heroSection: {
    height: 400,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    position: 'absolute',
    top: 48,
    left: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  seriesInfo: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 24,
  },
  poster: {
    width: 120,
    height: 168,
    borderRadius: 8,
    backgroundColor: '#1f2937',
  },
  seriesDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'flex-end',
  },
  seriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  seriesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  seriesTitleChinese: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFD700',
    marginLeft: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
    marginLeft: 8,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  genreTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  genreText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    width: '48%',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  episodeCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  episodeCardDark: {
    backgroundColor: '#1a1a1a',
  },
  episodeCardLight: {
    backgroundColor: '#ffffff',
  },
  episodeThumbnail: {
    width: 80,
    height: 45,
    borderRadius: 6,
    backgroundColor: '#1f2937',
  },
  episodeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  episodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  episodeTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  episodeNumber: {
    fontSize: 12,
    marginLeft: 8,
  },
  episodeTitleChinese: {
    fontSize: 12,
    marginBottom: 4,
  },
  episodeDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
  },
  episodeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  episodeDuration: {
    fontSize: 11,
  },
  watchedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  watchedText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500',
    marginLeft: 2,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  // Text colors
  textWhite: { color: '#ffffff' },
  textGray900: { color: '#111827' },
  textGray700: { color: '#374151' },
  textGray600: { color: '#4b5563' },
  textGray500: { color: '#6b7280' },
  textGray400: { color: '#9ca3af' },
  textGray300: { color: '#d1d5db' },
  bottomSpacing: {
    height: 32,
  },
});
