import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { MovieCard } from '@/components/movie-card';
import { Movie } from '@/types/movie';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onMoviePress?: (movie: Movie) => void;
  onTitlePress?: () => void;
}

export function MovieSection({ title, movies, onMoviePress, onTitlePress }: MovieSectionProps) {
  if (movies.length === 0) return null;

  return (
    <View style={styles.container}>
      <Pressable onPress={onTitlePress} style={styles.titleContainer}>
        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>
        {onTitlePress && (
          <ThemedText style={styles.seeAll}>See All →</ThemedText>
        )}
      </Pressable>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onPress={() => onMoviePress?.(movie)}
            width={140}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    opacity: 0.6,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
});

