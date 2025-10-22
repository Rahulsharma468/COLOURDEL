import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  interpolateColor
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

interface AnimatedInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
}

export default function AnimatedInput({ 
  label, 
  error, 
  icon, 
  onFocus, 
  onBlur, 
  value,
  ...props 
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnimation = useSharedValue(0);
  const errorAnimation = useSharedValue(0);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    focusAnimation.value = withSpring(1);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (!value) {
      focusAnimation.value = withSpring(0);
    }
    onBlur?.(e);
  };

  React.useEffect(() => {
    errorAnimation.value = withTiming(error ? 1 : 0);
  }, [error]);

   const labelStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: focusAnimation.value === 1 || value ? withSpring(-25) : withSpring(0),
      },
      {
        scale: focusAnimation.value === 1 || value ? withSpring(0.8) : withSpring(1),
      },
    ] as any,
    color: interpolateColor(
      focusAnimation.value,
      [0, 1],
      ['#999', '#FF6B9D']
    ),
  }));

  const containerStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      focusAnimation.value,
      [0, 1],
      [error ? '#FF4757' : '#E0E0E0', error ? '#FF4757' : '#FF6B9D']
    ),
    transform: [
      {
        scale: focusAnimation.value === 1 ? withSpring(1.02) : withSpring(1),
      },
    ],
  }));

  const errorStyle = useAnimatedStyle(() => ({
    opacity: errorAnimation.value,
    transform: [
      {
        translateY: withTiming(errorAnimation.value === 1 ? 0 : -10),
      },
    ],
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, containerStyle]}>
        {icon && (
          <MaterialIcons 
            name={icon} 
            size={24} 
            color={isFocused ? '#FF6B9D' : '#999'} 
            style={styles.icon}
          />
        )}
        <View style={styles.inputWrapper}>
          <Animated.Text style={[styles.label, labelStyle]}>
            {label}
          </Animated.Text>
          <TextInput
            style={[styles.input, icon && styles.inputWithIcon]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            {...props}
          />
        </View>
      </Animated.View>
      {error && (
        <Animated.Text style={[styles.errorText, errorStyle]}>
          {error}
        </Animated.Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 0,
    top: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 10,
    color: '#333',
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  errorText: {
    color: '#FF4757',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 15,
    fontWeight: '500',
  },
});