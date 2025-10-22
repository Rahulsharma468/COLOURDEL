import React from 'react';
import { Text, StyleSheet, Pressable, PressableProps } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

interface AnimatedButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary';
  icon?: keyof typeof MaterialIcons.glyphMap;
  loading?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AnimatedButton({ 
  title, 
  variant = 'primary', 
  icon, 
  loading = false,
  onPress,
  ...props 
}: AnimatedButtonProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const handlePress = (event: any) => {
    if (loading) return;
    
    scale.value = withSequence(
      withSpring(0.95),
      withSpring(1)
    );
    
    rotation.value = withSequence(
      withTiming(5, { duration: 100 }),
      withTiming(-5, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );

    if (onPress) {
      setTimeout(() => runOnJS(onPress)(event), 200);
    }
  };

   const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ] as any,
  }));

  const loadingRotation = useSharedValue(0);

  React.useEffect(() => {
    if (loading) {
      loadingRotation.value = withSequence(
        withTiming(360, { duration: 1000 }),
        withTiming(720, { duration: 1000 })
      );
    }
  }, [loading]);

  const loadingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${loadingRotation.value}deg` }],
  }));

  return (
    <AnimatedPressable
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        animatedStyle,
        loading && styles.loadingButton
      ]}
      onPress={handlePress}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <Animated.View style={loadingStyle}>
          <MaterialIcons name="refresh" size={24} color="white" />
        </Animated.View>
      ) : (
        <>
          {icon && (
            <MaterialIcons 
              name={icon} 
              size={20} 
              color={variant === 'primary' ? 'white' : '#FF6B9D'} 
              style={styles.buttonIcon}
            />
          )}
          <Text style={[
            styles.buttonText,
            variant === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText
          ]}>
            {title}
          </Text>
        </>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: 10,
  },
  primaryButton: {
    backgroundColor: '#FF6B9D',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
  loadingButton: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: '#FF6B9D',
  },
  buttonIcon: {
    marginRight: 8,
  },
});