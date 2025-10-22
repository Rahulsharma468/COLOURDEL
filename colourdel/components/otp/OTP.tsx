import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  withSequence,
  withTiming,
  FadeInDown,
  FadeInUp,
  interpolate
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

import ChildFriendlyBackground from '../common/Background';
import AnimatedButton from '../common/AnimatedButton';
import { AuthStackParamList } from '../../types/auth';
import { validateOTP } from '../../utils/validation';
import styles from './style';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

const OTP_LENGTH = 6;

export default function OTPScreen({ navigation, route }: Props) {
  const { emailOrPhone, isRegistration } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const logoScale = useSharedValue(0);
  const formTranslateY = useSharedValue(50);
  const pulseAnimation = useSharedValue(1);

  React.useEffect(() => {
    logoScale.value = withDelay(300, withSpring(1));
    formTranslateY.value = withDelay(500, withSpring(0));
    
    // Pulse animation for OTP inputs
    pulseAnimation.value = withSequence(
      withTiming(1.05, { duration: 1000 }),
      withTiming(1, { duration: 1000 })
    );
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const formStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: formTranslateY.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnimation.value }],
  }));

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      const nextInput = `otpInput${index + 1}`;
      // In a real app, you'd focus the next input here
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    
    if (!validateOTP(otpString)) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success! 🎉', 
        isRegistration 
          ? 'Account created successfully! Welcome to our fun world!' 
          : 'Login successful! Welcome back!',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // In a real app, navigate to main app
              navigation.navigate('Login');
            }
          }
        ]
      );
    }, 2000);
  };

  const handleResendOTP = () => {
    setTimer(60);
    setCanResend(false);
    Alert.alert('OTP Sent! 📱', 'A new code has been sent to your device');
  };

  const renderOTPInputs = () => {
    return otp.map((digit, index) => (
      <Animated.View 
        key={index} 
        style={[styles.otpInputContainer, pulseStyle]}
        entering={FadeInDown.delay(600 + index * 100)}
      >
        <Text style={styles.otpInput}>{digit}</Text>
      </Animated.View>
    ));
  };

  const renderNumberPad = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    
    return (
      <View style={styles.numberPad}>
        {numbers.map((number, index) => (
          <Animated.View 
            key={number} 
            entering={FadeInUp.delay(800 + index * 50)}
          >
            <AnimatedButton
              title={number.toString()}
              variant="secondary"
              onPress={() => {
                const emptyIndex = otp.findIndex(digit => digit === '');
                if (emptyIndex !== -1) {
                  handleOtpChange(number.toString(), emptyIndex);
                }
              }}
              style={styles.numberButton}
            />
          </Animated.View>
        ))}
        <Animated.View entering={FadeInUp.delay(1300)}>
          <AnimatedButton
            title="⌫"
            variant="secondary"
            onPress={() => {
              const lastFilledIndex = otp.map((digit, index) => digit ? index : -1)
                .filter(index => index !== -1)
                .pop();
              if (lastFilledIndex !== undefined) {
                handleOtpChange('', lastFilledIndex);
              }
            }}
            style={styles.numberButton}
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChildFriendlyBackground />
      
      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, logoStyle]} entering={FadeInUp.delay(200)}>
          <View style={styles.logoCircle}>
            <MaterialIcons name="security" size={60} color="#FF6B9D" />
          </View>
          <Text style={styles.title}>Enter Magic Code! ✨</Text>
          <Text style={styles.subtitle}>
            We sent a special code to{'\n'}
            <Text style={styles.contact}>{emailOrPhone}</Text>
          </Text>
        </Animated.View>

        <Animated.View style={[styles.otpContainer, formStyle]} entering={FadeInDown.delay(400)}>
          <View style={styles.otpInputsRow}>
            {renderOTPInputs()}
          </View>

          {renderNumberPad()}

          <View style={styles.buttonContainer}>
            <AnimatedButton
              title="Verify Code! 🔓"
              onPress={handleVerifyOTP}
              loading={loading}
              icon="check-circle"
            />

            <View style={styles.resendContainer}>
              {canResend ? (
                <AnimatedButton
                  title="Resend Code 📤"
                  variant="secondary"
                  onPress={handleResendOTP}
                  icon="refresh"
                />
              ) : (
                <Text style={styles.timerText}>
                  Resend code in {timer} seconds ⏰
                </Text>
              )}
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
