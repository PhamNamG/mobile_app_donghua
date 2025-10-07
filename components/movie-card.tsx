import { Image } from 'expo-image';
import { StyleSheet, Pressable, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Movie } from '@/types/movie';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void;
  width?: number;
}

export function MovieCard({ movie, onPress, width = 150 }: MovieCardProps) {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint;

  return (
    <Pressable 
      style={[styles.container, { width }]} 
      onPress={onPress}
      android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
    >
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, { width, height: width * 1.5 }]}
          contentFit="cover"
          transition={300}
        />
        {movie.isNew && (
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>NEW</ThemedText>
          </View>
        )}
        {movie.isHot && !movie.isNew && (
          <View style={[styles.badge, styles.hotBadge]}>
            <ThemedText style={styles.badgeText}>HOT</ThemedText>
          </View>
        )}
      </View>
      
      <View style={styles.info}>
        <ThemedText style={styles.title} numberOfLines={2}>
          {movie.title}
        </ThemedText>
        <ThemedText style={styles.titleChinese} numberOfLines={1}>
          {movie.titleChinese}
        </ThemedText>
        
        <View style={styles.meta}>
          <View style={styles.rating}>
            <IconSymbol name="star.fill" size={12} color="#FFD700" />
            <ThemedText style={styles.ratingText}>{movie.rating.toFixed(1)}</ThemedText>
          </View>
          <ThemedText style={styles.year}>{movie.year}</ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  posterContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  poster: {
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  hotBadge: {
    backgroundColor: '#ff6348',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  info: {
    marginTop: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  titleChinese: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFD700',
  },
  year: {
    fontSize: 11,
    opacity: 0.6,
  },
});

