import { StyleSheet, ScrollView, View, StatusBar, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { FeaturedBanner } from '@/components/featured-banner';
import { CategorySection } from '@/components/category-section';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { categories, series } from '@/data/series';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const featuredSeries = series.find((s) => s.isFeatured) || series[0];
  
  // Convert series to Movie format for FeaturedBanner compatibility
  const featuredMovie = featuredSeries ? {
    id: featuredSeries.id,
    title: featuredSeries.title,
    titleChinese: featuredSeries.titleChinese,
    poster: featuredSeries.poster,
    backdrop: featuredSeries.backdrop,
    rating: featuredSeries.rating,
    year: featuredSeries.year,
    duration: 0, // Not used for series
    genre: featuredSeries.genre,
    description: featuredSeries.description,
    director: featuredSeries.director,
    studio: featuredSeries.studio,
    isFeatured: featuredSeries.isFeatured,
    isNew: featuredSeries.isNew,
    isHot: featuredSeries.isHot,
  } : null;

  const handleFeaturedPress = () => {
    if (featuredSeries) {
      router.push({
        pathname: '/series/[id]',
        params: { id: featuredSeries.id },
      });
    }
  };

  const handleCategoryPress = (categoryId: string, categoryTitle: string) => {
    router.push({
      pathname: '/category/[id]',
      params: { id: categoryId, title: categoryTitle },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ThemedText type="title" style={styles.headerTitle}>
            Ổ 3D
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            中国动画
          </ThemedText>
        </View>
        
        <View style={styles.headerRight}>
          <Pressable style={styles.iconButton}>
            <IconSymbol 
              name="magnifyingglass" 
              size={24} 
              color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon} 
            />
          </Pressable>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Banner */}
        {featuredMovie && (
          <FeaturedBanner 
            movie={featuredMovie} 
            onPress={handleFeaturedPress}
          />
        )}

        {/* Category Sections */}
        {categories
          .filter((category) => category.series && category.series.length > 0)
          .map((category) => (
            <CategorySection
              key={category.id}
              title={category.title}
              categories={[category]}
              onCategoryPress={handleCategoryPress}
            />
          ))}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  scrollView: {
    flex: 1,
  },
  bottomSpacing: {
    height: 32,
  },
});
