import { Image } from 'expo-image';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { Movie } from '@/types/movie';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = SCREEN_WIDTH * 0.75;

interface FeaturedBannerProps {
  movie: Movie;
  onPress?: () => void;
}

export function FeaturedBanner({ movie, onPress }: FeaturedBannerProps) {
  const colorScheme = useColorScheme();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: movie.backdrop || movie.poster }}
        style={styles.backdrop}
        contentFit="cover"
        
      />
      
      <LinearGradient
        colors={[
          'transparent',
          colorScheme === 'dark' ? 'rgba(21, 23, 24, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          colorScheme === 'dark' ? '#151718' : '#fff',
        ]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.badge}>
            <IconSymbol name="star.fill" size={16} color="#fff" />
            <ThemedText style={styles.badgeText}>FEATURED</ThemedText>
          </View>

          <ThemedText type="title" style={styles.title}>
            {movie.title}
          </ThemedText>
          
          <ThemedText style={styles.titleChinese}>
            {movie.titleChinese}
          </ThemedText>

          <View style={styles.meta}>
            <View style={styles.rating}>
              <IconSymbol name="star.fill" size={14} color="#FFD700" />
              <ThemedText style={styles.ratingText}>{movie.rating.toFixed(1)}</ThemedText>
            </View>
            <ThemedText style={styles.metaText}>•</ThemedText>
            <ThemedText style={styles.metaText}>{movie.year}</ThemedText>
            <ThemedText style={styles.metaText}>•</ThemedText>
            <ThemedText style={styles.metaText}>{movie.duration}m</ThemedText>
          </View>

          <ThemedText style={styles.description} numberOfLines={3}>
            {movie.description}
          </ThemedText>

          <View style={styles.genreContainer}>
            {movie.genre.slice(0, 3).map((genre, index) => (
              <View key={index} style={styles.genreTag}>
                <ThemedText style={styles.genreText}>{genre}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    marginBottom: 16,
  },
  backdrop: {
    width: SCREEN_WIDTH,
    height: BANNER_HEIGHT,
    position: 'absolute',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 20,
    paddingBottom: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4757',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  titleChinese: {
    fontSize: 18,
    opacity: 0.8,
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFD700',
  },
  metaText: {
    fontSize: 13,
    opacity: 0.7,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.85,
    marginBottom: 12,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  genreText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

