import { View, Text, ScrollView, Pressable, StatusBar, Dimensions, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useRef } from 'react';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { movies } from '@/data/movies';
import { series } from '@/data/series';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MoviePlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const videoRef = useRef<Video>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  // Try to find in movies first
  let movie = movies.find((m) => m.id === id);
  let isEpisode = false;
  let episodeData = null;
  let seriesData = null;
  
  // If not found in movies, try to find in episodes
  if (!movie) {
    for (const s of series) {
      const episode = s.episodes.find((ep) => ep.id === id);
      if (episode) {
        isEpisode = true;
        episodeData = episode;
        seriesData = s;
        // Create a movie-like object from episode
        movie = {
          id: episode.id,
          title: episode.title,
          titleChinese: episode.titleChinese,
          poster: episode.thumbnail,
          backdrop: s.backdrop,
          rating: s.rating,
          year: s.year,
          duration: episode.duration,
          genre: s.genre,
          description: episode.description || s.description,
          director: s.director,
          studio: s.studio,
        };
        break;
      }
    }
  }

  if (!movie) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Content not found</Text>
      </View>
    );
  }

  // Demo video URL - replace with actual movie video URL
  const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  
  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoPress = () => {
    setShowControls(!showControls);
  };

  const handleBack = () => {
    router.back();
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
    }
  };

  // Related content
  let relatedMovies = movies
    .filter((m) => m.id !== movie.id && m.genre.some((g) => movie.genre.includes(g)))
    .slice(0, 6);
  
  // If this is an episode, show other episodes from the same series
  const otherEpisodes = isEpisode && seriesData 
    ? seriesData.episodes.filter((ep) => ep.id !== id)
    : [];

  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <StatusBar hidden />
      
      {/* Video Player */}
      <Pressable onPress={handleVideoPress} style={styles.videoWrapper}>
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />

        {/* Video Controls Overlay */}
        {showControls && (
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.7)']}
            style={styles.controlsOverlay}
          >
            {/* Top Bar */}
            <View style={styles.topBar}>
              <Pressable 
                onPress={handleBack}
                style={styles.topBarButton}
              >
                <IconSymbol 
                  name="chevron.right" 
                  size={24} 
                  color="#fff"
                  style={{ transform: [{ rotate: '180deg' }] }}
                />
              </Pressable>
              
              <View style={styles.topBarActions}>
                <Pressable style={styles.topBarButton}>
                  <IconSymbol name="heart.fill" size={20} color="#fff" />
                </Pressable>
              </View>
            </View>

            {/* Play/Pause Button */}
            <View style={styles.playPauseContainer}>
              <Pressable 
                onPress={handlePlayPause}
                style={styles.playPauseButton}
              >
                <IconSymbol 
                  name="house.fill" 
                  size={32} 
                  color="#fff"
                />
              </Pressable>
            </View>

            {/* Bottom Info */}
            <View style={styles.videoBottomInfo}>
              <Text style={styles.videoTitle}>
                {isEpisode && episodeData ? `Tập ${episodeData.episodeNumber}: ${movie.title}` : movie.title}
              </Text>
              <Text style={styles.videoTitleChinese}>{movie.titleChinese}</Text>
            </View>
          </LinearGradient>
        )}
      </Pressable>

      {/* Movie Details */}
      <ScrollView 
        style={[styles.scrollView, isDark ? styles.scrollViewDark : styles.scrollViewLight]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Title & Rating */}
          <View style={styles.titleSection}>
            <View style={styles.titleContainer}>
              <Text style={[styles.movieTitleLarge, isDark ? styles.textWhite : styles.textGray900]}>
                {movie.title}
              </Text>
              <Text style={[styles.movieSubtitle, isDark ? styles.textGray400 : styles.textGray600]}>
                {movie.titleChinese}
              </Text>
            </View>
            
            <View style={styles.ratingBadge}>
              <View style={styles.ratingBadgeInner}>
                <IconSymbol name="star.fill" size={16} color="#FFD700" />
                <Text style={styles.ratingBadgeText}>
                  {movie.rating.toFixed(1)}
                </Text>
              </View>
            </View>
          </View>

          {/* Meta Info */}
          <View style={styles.metaInfo}>
            <View style={[styles.metaTag, isDark ? styles.metaTagDark : styles.metaTagLight]}>
              <Text style={[styles.metaText, isDark ? styles.textGray300 : styles.textGray700]}>
                {movie.year}
              </Text>
            </View>
            <View style={[styles.metaTag, isDark ? styles.metaTagDark : styles.metaTagLight]}>
              <Text style={[styles.metaText, isDark ? styles.textGray300 : styles.textGray700]}>
                {movie.duration} min
              </Text>
            </View>
            {movie.genre.map((genre, index) => (
              <View 
                key={index}
                style={[styles.metaTag, styles.genreTag]}
              >
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Pressable style={styles.playButton}>
              <View style={styles.buttonContent}>
                <IconSymbol name="house.fill" size={20} color="#fff" />
                <Text style={styles.playButtonText}>Play</Text>
              </View>
            </Pressable>
            
            <Pressable style={[styles.watchlistButton, isDark ? styles.watchlistButtonDark : styles.watchlistButtonLight]}>
              <View style={styles.buttonContent}>
                <IconSymbol name="bookmark.fill" size={20} color={isDark ? '#fff' : '#000'} />
                <Text style={[styles.watchlistButtonText, isDark ? styles.textWhite : styles.textGray900]}>
                  Watchlist
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark ? styles.textWhite : styles.textGray900]}>
              Synopsis
            </Text>
            <Text style={[styles.description, isDark ? styles.textGray300 : styles.textGray700]}>
              {movie.description}
            </Text>
          </View>

          {/* Director & Studio */}
          <View style={styles.section}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, isDark ? styles.textGray400 : styles.textGray600]}>
                Director:
              </Text>
              <Text style={[styles.infoValue, isDark ? styles.textWhite : styles.textGray900]}>
                {movie.director}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, isDark ? styles.textGray400 : styles.textGray600]}>
                Studio:
              </Text>
              <Text style={[styles.infoValue, isDark ? styles.textWhite : styles.textGray900]}>
                {movie.studio}
              </Text>
            </View>
          </View>

          {/* Other Episodes (if this is an episode) */}
          {otherEpisodes.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, isDark ? styles.textWhite : styles.textGray900]}>
                Các tập khác
              </Text>
              
              {otherEpisodes.map((episode) => (
                <Pressable
                  key={episode.id}
                  onPress={() => router.push({ pathname: '/movie/[id]', params: { id: episode.id } })}
                  style={[styles.episodeItem, isDark ? styles.episodeItemDark : styles.episodeItemLight]}
                >
                  <View style={styles.episodeThumbnailContainer}>
                    <Image
                      source={{ uri: episode.thumbnail }}
                      style={styles.episodeThumbnail}
                      contentFit="cover"
                    />
                  </View>
                  <View style={styles.episodeInfoContainer}>
                    <Text style={[styles.episodeTitle, isDark ? styles.textWhite : styles.textGray900]}>
                      Tập {episode.episodeNumber}: {episode.title}
                    </Text>
                    <Text style={[styles.episodeDuration, isDark ? styles.textGray400 : styles.textGray600]}>
                      {episode.duration} phút
                    </Text>
                  </View>
                  {episode.isWatched && (
                    <View style={styles.episodeWatched}>
                      <IconSymbol name="checkmark.circle.fill" size={20} color="#10b981" />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          )}

          {/* Related Movies */}
          {relatedMovies.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, isDark ? styles.textWhite : styles.textGray900]}>
                More Like This
              </Text>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.relatedScrollContent}
              >
                {relatedMovies.map((relatedMovie) => (
                  <Pressable
                    key={relatedMovie.id}
                    onPress={() => router.push({ pathname: '/movie/[id]', params: { id: relatedMovie.id } })}
                    style={styles.relatedMovieCard}
                  >
                    <View style={styles.relatedMoviePoster}>
                      <Image
                        source={{ uri: relatedMovie.poster }}
                        style={styles.relatedMoviePosterImage}
                        contentFit="cover"
                      />
                    </View>
                    <Text 
                      style={[styles.relatedMovieTitle, isDark ? styles.textWhite : styles.textGray900]}
                      numberOfLines={2}
                    >
                      {relatedMovie.title}
                    </Text>
                    <View style={styles.relatedMovieRating}>
                      <IconSymbol name="star.fill" size={10} color="#FFD700" />
                      <Text style={styles.relatedMovieRatingText}>
                        {relatedMovie.rating.toFixed(1)}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}
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
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
  },
  notFoundText: {
    color: '#fff',
    fontSize: 18,
  },
  videoWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * (9 / 16),
    backgroundColor: '#000',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewDark: {
    backgroundColor: '#0a0a0a',
  },
  scrollViewLight: {
    backgroundColor: '#f9fafb',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  topBarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  topBarActions: {
    flexDirection: 'row',
    gap: 12,
  },
  playPauseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoBottomInfo: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  videoTitleChinese: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  // Content styles
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  movieTitleLarge: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  movieSubtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  ratingBadge: {
    alignItems: 'center',
    marginLeft: 16,
  },
  ratingBadgeInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingBadgeText: {
    color: '#eab308',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  metaTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  metaTagDark: {
    backgroundColor: '#1f2937',
  },
  metaTagLight: {
    backgroundColor: '#e5e7eb',
  },
  genreTag: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  metaText: {
    fontSize: 12,
  },
  genreText: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  playButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchlistButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchlistButtonDark: {
    backgroundColor: '#1f2937',
  },
  watchlistButtonLight: {
    backgroundColor: '#e5e7eb',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  watchlistButtonText: {
    fontWeight: 'bold',
    marginLeft: 8,
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
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 96,
    fontSize: 14,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  episodeItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  episodeItemDark: {
    backgroundColor: '#1f2937',
  },
  episodeItemLight: {
    backgroundColor: '#ffffff',
  },
  episodeThumbnailContainer: {
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#374151',
  },
  episodeThumbnail: {
    width: 80,
    height: 48,
  },
  episodeInfoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  episodeTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  episodeDuration: {
    fontSize: 12,
    marginTop: 4,
  },
  episodeWatched: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  relatedScrollContent: {
    paddingRight: 16,
  },
  relatedMovieCard: {
    width: 128,
    marginRight: 12,
  },
  relatedMoviePoster: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1f2937',
  },
  relatedMoviePosterImage: {
    width: 128,
    aspectRatio: 2 / 3,
  },
  relatedMovieTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  relatedMovieRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  relatedMovieRatingText: {
    fontSize: 12,
    color: '#eab308',
    marginLeft: 4,
  },
  bottomSpacing: {
    height: 32,
  },
  // Text colors
  textWhite: { color: '#ffffff' },
  textGray900: { color: '#111827' },
  textGray700: { color: '#374151' },
  textGray600: { color: '#4b5563' },
  textGray400: { color: '#9ca3af' },
  textGray300: { color: '#d1d5db' },
});
