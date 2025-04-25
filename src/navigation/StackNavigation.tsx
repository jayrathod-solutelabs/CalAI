import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import SplashScreen from '../screens/Splash/SplashScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import OnboardingScreen from '../screens/OnBoarding/OnBoardingScreen';
import MacroEditScreen from '../screens/ProfileSetup/MacroEditScreen';
import ProfileSetupContainer from '../screens/ProfileSetup/ProfileSetupContainer';

// Define the types for navigation
export type RootStackParamList = {
  Steps: undefined;
  Home: undefined;
  MacroEdit: {
    title: string;
    value: string | number;
    progressColor: string;
    progress: number;
    icon?: any;
    unit?: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  const [isSplash, setIsSplash] = useState(true);
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [isSetupSkipped, setIsSetupSkipped] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem('onboarding_completed');
        const setupSkipped = await AsyncStorage.getItem('profile_setup_skipped');
        
        if (onboardingCompleted === 'true') {
          setIsOnboarding(false);
        }
        
        if (setupSkipped === 'true') {
          setIsSetupSkipped(true);
        }
      } catch (error) {
        console.error('Error checking storage:', error);
      } finally {
        // Always hide splash after checking, with slight delay for visibility
        setTimeout(() => {
          setIsSplash(false);
        }, 1000);
      }
    };
    
    checkUserStatus();
  }, []);

  const handleOnboardingComplete = () => {
    AsyncStorage.setItem('onboarding_completed', 'true')
      .then(() => setIsOnboarding(false))
      .catch(error => {
        console.error('Error saving onboarding status:', error);
        setIsOnboarding(false);
      });
  };

  // Create custom onboarding slides
  const slides = [
    {
      image: require('../assets/images/food_image.jpg'),
      title: 'Calorie tracking made easy',
      subtitle: "Just snap a quick photo of your meal and we'll do the rest",
      overlay: true,
    },
    // Other slides...
  ];

  return (
    <NavigationContainer>
      {isSplash ? (
        <SplashScreen />
      ) : isOnboarding ? (
        <OnboardingScreen 
          slides={slides}
          onComplete={handleOnboardingComplete}
        />
      ) : (
        <Stack.Navigator
          initialRouteName={isSetupSkipped ? "Home" : "Steps"}
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          <Stack.Screen name="Steps" component={ProfileSetupContainer} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MacroEdit" component={MacroEditScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}