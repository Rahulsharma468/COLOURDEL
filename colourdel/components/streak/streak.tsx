import React, { useEffect } from 'react';
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

export default function StreakScreen() {
  const fireAnimation = useSharedValue(0);
  const cardScale = useSharedValue(0);
  const progressAnimation = useSharedValue(0);

  useEffect(() => {
    cardScale.value = withDelay(300, withSpring(1));
    progressAnimation.value = withDelay(800, withTiming(1, { duration: 1500 }));
    
    fireAnimation.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  const fireStyle = useAnimatedStyle(() => ({
    transform: [{ 
      scale: interpolate(fireAnimation.value, [0, 1], [1, 1.2]) 
    }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progressAnimation.value, [0, 1], [0, 70])}%`,
  }));

  const streakData = [
    { day: 'Mon', completed: true, date: '12' },
    { day: 'Tue', completed: true, date: '13' },
    { day: 'Wed', completed: true, date: '14' },
    { day: 'Thu', completed: true, date: '15' },
    { day: 'Fri', completed: true, date: '16' },
    { day: 'Sat', completed: true, date: '17' },
    { day: 'Sun', completed: true, date: '18' },
  ];

  const milestones = [
    { days: 7, title: 'Week Warrior', icon: 'local-fire-department', achieved: true },
    { days: 14, title: 'Two Week Champion', icon: 'emoji-events', achieved: false },
    { days: 30, title: 'Monthly Master', icon: 'star', achieved: false },
    { days: 100, title: 'Century Superstar', icon: 'diamond', achieved: false },
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
        <Animated.View style={[styles.header, cardStyle]} entering={FadeInUp.delay(200)}>
          <Text style={styles.title}>Your Streak! 🔥</Text>
          <Text style={styles.subtitle}>Keep the learning fire burning!</Text>
        </Animated.View>

        {/* Current Streak */}
        <Animated.View style={[styles.streakCard, cardStyle]} entering={FadeInDown.delay(400)}>
          <Animated.View style={fireStyle}>
            <MaterialIcons name="local-fire-department" size={80} color="#FF6B9D" />
          </Animated.View>
          <Text style={styles.streakNumber}>7</Text>
          <Text style={styles.streakLabel}>Day Streak</Text>
          <Text style={styles.streakDescription}>
            Amazing! You\'ve been learning for 7 days straight! 🌟
          </Text>
        </Animated.View>

        {/* Weekly Progress */}
        <Animated.View style={[styles.weeklyContainer, cardStyle]} entering={FadeInDown.delay(600)}>
          <Text style={styles.sectionTitle}>This Week\'s Progress 📅</Text>
          <View style={styles.weeklyGrid}>
            {streakData.map((day, index) => (
              <Animated.View 
                key={day.day} 
                style={[
                  styles.dayCard,
                  day.completed ? styles.dayCompleted : styles.dayIncomplete
                ]}
                entering={FadeInDown.delay(800 + index * 100)}
              >
                <Text style={[
                  styles.dayText,
                  { color: day.completed ? 'white' : '#999' }
                ]}>
                  {day.day}
                </Text>
                <Text style={[
                  styles.dateText,
                  { color: day.completed ? 'white' : '#999' }
                ]}>
                  {day.date}
                </Text>
                {day.completed && (
                  <MaterialIcons name="check-circle" size={20} color="white" />
                )}
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Progress to Next Milestone */}
        <Animated.View style={[styles.progressContainer, cardStyle]} entering={FadeInDown.delay(800)}>
          <Text style={styles.sectionTitle}>Next Milestone 🎯</Text>
          <View style={styles.milestoneProgress}>
            <View style={styles.milestoneInfo}>
              <MaterialIcons name="emoji-events" size={30} color="#FFD93D" />
              <View style={styles.milestoneText}>
                <Text style={styles.milestoneTitle}>Two Week Champion</Text>
                <Text style={styles.milestoneSubtitle}>7 more days to go!</Text>
              </View>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <Animated.View style={[styles.progressFill, progressStyle]} />
              </View>
              <Text style={styles.progressText}>7/14 days</Text>
            </View>
          </View>
        </Animated.View>

        {/* Milestones */}
        <Animated.View style={[styles.milestonesContainer, cardStyle]} entering={FadeInDown.delay(1000)}>
          <Text style={styles.sectionTitle}>Streak Milestones 🏆</Text>
          <View style={styles.milestonesGrid}>
            {milestones.map((milestone, index) => (
              <Animated.View 
                key={milestone.days} 
                style={[
                  styles.milestoneCard,
                  milestone.achieved ? styles.milestoneAchieved : styles.milestoneLocked
                ]}
                entering={FadeInDown.delay(1200 + index * 100)}
              >
                <MaterialIcons 
                  name={milestone.icon as any} 
                  size={30} 
                  color={milestone.achieved ? '#FFD93D' : '#CCC'} 
                />
                <Text style={[
                  styles.milestoneCardTitle,
                  { color: milestone.achieved ? '#333' : '#999' }
                ]}>
                  {milestone.title}
                </Text>
                <Text style={[
                  styles.milestoneDays,
                  { color: milestone.achieved ? '#FF6B9D' : '#CCC' }
                ]}>
                  {milestone.days} days
                </Text>
                {milestone.achieved && (
                  <View style={styles.achievedBadge}>
                    <MaterialIcons name="check" size={12} color="white" />
                  </View>
                )}
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Motivation */}
        <Animated.View style={[styles.motivationContainer, cardStyle]} entering={FadeInDown.delay(1200)}>
          <View style={styles.motivationHeader}>
            <MaterialIcons name="favorite" size={30} color="#FF6B9D" />
            <Text style={styles.motivationTitle}>Keep Going! 💪</Text>
          </View>
          <Text style={styles.motivationText}>
            You\'re doing amazing! Every day you learn something new, you\'re becoming smarter and stronger. Don\'t break the streak now! 🌟
          </Text>
          <AnimatedButton
            title="Continue Learning! 🚀"
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  streakCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    padding: 30,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginTop: 10,
  },
  streakLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  streakDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  weeklyContainer: {
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
  weeklyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCard: {
    width: 40,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  dayCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  dayIncomplete: {
    backgroundColor: 'white',
    borderColor: '#E0E0E0',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 10,
    marginBottom: 2,
  },
  progressContainer: {
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
  milestoneProgress: {
    marginTop: 10,
  },
  milestoneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  milestoneText: {
    marginLeft: 15,
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  milestoneSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  progressBarContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  milestonesContainer: {
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
  milestonesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  milestoneCard: {
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
  milestoneAchieved: {
    borderWidth: 2,
    borderColor: '#FFD93D',
  },
  milestoneLocked: {
    opacity: 0.6,
  },
  milestoneCardTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  milestoneDays: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  achievedBadge: {
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
  motivationContainer: {
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
  motivationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginLeft: 10,
  },
  motivationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
});