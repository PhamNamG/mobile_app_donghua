import { StyleSheet, ScrollView, View, StatusBar, Pressable, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { FeaturedBanner } from '@/components/featured-banner';
import { AnimeSection } from '@/components/anime-section';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { series } from '@/data/series';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useAnime } from '@/hooks/api';
import { usePoster } from '@/hooks/api/use-poster';

export default function HomeScreen() {
  const { data: animeData, isLoading, isError } = useAnime();
  const { data: posterData, isLoading: isPosterLoading, isError: isPosterError } = usePoster();
  const colorScheme = useColorScheme();
  const featuredSeries = series.find((s) => s.isFeatured) || series[0];
  // Convert series to Movie format for FeaturedBanner compatibility


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
        {posterData?.data && posterData?.data.data.length > 0 && (
          <FeaturedBanner 
            posters={posterData?.data.data } 
            onPosterPress={handleFeaturedPress}
          />
        )}

        {/* Latest Anime from API */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint} />
            <ThemedText style={styles.loadingText}>Đang tải...</ThemedText>
          </View>
        )}

        {isError && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>⚠️ Không thể tải dữ liệu</ThemedText>
            <ThemedText style={styles.errorSubtext}>Kiểm tra kết nối mạng và thử lại</ThemedText>
          </View>
        )}

        {animeData && animeData.data.data.length > 0 && (
          <AnimeSection
            title="🔥 Mới Cập Nhật"
            animes={animeData.data.data}
            onSeeAllPress={() => router.push('/category/latest')}
          />
        )}

        {/* Category Sections */}
        {/* {categories
          .filter((category) => category.series && category.series.length > 0)
          .map((category) => (
            <CategorySection
              key={category.id}
              title={category.title}
              categories={[category]}
              onCategoryPress={handleCategoryPress}
            />
          ))} */}

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
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    opacity: 0.7,
  },
  errorContainer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 32,
  },
});
