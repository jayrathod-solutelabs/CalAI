import {View, Text, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useState} from 'react';
import OnboardingScreen, {SlideData} from '../OnBoarding/OnBoardingScreen';
import {imageConstants} from '../../constants/imageConstants';

export default function HomeScreen() {
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(false);

  const slides: SlideData[] = [
    {
      image: require('../../assets/images/food_image.jpg'),
      title: 'Calorie tracking made easy',
      subtitle: "Just snap a quick photo of your meal and we'll do the rest",
      overlay: true,
    },
    {
      image: require('../../assets/images/food_image.jpg'),
      title: 'Track your workouts',
      subtitle: 'Keep a record of all your exercise activities',
      overlay: true,
    },
    {
      image: require('../../assets/images/food_image.jpg'),
      title: 'See your progress',
      subtitle: 'Watch your achievements grow over time',
      overlay: true,
    },
  ];

  const handleOnboardingComplete = (): void => {
    setOnboardingComplete(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {onboardingComplete ? (
        <Text>Main App Content</Text>
      ) : (
        <OnboardingScreen
          slides={slides}
          onComplete={handleOnboardingComplete}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
