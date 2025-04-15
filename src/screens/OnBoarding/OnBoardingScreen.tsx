// OnboardingScreen.tsx
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import OnboardingSlide from './OnboardingSlide';
import RoundedButton from '../../components/RoundedButton';
import { colorsConstants } from '../../constants/colorsConstants';

const { width } = Dimensions.get('window');

export interface SlideData {
  image: any;
  title: string;
  subtitle: string;
  overlay?: boolean;
}

interface OnboardingScreenProps {
  onComplete?: () => void;
  slides?: SlideData[];
}

// Default slides data for testing
const defaultSlides: SlideData[] = [
  {
    image: require('../../assets/images/food_image.jpg'),
    title: 'Calorie tracking made easy',
    subtitle: 'Just snap a quick photo of your meal and we\'ll do the rest',
    overlay: true
  },
  {
    image: require('../../assets/images/food_image.jpg'),
    title: 'Track your fitness progress',
    subtitle: 'Set goals and monitor your improvements over time',
    overlay: true
  },
  {
    image: require('../../assets/images/food_image.jpg'),
    title: 'Detailed analytics',
    subtitle: 'Get insights into your nutrition and exercise patterns',
    overlay: true
  }
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, slides = defaultSlides }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<SlideData>>(null);

  const handleNext = (): void => {
    onComplete && onComplete();
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const renderPagination = (): JSX.Element => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex ? styles.paginationDotActive : {}
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => <OnboardingSlide {...item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => index.toString()}
      />
      {renderPagination()}
      <View style={styles.buttonContainer}>
        <RoundedButton
          title="Next" 
          onPress={handleNext} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 40,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: colorsConstants.InactiveDot,
  },
  paginationDotActive: {
    backgroundColor: colorsConstants.ActiveDot,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default OnboardingScreen;