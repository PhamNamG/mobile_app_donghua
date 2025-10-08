import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AnimeCard } from '@/components/anime-card';
import { Anime } from '@/lib/api/services/movies';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PADDING_HORIZONTAL = 16;
const GAP = 12;
const COLUMNS = 2; // 2 cột trên 1 hàng
const CARD_WIDTH = (SCREEN_WIDTH - PADDING_HORIZONTAL * 2 - GAP) / COLUMNS;

interface AnimeSectionProps {
  title: string;
  animes: Anime[];
  onSeeAllPress?: () => void;
}

export function AnimeSection({ title, animes, onSeeAllPress }: AnimeSectionProps) {
  const colorScheme = useColorScheme();

  const handleAnimePress = (anime: Anime) => {
    router.push({
      pathname: '/phim/[id]',
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

      <View style={styles.scrollContent}>
        {animes.map((anime) => (
          <AnimeCard
            key={anime._id}
            anime={anime}
            onPress={() => handleAnimePress(anime)}
            width={CARD_WIDTH}
          />
        ))}
      </View>
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
    paddingHorizontal: PADDING_HORIZONTAL,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    justifyContent: 'space-between',
  },
});

