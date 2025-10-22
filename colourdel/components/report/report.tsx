import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  withTiming,
  FadeInDown,
  FadeInUp,
  interpolate
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

import ChildFriendlyBackground from '../common/Background';
import AnimatedButton from '../common/AnimatedButton';

const { width } = Dimensions.get('window');

export default function ReportScreen() {
  const chartAnimation = useSharedValue(0);
  const cardScale = useSharedValue(0);

  useEffect(() => {
    cardScale.value = withDelay(300, withSpring(1));
    chartAnimation.value = withDelay(800, withTiming(1, { duration: 1500 }));
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const subjects = [
    { name: 'Math', score: 85, color: '#FF6B9D', icon: 'calculate' },
    { name: 'Reading', score: 92, color: '#4ECDC4', icon: 'menu-book' },
    { name: 'Science', score: 78, color: '#45B7D1', icon: 'science' },
    { name: 'Art', score: 95, color: '#96CEB4', icon: 'palette' },
  ];

  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.0 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 2.8 },
    { day: 'Fri', hours: 3.2 },
    { day: 'Sat', hours: 4.0 },
    { day: 'Sun', hours: 2.0 },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  const achievements = [
    { title: 'Perfect Week!', description: 'Completed all daily goals', icon: 'star', color: '#FFD93D' },
    { title: 'Speed Reader', description: 'Read 5 books this month', icon: 'menu-book', color: '#4ECDC4' },
    { title: 'Math Wizard', description: 'Solved 100 problems', icon: 'calculate', color: '#FF6B9D' },
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
          <Text style={styles.title}>Your Progress Report 📊</Text>
          <Text style={styles.subtitle}>See how amazing you\'re doing!</Text>
        </Animated.View>

        {/* Overall Stats */}
        <Animated.View style={[styles.statsContainer, cardStyle]} entering={FadeInDown.delay(400)}>
          <View style={styles.statCard}>
            <MaterialIcons name="schedule" size={30} color="#FF6B9D" />
            <Text style={styles.statNumber}>18.5</Text>
            <Text style={styles.statLabel}>Hours This Week</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="assignment-turned-in" size={30} color="#4CAF50" />
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Tasks Completed</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="trending-up" size={30} color="#4ECDC4" />
            <Text style={styles.statNumber}>87%</Text>
            <Text style={styles.statLabel}>Average Score</Text>
          </View>
        </Animated.View>

        {/* Subject Performance */}
        <Animated.View style={[styles.subjectsContainer, cardStyle]} entering={FadeInDown.delay(600)}>
          <Text style={styles.sectionTitle}>Subject Performance 📚</Text>
          {subjects.map((subject, index) => (
            <Animated.View 
              key={subject.name} 
              style={styles.subjectCard}
              entering={FadeInDown.delay(800 + index * 100)}
            >
              <View style={styles.subjectHeader}>
                <View style={[styles.subjectIcon, { backgroundColor: subject.color }]}>
                  <MaterialIcons name={subject.icon as any} size={24} color="white" />
                </View>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectScore}>{subject.score}%</Text>
                </View>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <Animated.View 
                    style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: subject.color,
                        width: `${subject.score}%`
                      }
                    ]} 
                  />
                </View>
              </View>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Weekly Activity Chart */}
        <Animated.View style={[styles.chartContainer, cardStyle]} entering={FadeInDown.delay(800)}>
          <Text style={styles.sectionTitle}>Weekly Activity ⏰</Text>
          <View style={styles.chart}>
            {weeklyData.map((day, index) => (
              <Animated.View key={day.day} style={styles.chartColumn}>
                 <Animated.View 
                  style={[
                    styles.chartBar,
                    {
                      height: (day.hours / maxHours) * 120,
                      backgroundColor: '#FF6B9D'
                    }
                  ]}
                  entering={FadeInUp.delay(1000 + index * 100)}
                />
                <Text style={styles.chartLabel}>{day.day}</Text>
                <Text style={styles.chartValue}>{day.hours}h</Text>
              </Animated.View>
            ))}
          </View>
          <Text style={styles.chartSummary}>
            Total: {weeklyData.reduce((sum, day) => sum + day.hours, 0)} hours this week! 🎉
          </Text>
        </Animated.View>

        {/* Recent Achievements */}
        <Animated.View style={[styles.achievementsContainer, cardStyle]} entering={FadeInDown.delay(1000)}>
          <Text style={styles.sectionTitle}>Recent Achievements 🏆</Text>
          {achievements.map((achievement, index) => (
            <Animated.View 
              key={achievement.title} 
              style={styles.achievementCard}
              entering={FadeInDown.delay(1200 + index * 100)}
            >
              <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                <MaterialIcons name={achievement.icon as any} size={24} color="white" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
              <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            </Animated.View>
          ))}
        </Animated.View>

        {/* Encouragement */}
        <Animated.View style={[styles.encouragementContainer, cardStyle]} entering={FadeInDown.delay(1200)}>
          <View style={styles.encouragementHeader}>
            <MaterialIcons name="emoji-events" size={30} color="#FFD93D" />
            <Text style={styles.encouragementTitle}>You\'re Doing Great! 🌟</Text>
          </View>
          <Text style={styles.encouragementText}>
            Your progress this week has been fantastic! Keep up the amazing work and you\'ll reach even greater heights! 🚀
          </Text>
          <AnimatedButton
            title="Keep Learning! 📚"
            onPress={() => {}}
            icon="school"
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  subjectsContainer: {
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
  subjectCard: {
    marginBottom: 15,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  subjectInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subjectScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B9D',
  },
  progressBarContainer: {
    marginLeft: 52,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  chartContainer: {
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
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    marginBottom: 10,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  chartValue: {
    fontSize: 10,
    color: '#666',
  },
  chartSummary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B9D',
    textAlign: 'center',
    marginTop: 10,
  },
  achievementsContainer: {
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
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#666',
  },
  encouragementContainer: {
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
  encouragementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  encouragementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginLeft: 10,
  },
  encouragementText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
});