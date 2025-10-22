import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  withRepeat,
  withTiming,
  FadeInDown,
  FadeInUp,
  interpolate,
  Easing
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

import ChildFriendlyBackground from '../common/Background';
import AnimatedButton from '../common/AnimatedButton';

export default function ProfileScreen() {
  const avatarScale = useSharedValue(0);
  const cardScale = useSharedValue(0);
  const starAnimation = useSharedValue(0);

  useEffect(() => {
    avatarScale.value = withDelay(300, withSpring(1));
    cardScale.value = withDelay(500, withSpring(1));
    
    starAnimation.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  const avatarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarScale.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const starStyle = useAnimatedStyle(() => ({
    transform: [{ 
      rotate: `${interpolate(starAnimation.value, [0, 1], [0, 360])}deg` 
    }],
  }));

  const profileStats = [
    { label: 'Level', value: '12', icon: 'trending-up', color: '#FF6B9D' },
    { label: 'Stars', value: '245', icon: 'star', color: '#FFD93D' },
    { label: 'Badges', value: '8', icon: 'military-tech', color: '#4ECDC4' },
    { label: 'Friends', value: '15', icon: 'people', color: '#96CEB4' },
  ];

  const badges = [
    { name: 'First Steps', icon: 'baby-changing-station', earned: true, color: '#FF6B9D' },
    { name: 'Speed Reader', icon: 'menu-book', earned: true, color: '#4ECDC4' },
    { name: 'Math Wizard', icon: 'calculate', earned: true, color: '#45B7D1' },
    { name: 'Creative Artist', icon: 'palette', earned: true, color: '#96CEB4' },
    { name: 'Science Explorer', icon: 'science', earned: false, color: '#CCC' },
    { name: 'Super Learner', icon: 'school', earned: false, color: '#CCC' },
  ];

  const settings = [
    { title: 'Notifications', icon: 'notifications', hasSwitch: true },
    { title: 'Sound Effects', icon: 'volume-up', hasSwitch: true },
    { title: 'Parent Dashboard', icon: 'supervisor-account', hasSwitch: false },
    { title: 'Help & Support', icon: 'help', hasSwitch: false },
    { title: 'Privacy Settings', icon: 'security', hasSwitch: false },
  ];

  const handleSettingPress = (title: string) => {
    Alert.alert('Settings', `${title} pressed!`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {} }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChildFriendlyBackground />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <Animated.View style={[styles.profileHeader, cardStyle]} entering={FadeInUp.delay(200)}>
          <Animated.View style={[styles.avatarContainer, avatarStyle]}>
            <MaterialIcons name="child-care" size={60} color="#FF6B9D" />
            <Animated.View style={[styles.levelBadge, starStyle]}>
              <MaterialIcons name="star" size={16} color="white" />
              <Text style={styles.levelText}>12</Text>
            </Animated.View>
          </Animated.View>
          <Text style={styles.username}>Little Explorer</Text>
          <Text style={styles.userTitle}>Super Learner 🌟</Text>
          <Text style={styles.joinDate}>Learning since March 2024</Text>
        </Animated.View>

        {/* Stats */}
        <Animated.View style={[styles.statsContainer, cardStyle]} entering={FadeInDown.delay(400)}>
          {profileStats.map((stat, index) => (
            <Animated.View 
              key={stat.label} 
              style={styles.statCard}
              entering={FadeInDown.delay(600 + index * 100)}
            >
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <MaterialIcons name={stat.icon as any} size={24} color="white" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Badges Collection */}
        <Animated.View style={[styles.badgesContainer, cardStyle]} entering={FadeInDown.delay(600)}>
          <Text style={styles.sectionTitle}>Badge Collection 🏆</Text>
          <View style={styles.badgesGrid}>
            {badges.map((badge, index) => (
              <Animated.View 
                key={badge.name} 
                style={[
                  styles.badgeCard,
                  badge.earned ? styles.badgeEarned : styles.badgeLocked
                ]}
                entering={FadeInDown.delay(800 + index * 100)}
              >
                <View style={[styles.badgeIcon, { backgroundColor: badge.color }]}>
                  <MaterialIcons name={badge.icon as any} size={24} color="white" />
                </View>
                <Text style={[
                  styles.badgeName,
                  { color: badge.earned ? '#333' : '#999' }
                ]}>
                  {badge.name}
                </Text>
                {badge.earned && (
                  <View style={styles.earnedIndicator}>
                    <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
                  </View>
                )}
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Learning Preferences */}
        <Animated.View style={[styles.preferencesContainer, cardStyle]} entering={FadeInDown.delay(800)}>
          <Text style={styles.sectionTitle}>Learning Preferences 🎯</Text>
          <View style={styles.preferenceCard}>
            <MaterialIcons name="schedule" size={24} color="#FF6B9D" />
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceTitle}>Daily Goal</Text>
              <Text style={styles.preferenceValue}>30 minutes</Text>
            </View>
          </View>
          <View style={styles.preferenceCard}>
            <MaterialIcons name="favorite" size={24} color="#4ECDC4" />
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceTitle}>Favorite Subject</Text>
              <Text style={styles.preferenceValue}>Mathematics</Text>
            </View>
          </View>
          <View style={styles.preferenceCard}>
            <MaterialIcons name="access-time" size={24} color="#96CEB4" />
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceTitle}>Best Learning Time</Text>
              <Text style={styles.preferenceValue}>Morning</Text>
            </View>
          </View>
        </Animated.View>

        {/* Settings */}
        <Animated.View style={[styles.settingsContainer, cardStyle]} entering={FadeInDown.delay(1000)}>
          <Text style={styles.sectionTitle}>Settings ⚙️</Text>
          {settings.map((setting, index) => (
            <Animated.View 
              key={setting.title} 
              entering={FadeInDown.delay(1200 + index * 100)}
            >
              <AnimatedButton
                title={setting.title}
                variant="secondary"
                icon={setting.icon as any}
                onPress={() => handleSettingPress(setting.title)}
                style={styles.settingButton}
              />
            </Animated.View>
          ))}
        </Animated.View>

        {/* Logout */}
        <Animated.View style={[styles.logoutContainer, cardStyle]} entering={FadeInDown.delay(1200)}>
          <AnimatedButton
            title="Logout 👋"
            variant="secondary"
            icon="logout"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 15,
    position: 'relative',
  },
  levelBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B9D',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  levelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 5,
  },
  userTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 14,
    color: '#999',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  badgesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 15,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgeEarned: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  badgeLocked: {
    opacity: 0.6,
  },
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  earnedIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  preferencesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  preferenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  preferenceInfo: {
    marginLeft: 15,
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  preferenceValue: {
    fontSize: 12,
    color: '#666',
  },
  settingsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  settingButton: {
    marginVertical: 5,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  logoutButton: {
    borderColor: '#FF4757',
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
  },
});