import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  FadeInDown,
  FadeInUp
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

import ChildFriendlyBackground from '../common/Background';
import AnimatedInput from '../common/AnimatedInput';
import AnimatedButton from '../common/AnimatedButton';
import { AuthStackParamList } from '../../types/auth';
import { validateEmailOrPhone, validatePassword } from '../../utils/validation';
import styles from './style';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ emailOrPhone?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const logoScale = useSharedValue(0);
  const formTranslateY = useSharedValue(50);

  React.useEffect(() => {
    logoScale.value = withDelay(300, withSpring(1));
    formTranslateY.value = withDelay(500, withSpring(0));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const formStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: formTranslateY.value }],
  }));

  const validateForm = () => {
    const newErrors: { emailOrPhone?: string; password?: string } = {};

    const emailPhoneValidation = validateEmailOrPhone(emailOrPhone);
    if (!emailPhoneValidation.isValid) {
      newErrors.emailOrPhone = 'Please enter a valid email or phone number';
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success! 🎉', 'Welcome back, little explorer!', [
        { text: 'OK', style: 'default' }
      ]);
    }, 2000);

    navigation.navigate('Main');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChildFriendlyBackground />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.logoContainer, logoStyle]} entering={FadeInUp.delay(200)}>
            <View style={styles.logoCircle}>
              <MaterialIcons name="child-care" size={60} color="#FF6B9D" />
            </View>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Ready for more fun adventures? 🌟</Text>
          </Animated.View>

          <Animated.View style={[styles.formContainer, formStyle]} entering={FadeInDown.delay(400)}>
            <AnimatedInput
              label="Email or Phone Number"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              error={errors.emailOrPhone}
              icon="person"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder=""
            />

            <View style={styles.passwordContainer}>
              <AnimatedInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                error={errors.password}
                icon="lock"
                secureTextEntry={!showPassword}
                placeholder=""
              />
              <AnimatedButton
                title={showPassword ? "Hide" : "Show"}
                variant="secondary"
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showPasswordButton}
              />
            </View>

            <View style={styles.buttonContainer}>
              <AnimatedButton
                title="Let's Go! 🚀"
                onPress={handleLogin}
                loading={loading}
                icon="login"
              />

              <Text style={styles.orText}>or</Text>

              <AnimatedButton
                title="Create New Account 🎨"
                variant="secondary"
                onPress={handleRegister}
                icon="person-add"
              />
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
