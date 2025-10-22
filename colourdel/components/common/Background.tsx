import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  interpolate,
  Easing
} from 'react-native-reanimated';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('window');

export default function ChildFriendlyBackground() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
      false
    );
    
    scale.value = withRepeat(
      withTiming(1.2, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

 const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value }
    ] as any,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${-rotation.value * 0.7}deg` },
      { scale: interpolate(scale.value, [1, 1.2], [1.1, 0.9]) }
    ] as any,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle1, animatedStyle1]} />
      <Animated.View style={[styles.circle2, animatedStyle2]} />
      <View style={styles.circle3} />
      <View style={styles.circle4} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFE5F1',
  },
  circle1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(255, 182, 193, 0.3)',
    top: -width * 0.3,
    left: -width * 0.2,
  },
  circle2: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(173, 216, 230, 0.4)',
    bottom: -width * 0.2,
    right: -width * 0.1,
  },
  circle3: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 0, 0.3)',
    top: height * 0.2,
    right: 50,
  },
  circle4: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(144, 238, 144, 0.4)',
    bottom: height * 0.3,
    left: 40,
  },
});