import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AnimeCard } from '@/components/anime-card';
import { Anime } from '@/lib/api/services/movies';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface AnimeSectionProps {
  title: string;
  animes: Anime[];
  onSeeAllPress?: () => void;
}

export function AnimeSection({ title, animes, onSeeAllPress }: AnimeSectionProps) {
  const colorScheme = useColorScheme();

  const handleAnimePress = (anime: Anime) => {
    router.push({
      pathname: '/series/[id]',
      params: { id: anime.slug },
    });
  };

  if (!animes || animes.length === 0) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>
        {onSeeAllPress && (
          <Pressable onPress={onSeeAllPress} style={styles.seeAllButton}>
            <ThemedText style={styles.seeAllText}>Xem tất cả</ThemedText>
            <IconSymbol 
              name="chevron.right" 
              size={16} 
              color={colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint} 
            />
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {animes.map((anime) => (
          <AnimeCard
            key={anime._id}
            anime={anime}
            onPress={() => handleAnimePress(anime)}
            width={150}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    opacity: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
});

