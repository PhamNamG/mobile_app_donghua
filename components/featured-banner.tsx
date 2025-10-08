import { Image } from 'expo-image';
import { StyleSheet, View, Pressable, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Poster } from '@/lib/api/services/posters';
import Swiper from 'react-native-swiper';
import { useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = SCREEN_WIDTH * 0.75;

interface FeaturedBannerProps {
  posters: Poster[];
  onPosterPress?: (poster: Poster) => void;
}

export function FeaturedBanner({ posters, onPosterPress }: FeaturedBannerProps) {
  const colorScheme = useColorScheme();
  const swiperRef = useRef<any>(null);
  
  // Animation values
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  
  const metaOpacity = useRef(new Animated.Value(0)).current;
  const metaTranslateY = useRef(new Animated.Value(30)).current;
  
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslateY = useRef(new Animated.Value(30)).current;

  // Staggered animation function
  const animateContent = () => {
    // Reset all animations
    titleOpacity.setValue(0);
    titleTranslateY.setValue(30);
    metaOpacity.setValue(0);
    metaTranslateY.setValue(30);
    buttonsOpacity.setValue(0);
    buttonsTranslateY.setValue(30);

    // Staggered animations with spring effect
    Animated.stagger(120, [
      // Title animation
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          tension: 60,
          friction: 9,
          useNativeDriver: true,
        }),
      ]),
      // Meta animation (subtitle, description, genres)
      Animated.parallel([
        Animated.timing(metaOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(metaTranslateY, {
          toValue: 0,
          tension: 60,
          friction: 9,
          useNativeDriver: true,
        }),
      ]),
      // Buttons animation
      Animated.parallel([
        Animated.timing(buttonsOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(buttonsTranslateY, {
          toValue: 0,
          tension: 60,
          friction: 9,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  useEffect(() => {
    // Animate on mount
    const timer = setTimeout(() => animateContent(), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!posters || posters.length === 0) {
    return null;
  }

  const renderPosterItem = (poster: Poster) => {
    // Parse genres from type string
    const genres = poster.type ? poster.type.split(',').map(g => g.trim()) : [];

    return (
      <Pressable 
        style={styles.slide} 
        onPress={() => onPosterPress?.(poster)}
      >
        <Image
          source={{ uri: poster.poster }}
          style={styles.backdrop}
          contentFit="cover"
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
          transition={300}
        />
        
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.1)',
            'rgba(255, 255, 255, 0.3)',
            'rgba(255, 255, 255, 0.5)',
            'rgba(255, 255, 255, 0.75)',
            'rgba(255, 255, 255, 0.95)',
          ]}
          locations={[0, 0.2, 0.35, 0.5, 0.7, 1]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {/* Title with animation */}
            <Animated.View
              style={{
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslateY }],
              }}
            >
              <Animated.Text style={styles.title} numberOfLines={2}>
                {poster.name}
              </Animated.Text>
            </Animated.View>
            
            {/* Meta info with animation */}
            <Animated.View
              style={{
                opacity: metaOpacity,
                transform: [{ translateY: metaTranslateY }],
              }}
            >
              {/* Info row */}
              <View style={styles.infoRow}>
                {poster.quality && (
                  <ThemedText style={styles.infoText}>{poster.quality}</ThemedText>
                )}
                {poster.quality && genres.length > 0 && (
                  <ThemedText style={styles.infoDot}>•</ThemedText>
                )}
                {genres.length > 0 && (
                  <ThemedText style={styles.infoText}>
                    {genres.slice(0, 2).join(', ')}
                  </ThemedText>
                )}
              </View>

              {/* Description */}
              <ThemedText style={styles.description} numberOfLines={2}>
                {poster.descriptions}
              </ThemedText>
            </Animated.View>

            {/* Action Buttons with animation */}
            <Animated.View
              style={[
                styles.buttonsContainer,
                {
                  opacity: buttonsOpacity,
                  transform: [{ translateY: buttonsTranslateY }],
                },
              ]}
            >
              <Pressable 
                style={styles.playButton}
                onPress={() => onPosterPress?.(poster)}
              >
                <Ionicons name="play" size={20} color="#fff" />
              </Pressable>

              <Pressable 
                style={styles.infoButton}
                onPress={() => onPosterPress?.(poster)}
              >
                <Ionicons name="information-circle-outline" size={24} color="#1a1a1a" />
              </Pressable>
            </Animated.View>
          </View>
        </LinearGradient>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        autoplay
        autoplayTimeout={20}
        loop
        showsPagination={false}
        onIndexChanged={() => {
          // Trigger animation when slide changes
          setTimeout(() => animateContent(), 200);
        }}
      >
        {posters.map((poster, index) => (
          <View key={index}>
            {renderPosterItem(poster)}
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    marginBottom: 20,
  },
  slide: {
    width: SCREEN_WIDTH,
    height: BANNER_HEIGHT,
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
    padding: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
    lineHeight: 34,
    textShadowColor: 'rgb(0, 0, 0, 1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a4a4a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoDot: {
    fontSize: 13,
    color: '#rgba(255, 255, 255, 0.51)',
    marginHorizontal: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4a4a4a',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  playButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.3,
  },
  infoButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
});