import { View, Pressable, Dimensions, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import { VideoPlayerControls } from './video-player-controls';
import React from 'react';
import { WebView } from 'react-native-webview';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface IframeVideoPlayerProps {
  videoUrl: string;
  episodeNumber: string;
  seriesName: string;
  seriesNameChinese?: string;
  onBack: () => void;
}

export const IframeVideoPlayer: React.FC<IframeVideoPlayerProps> = ({
  videoUrl,
  episodeNumber,
  seriesName,
  seriesNameChinese,
  onBack,
}) => {
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoPress = () => {
    setShowControls(!showControls);
  };

  const handlePlayPause = () => {
    // Toggle play state
    setIsPlaying(!isPlaying);
  };

  // HTML cho iframe với full screen support
  const iframeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            background-color: #000;
            overflow: hidden;
          }
          iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe 
          src="${videoUrl}" 
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          webkitallowfullscreen
          mozallowfullscreen
        ></iframe>
      </body>
    </html>
  `;

  return (
    <Pressable
      onPress={handleVideoPress}
      style={[styles.container, { width: SCREEN_WIDTH, height: SCREEN_WIDTH * (9 / 16) }]}
      className="bg-black"
    >
      {/* WebView with iframe */}
      <WebView
        source={{ html: iframeHtml }}
        style={styles.webview}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />

      {/* Video Controls Overlay */}
      {/* <VideoPlayerControls
        showControls={showControls}
        isPlaying={isPlaying}
        episodeNumber={episodeNumber}
        seriesName={seriesName}
        seriesNameChinese={seriesNameChinese}
        onPlayPause={handlePlayPause}
        onBack={onBack}
      /> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
});

