// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";

// import LoginScreen from "./components/login/Login";
// import RegisterScreen from "./components/register/Register";
// import OTPScreen from "./components/otp/OTP";

// export type AuthStackParamList = {
//   Login: undefined;
//   Register: undefined;
//   OTP: { emailOrPhone: string; isRegistration: boolean };
// };

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <StatusBar style="auto" />
//         <Stack.Navigator
//           initialRouteName="Login"
//           screenOptions={{ headerShown: false }}
//         >
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Register" component={RegisterScreen} />
//           <Stack.Screen name="OTP" component={OTPScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import LoginScreen from "./components/login/Login";
import RegisterScreen from "./components/register/Register";
import OTPScreen from "./components/otp/OTP";

import HomeScreen from "./components/home/home";
import StreakScreen from "./components/streak/streak";
import ReportScreen from "./components/report/report";
import ProfileScreen from "./components/profile/profile";

// ----------------------
// Animated Tab Icon
// ----------------------
function AnimatedTabIcon({
  name,
  focused,
}: {
  name: any;
  focused: boolean;
}) {
  const scale = useSharedValue(focused ? 1.2 : 1);
  const opacity = useSharedValue(focused ? 1 : 0.6);

  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1);
    opacity.value = withSpring(focused ? 1 : 0.6);
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <MaterialIcons
        name={name}
        size={24}
        color={focused ? "#FF6B9D" : "#999"}
      />
    </Animated.View>
  );
}

// ----------------------
// Tabs Navigator
// ----------------------
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#FF6B9D",
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon name="home" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Streak"
        component={StreakScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon
              name="local-fire-department"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon name="assessment" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon name="person" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ----------------------
// Root Stack Navigator
// ----------------------
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  OTP: { emailOrPhone: string; isRegistration: boolean };
  Main: undefined; // 👈 for the tab navigator
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          {/* Auth flow */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />

          {/* Main App */}
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
