import { StyleSheet, View, TextInput, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { MovieCard } from '@/components/movie-card';
import { movies } from '@/data/movies';
import { Movie } from '@/types/movie';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const genres = ['All', 'Fantasy', 'Action', 'Adventure', 'Romance', 'Drama'];

  const handleMoviePress = (movie: Movie) => {
    router.push({
      pathname: '/movie/[id]',
      params: { id: movie.id },
    });
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      searchQuery === '' ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.titleChinese.includes(searchQuery) ||
      movie.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre =
      !selectedGenre ||
      selectedGenre === 'All' ||
      movie.genre.includes(selectedGenre);

    return matchesSearch && matchesGenre;
  });

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title">Search</ThemedText>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
        
          style={[
            styles.searchInput,
            {
              backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f0f0f0',
              color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
            },
          ]}
          placeholder="Search movies..."
          placeholderTextColor={colorScheme === 'dark' ? '#666' : '#999'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Genre Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.genreScroll}
        contentContainerStyle={styles.genreContainer}
      >
        {genres.map((genre) => (
          <Pressable
            key={genre}
            style={[
              styles.genreChip,
              selectedGenre === genre && styles.genreChipActive,
              {
                backgroundColor:
                  selectedGenre === genre
                    ? colorScheme === 'dark'
                      ? Colors.dark.tint
                      : Colors.light.tint
                    : colorScheme === 'dark'
                    ? '#1a1a1a'
                    : '#f0f0f0',
              },
            ]}
            onPress={() => setSelectedGenre(genre)}
          >
            <ThemedText
              style={[
                styles.genreText,
                selectedGenre === genre && styles.genreTextActive,
              ]}
            >
              {genre}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      {/* Results */}
      <ScrollView style={styles.resultsScroll}>
        <View style={styles.resultsGrid}>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <View key={movie.id} style={styles.movieCardWrapper}>
                <MovieCard
                  movie={movie}
                  width={160}
                  onPress={() => handleMoviePress(movie)}
                />
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <ThemedText style={styles.emptyText}>No movies found</ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  genreScroll: {
    maxHeight: 50,
    marginBottom: 16,
  },
  genreContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  genreChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  genreChipActive: {
    // Active style applied via backgroundColor
  },
  genreText: {
    fontSize: 14,
    fontWeight: '500',
  },
  genreTextActive: {
    color: '#fff',
  },
  resultsScroll: {
    flex: 1,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  movieCardWrapper: {
    marginBottom: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.5,
  },
});

