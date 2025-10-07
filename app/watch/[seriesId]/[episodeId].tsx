import { View, Text, ScrollView, Pressable, StatusBar, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useRef } from 'react';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { series } from '@/data/series';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WatchScreen() {
  const { seriesId, episodeId } = useLocalSearchParams<{ seriesId: string; episodeId: string }>();
  const colorScheme = useColorScheme();
  const videoRef = useRef<Video>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const seriesItem = series.find((s) => s.id === seriesId);
  const episode = seriesItem?.episodes.find((e) => e.id === episodeId);

  if (!seriesItem || !episode) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a' }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>Episode not found</Text>
      </View>
    );
  }

  // Demo video URL - replace with actual episode video URL
  const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoPress = () => {
    setShowControls(!showControls);
  };

  const handleBack = () => {
    router.back();
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
    }
  };

  const handleEpisodeSelect = (selectedEpisodeId: string) => {
    if (selectedEpisodeId !== episodeId) {
      router.push({
        pathname: '/watch/[seriesId]/[episodeId]',
        params: { seriesId, episodeId: selectedEpisodeId },
      });
    }
  };

  const isDark = colorScheme === 'dark';

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar hidden />
      
      {/* Video Player */}
      <Pressable onPress={handleVideoPress} style={{ flex: 1 }}>
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.5625 }}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />

        {/* Video Controls Overlay */}
        {showControls && (
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.7)']}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {/* Top Bar */}
            <View style={{
              position: 'absolute',
              top: 48,
              left: 16,
              right: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Pressable 
                onPress={handleBack}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <IconSymbol 
                  name="chevron.right" 
                  size={24} 
                  color="#fff"
                  style={{ transform: [{ rotate: '180deg' }] }}
                />
              </Pressable>
              
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Pressable style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                  <IconSymbol name="heart.fill" size={20} color="#fff" />
                </Pressable>
                <Pressable style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                  <IconSymbol name="bookmark.fill" size={20} color="#fff" />
                </Pressable>
              </View>
            </View>

            {/* Play/Pause Button */}
            <View style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateX: -32 }, { translateY: -32 }],
            }}>
              <Pressable 
                onPress={handlePlayPause}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <IconSymbol 
                  name="house.fill" 
                  size={32} 
                  color="#fff"
                />
              </Pressable>
            </View>

            {/* Bottom Info */}
            <View style={{
              position: 'absolute',
              bottom: 24,
              left: 16,
              right: 16,
            }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                {episode.title}
              </Text>
              <Text style={{ color: '#fff', opacity: 0.8, fontSize: 14, marginTop: 2 }}>
                {seriesItem.title} • Tập {episode.episodeNumber}
              </Text>
            </View>
          </LinearGradient>
        )}
      </Pressable>

      {/* Episode Details */}
      <ScrollView 
        style={{ flex: 1, backgroundColor: isDark ? '#0a0a0a' : '#f9fafb' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 20 }}>
          {/* Episode Info */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: isDark ? '#fff' : '#111827',
              marginBottom: 8,
            }}>
              {episode.title}
            </Text>
            <Text style={{
              fontSize: 16,
              color: isDark ? '#9ca3af' : '#4b5563',
              marginBottom: 4,
            }}>
              {episode.titleChinese}
            </Text>
            <Text style={{
              fontSize: 14,
              color: isDark ? '#6b7280' : '#6b7280',
            }}>
              {seriesItem.title} • Tập {episode.episodeNumber} • {episode.duration} phút
            </Text>
          </View>

          {/* Episode Description */}
          {episode.description && (
            <View style={{ marginBottom: 24 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: isDark ? '#fff' : '#111827',
                marginBottom: 8,
              }}>
                Mô tả tập phim
              </Text>
              <Text style={{
                fontSize: 14,
                lineHeight: 20,
                color: isDark ? '#d1d5db' : '#374151',
              }}>
                {episode.description}
              </Text>
            </View>
          )}

          {/* Episode List */}
          <View>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: isDark ? '#fff' : '#111827',
              marginBottom: 16,
            }}>
              Tất cả tập ({seriesItem.episodes.length})
            </Text>
            
            {seriesItem.episodes.map((ep, index) => (
              <Pressable
                key={ep.id}
                onPress={() => handleEpisodeSelect(ep.id)}
                style={{
                  flexDirection: 'row',
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                  backgroundColor: ep.id === episodeId 
                    ? (isDark ? '#1f2937' : '#f3f4f6')
                    : (isDark ? '#1a1a1a' : '#ffffff'),
                }}
              >
                <Image
                  source={{ uri: ep.thumbnail }}
                  style={{
                    width: 80,
                    height: 45,
                    borderRadius: 6,
                    backgroundColor: '#1f2937',
                  }}
                  contentFit="cover"
                />
                
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: isDark ? '#fff' : '#111827',
                    marginBottom: 2,
                  }} numberOfLines={2}>
                    {ep.title}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: isDark ? '#9ca3af' : '#4b5563',
                    marginBottom: 4,
                  }}>
                    Tập {ep.episodeNumber} • {ep.duration} phút
                  </Text>
                  {ep.isWatched && (
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <IconSymbol name="star.fill" size={12} color="#10b981" />
                      <Text style={{
                        fontSize: 11,
                        color: '#10b981',
                        marginLeft: 4,
                      }}>Đã xem</Text>
                    </View>
                  )}
                </View>
                
                {ep.id === episodeId && (
                  <View style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#ef4444',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                    <IconSymbol name="house.fill" size={16} color="#fff" />
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </View>
        
        {/* Bottom Spacing */}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}
