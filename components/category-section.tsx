import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { Category } from '@/types/movie';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CategorySectionProps {
  title: string;
  categories: Category[];
  onCategoryPress?: (categoryId: string, categoryTitle: string) => void;
  onTitlePress?: () => void;
}

export function CategorySection({ title, categories, onCategoryPress, onTitlePress }: CategorySectionProps) {
  const colorScheme = useColorScheme();
  
  if (categories.length === 0) return null;

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
        {categories.map((category) => {
          const series = category.series && category.series.length > 0 ? category.series[0] : null;
          if (!series) return null;
          
          return (
            <Pressable
              key={category.id}
              style={styles.card}
              onPress={() => onCategoryPress?.(category.id, category.title)}
            >
              <View style={styles.posterContainer}>
                <Image
                  source={{ uri: series.poster }}
                  style={styles.poster}
                  contentFit="cover"
                  transition={300}
                />
                {series.isNew && (
                  <View style={styles.badge}>
                    <ThemedText style={styles.badgeText}>NEW</ThemedText>
                  </View>
                )}
                {series.isHot && !series.isNew && (
                  <View style={[styles.badge, styles.hotBadge]}>
                    <ThemedText style={styles.badgeText}>HOT</ThemedText>
                  </View>
                )}
              </View>
              
              <View style={styles.info}>
                <ThemedText style={styles.seriesTitle} numberOfLines={2}>
                  {series.title}
                </ThemedText>
                <ThemedText style={styles.titleChinese} numberOfLines={1}>
                  {series.titleChinese}
                </ThemedText>
                
                <View style={styles.meta}>
                  <View style={styles.rating}>
                    <IconSymbol name="star.fill" size={12} color="#FFD700" />
                    <ThemedText style={styles.ratingText}>{series.rating.toFixed(1)}</ThemedText>
                  </View>
                  <ThemedText style={styles.episodes}>{series.totalEpisodes} tập</ThemedText>
                </View>
              </View>
            </Pressable>
          );
        })}
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
  card: {
    width: 140,
    marginRight: 12,
  },
  posterContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  poster: {
    width: 140,
    height: 210,
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
  seriesTitle: {
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
  episodes: {
    fontSize: 11,
    opacity: 0.6,
  },
});

