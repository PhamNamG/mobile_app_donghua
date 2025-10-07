import { StyleSheet, View, Pressable, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

function MenuItem({ icon, title, subtitle, onPress }: MenuItemProps) {
  const colorScheme = useColorScheme();

  // Map icon string to IconSymbol name
  const getIconName = (iconName: string): any => {
    const iconMap: Record<string, string> = {
      'heart': 'heart.fill',
      'bookmark': 'bookmark.fill',
      'clock': 'clock.fill',
      'bell': 'bell.fill',
      'globe': 'globe',
      'moon': 'moon.fill',
      'info': 'info.circle',
      'help': 'questionmark.circle',
      'shield': 'shield.fill',
    };
    return iconMap[iconName] || 'house.fill';
  };

  return (
    <Pressable
      style={[
        styles.menuItem,
        {
          backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
        },
      ]}
      onPress={onPress}
      android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
    >
      <View style={styles.menuItemLeft}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f5f5f5',
            },
          ]}
        >
          <IconSymbol
            name={getIconName(icon)}
            size={20}
            color={colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint}
          />
        </View>
        <View style={styles.menuItemText}>
          <ThemedText style={styles.menuItemTitle}>{title}</ThemedText>
          {subtitle && (
            <ThemedText style={styles.menuItemSubtitle}>{subtitle}</ThemedText>
          )}
        </View>
      </View>
      <IconSymbol
        name="chevron.right"
        size={20}
        color={colorScheme === 'dark' ? '#666' : '#999'}
      />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title">Profile</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        {/* User Info */}
        <View style={styles.userSection}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#e0e0e0',
              },
            ]}
          >
            <ThemedText style={styles.avatarText}>MC</ThemedText>
          </View>
          <ThemedText type="subtitle" style={styles.userName}>
            Movie Collector
          </ThemedText>
          <ThemedText style={styles.userEmail}>user@example.com</ThemedText>
        </View>

        {/* Menu Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Library</ThemedText>
          <MenuItem
            icon="heart"
            title="My Favorites"
            subtitle="0 movies"
            onPress={() => console.log('Favorites')}
          />
          <MenuItem
            icon="bookmark"
            title="Watchlist"
            subtitle="0 movies"
            onPress={() => console.log('Watchlist')}
          />
          <MenuItem
            icon="clock"
            title="Watch History"
            onPress={() => console.log('History')}
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Settings</ThemedText>
          <MenuItem
            icon="bell"
            title="Notifications"
            onPress={() => console.log('Notifications')}
          />
          <MenuItem
            icon="globe"
            title="Language"
            subtitle="English"
            onPress={() => console.log('Language')}
          />
          <MenuItem
            icon="moon"
            title="Appearance"
            subtitle={colorScheme === 'dark' ? 'Dark' : 'Light'}
            onPress={() => console.log('Appearance')}
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>About</ThemedText>
          <MenuItem
            icon="info"
            title="About App"
            onPress={() => console.log('About')}
          />
          <MenuItem
            icon="help"
            title="Help & Support"
            onPress={() => console.log('Help')}
          />
          <MenuItem
            icon="shield"
            title="Privacy Policy"
            onPress={() => console.log('Privacy')}
          />
        </View>

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
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
  },
  content: {
    flex: 1,
  },
  userSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.6,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.6,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 13,
    opacity: 0.6,
  },
  bottomSpacing: {
    height: 32,
  },
});

