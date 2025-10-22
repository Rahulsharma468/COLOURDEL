import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
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

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [greeting, setGreeting] = useState('Good Morning');
  const headerScale = useSharedValue(0);
  const cardTranslateY = useSharedValue(50);
  const floatingAnimation = useSharedValue(0);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    headerScale.value = withDelay(300, withSpring(1));
    cardTranslateY.value = withDelay(500, withSpring(0));
    
    // Floating animation for cards
    floatingAnimation.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ 
      translateY: interpolate(floatingAnimation.value, [0, 1], [0, -10]) 
    }],
  }));

  const activities = [
    { id: 1, title: 'Math Adventure', icon: 'calculate', color: '#FF6B9D', progress: 75 },
    { id: 2, title: 'Reading Quest', icon: 'menu-book', color: '#4ECDC4', progress: 60 },
    { id: 3, title: 'Science Lab', icon: 'science', color: '#45B7D1', progress: 90 },
    { id: 4, title: 'Art Studio', icon: 'palette', color: '#96CEB4', progress: 45 },
  ];

  const achievements = [
    { id: 1, title: 'First Steps!', icon: 'star', earned: true },
    { id: 2, title: 'Quick Learner', icon: 'flash-on', earned: true },
    { id: 3, title: 'Creative Mind', icon: 'lightbulb', earned: false },
    { id: 4, title: 'Super Star', icon: 'emoji-events', earned: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ChildFriendlyBackground />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View style={[styles.header, headerStyle]} entering={FadeInUp.delay(200)}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="child-care" size={40} color="#FF6B9D" />
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>{greeting}! 🌟</Text>
            <Text style={styles.username}>Little Explorer</Text>
          </View>
          <View style={styles.notificationContainer}>
            <MaterialIcons name="notifications" size={28} color="#FF6B9D" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        </Animated.View>

        {/* Quick Stats */}
        <Animated.View style={[styles.statsContainer, cardStyle]} entering={FadeInDown.delay(400)}>
          <View style={styles.statCard}>
            <MaterialIcons name="local-fire-department" size={30} color="#FF6B9D" />
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="stars" size={30} color="#FFD93D" />
            <Text style={styles.statNumber}>245</Text>
            <Text style={styles.statLabel}>Stars Earned</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="emoji-events" size={30} color="#4ECDC4" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </Animated.View>

        {/* Continue Learning */}
        <Animated.View style={[styles.sectionContainer, cardStyle]} entering={FadeInDown.delay(600)}>
          <Text style={styles.sectionTitle}>Continue Learning 📚</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {activities.map((activity, index) => (
              <Animated.View 
                key={activity.id} 
                style={[styles.activityCard, floatingStyle]}
                entering={FadeInDown.delay(800 + index * 100)}
              >
                <View style={[styles.activityIcon, { backgroundColor: activity.color }]}>
                  <MaterialIcons name={activity.icon as any} size={30} color="white" />
                </View>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${activity.progress}%`, backgroundColor: activity.color }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{activity.progress}%</Text>
                </View>
                <AnimatedButton
                  title="Continue"
                  variant="primary"
                  onPress={() => {}}
                  style={[styles.continueButton, { backgroundColor: activity.color }]}
                />
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Recent Achievements */}
        <Animated.View style={[styles.sectionContainer, cardStyle]} entering={FadeInDown.delay(800)}>
          <Text style={styles.sectionTitle}>Recent Achievements 🏆</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <Animated.View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  achievement.earned ? styles.achievementEarned : styles.achievementLocked
                ]}
                entering={FadeInDown.delay(1000 + index * 100)}
              >
                <MaterialIcons 
                  name={achievement.icon as any} 
                  size={24} 
                  color={achievement.earned ? '#FFD93D' : '#CCC'} 
                />
                <Text style={[
                  styles.achievementTitle,
                  { color: achievement.earned ? '#333' : '#999' }
                ]}>
                  {achievement.title}
                </Text>
                {achievement.earned && (
                  <View style={styles.earnedBadge}>
                    <MaterialIcons name="check" size={12} color="white" />
                  </View>
                )}
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Daily Challenge */}
        <Animated.View style={[styles.challengeContainer, cardStyle]} entering={FadeInDown.delay(1000)}>
          <View style={styles.challengeHeader}>
            <MaterialIcons name="emoji-events" size={30} color="#FF6B9D" />
            <Text style={styles.challengeTitle}>Daily Challenge 🎯</Text>
          </View>
          <Text style={styles.challengeDescription}>
            Complete 3 math problems to earn bonus stars!
          </Text>
          <View style={styles.challengeProgress}>
            <Text style={styles.challengeProgressText}>Progress: 2/3</Text>
            <View style={styles.challengeProgressBar}>
              <View style={[styles.challengeProgressFill, { width: '66%' }]} />
            </View>
          </View>
          <AnimatedButton
            title="Start Challenge! 🚀"
            onPress={() => {}}
            icon="play-arrow"
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  greetingContainer: {
    flex: 1,
    marginLeft: 15,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B9D',
  },
  username: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4757',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 15,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    width: width * 0.7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  activityIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  continueButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementEarned: {
    borderWidth: 2,
    borderColor: '#FFD93D',
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  earnedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeContainer: {
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
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginLeft: 10,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  challengeProgress: {
    marginBottom: 15,
  },
  challengeProgressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  challengeProgressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  challengeProgressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
});