import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from '../screens/Splash/SplashScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileSetupContainer from '../screens/ProfileSetup/ProfileSetupContainer';
import OnboardingScreen from '../screens/OnBoarding/OnBoardingScreen';
import { ProfileProvider } from '../contexts/ProfileContext';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const [isSplash, setIsSplash] = useState(true);
  const [isOnboarding, setIsOnboarding] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
        setIsSplash(false);
    }, 1000);
  }, []);

  const handleOnboardingComplete = () => {
    setIsOnboarding(false);
  };

  // Create custom onboarding slides
  const slides = [
    {
      image: require('../assets/images/food_image.jpg'),
      title: 'Calorie tracking made easy',
      subtitle: "Just snap a quick photo of your meal and we'll do the rest",
      overlay: true,
    },
    {
      image: require('../assets/images/food_image.jpg'),
      title: 'Track your fitness progress',
      subtitle: 'Set goals and monitor your improvements over time',
      overlay: true,
    },
    {
      image: require('../assets/images/food_image.jpg'),
      title: 'Detailed analytics',
      subtitle: 'Get insights into your nutrition and exercise patterns',
      overlay: true,
    }
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
        <ProfileProvider>
          <Stack.Navigator
            initialRouteName="ProfileSetup"
            screenOptions={{
              headerShown: false,
              animation: 'fade',
            }}
          >
            <Stack.Screen name="ProfileSetup" component={ProfileSetupContainer} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </ProfileProvider>
      )}
    </NavigationContainer>
  );
}
