// components/OnboardingSlide.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageSourcePropType, StatusBar } from 'react-native';
import { colorsConstants } from '../../constants/colorsConstants';
import fonts from '../../constants/fontConstants';

const { width } = Dimensions.get('window');

interface OnboardingSlideProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  overlay?: boolean;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ image, title, subtitle, overlay }) => {
  return (
    <View style={styles.slide}>
    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      <Image source={image} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '62%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameOverlay: {
    width: '70%',
    height: '35%', 
    position: 'absolute',
    top: '25%',
  },
  frameCorner: {
    width: 20,
    height: 20,
    borderColor: 'white',
    position: 'absolute',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    height: '45%', // Adjusted to match screenshot
    paddingTop: 30,
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 24,
    color: colorsConstants.onBoardingTitle,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: fonts.DMSansBold,
  },
  subtitle: {
    fontSize: 16,
    color: colorsConstants.onBoardingSubtitle,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: fonts.DMSansRegular, 
  },
});
export default OnboardingSlide;