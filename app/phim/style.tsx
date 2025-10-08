import { StyleSheet } from "react-native";

const stylesCategory = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDark: {
    backgroundColor: '#0a0a0a',
  },
  containerLight: {
    backgroundColor: '#ffffff',
  },

  // Loading & Error States
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
    padding: 24,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButtonError: {
    backgroundColor: '#ff4757',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Hero Section
  heroSection: {
    height: 340,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
  },

  // Series Info
  seriesInfo: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 28,
    gap: 16,
  },
  poster: {
    width: 110,
    height: 155,
    borderRadius: 12,
    backgroundColor: '#1f2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  seriesDetails: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 8,
  },
  seriesTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  seriesTitleChinese: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.75,
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFD700',
    marginLeft: 4,
  },
  metaDot: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.5,
    marginHorizontal: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
    fontWeight: '500',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  qualityBadge: {
    backgroundColor: '#ff4757',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  langBadge: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Content
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  episodeCount: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Description
  description: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
  },

   // Episodes Grid
   episodeGrid: {
     maxHeight: 200,
     paddingRight: 4,
   },
   episodeGridContent: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     gap: 3,
     justifyContent: 'space-between',
   },
   episodeButton: {
     width: '18.5%', // 5 cột với gap
     height: 48,
     borderRadius: 10,
     alignItems: 'center',
     justifyContent: 'center',
     borderWidth: 1.5,
     marginBottom: 12,
   },
  episodeButtonDark: {
    backgroundColor: '#1a1a1a',
    borderColor: '#2a2a2a',
  },
  episodeButtonLight: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e5e7eb',
  },
  episodeNumber: {
    fontSize: 15,
    fontWeight: '600',
  },

  // Info Grid
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },

  // Tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 71, 87, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 71, 87, 0.25)',
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Text Colors
  textWhite: { color: '#ffffff' },
  textGray900: { color: '#111827' },
  textGray700: { color: '#374151' },
  textGray600: { color: '#4b5563' },
  textGray500: { color: '#6b7280' },
  textGray400: { color: '#9ca3af' },
  textGray300: { color: '#d1d5db' },

  // Bottom Spacing
  bottomSpacing: {
    height: 40,
  },
});

export default stylesCategory;