import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

import ChildFriendlyBackground from "../common/Background";
import AnimatedInput from "../common/AnimatedInput";
import AnimatedButton from "../common/AnimatedButton";
import { AuthStackParamList } from "../../types/auth";
import { validateEmailOrPhone, validatePassword } from "../../utils/validation";
import styles from "./style";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    emailOrPhone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
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
    const newErrors: {
      name?: string;
      emailOrPhone?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name";
    }

    const emailPhoneValidation = validateEmailOrPhone(emailOrPhone);
    if (!emailPhoneValidation.isValid) {
      newErrors.emailOrPhone = "Please enter a valid email or phone number";
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("OTP", {
        emailOrPhone,
        isRegistration: true,
      });
    }, 2000);
  };

  const handleBackToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChildFriendlyBackground />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[styles.logoContainer, logoStyle]}
            entering={FadeInUp.delay(200)}
          >
            <View style={styles.logoCircle}>
              <MaterialIcons name="star" size={60} color="#FF6B9D" />
            </View>
            <Text style={styles.title}>Join the Fun!</Text>
            <Text style={styles.subtitle}>
              Create your account and start exploring! 🎈
            </Text>
          </Animated.View>

          <Animated.View
            style={[styles.formContainer, formStyle]}
            entering={FadeInDown.delay(400)}
          >
            <AnimatedInput
              label="Your Name"
              value={name}
              onChangeText={setName}
              error={errors.name}
              icon="person"
              autoCapitalize="words"
              placeholder=""
            />

            <AnimatedInput
              label="Email or Phone Number"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              error={errors.emailOrPhone}
              icon="contact-mail"
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

            <AnimatedInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={errors.confirmPassword}
              icon="lock-outline"
              secureTextEntry={!showPassword}
              placeholder=""
            />

            <View style={styles.buttonContainer}>
              <AnimatedButton
                title="Create Account! 🎉"
                onPress={handleRegister}
                loading={loading}
                icon="person-add"
              />

              <Text style={styles.orText}>or</Text>

              <AnimatedButton
                title="Back to Login 🔙"
                variant="secondary"
                onPress={handleBackToLogin}
                icon="arrow-back"
              />
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
