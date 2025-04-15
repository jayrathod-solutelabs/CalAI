import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageSourcePropType, ScrollView, Animated, Easing } from 'react-native';
import { colorsConstants } from '../constants/colorsConstants';
import RoundedButton from './RoundedButton';
import fonts from '../constants/fontConstants';

const { width } = Dimensions.get('window');

// Define content type enum
export enum ContentType {
  OPTIONS = 'options',
  IMAGE = 'image',
  TEXT = 'text',
}

// Option item interface
export interface OptionItem {
  id: string;
  label: string;
  value: string;
}

// Props for the FormScreen component
export interface FormScreenProps {
  title: string;
  subtitle: string;
  contentType: ContentType;
  // Content props based on type
  options?: OptionItem[];
  selectedOption?: string;
  onSelectOption?: (value: string) => void;
  imageSource?: ImageSourcePropType;
  imageAlt?: string;
  textContent?: string;
  // Progress props
  currentStep: number;
  totalSteps: number;
  // Navigation
  onNext: () => void;
  onBack: () => void;
  // Button state
  nextDisabled?: boolean;
  nextButtonTitle?: string;
}

const FormScreen: React.FC<FormScreenProps> = ({
  title,
  subtitle,
  contentType,
  options = [],
  selectedOption,
  onSelectOption,
  imageSource,
  imageAlt,
  textContent,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  nextDisabled = false,
  nextButtonTitle = 'Next',
}) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  
  // Store previous step to detect changes
  const prevStepRef = useRef<number>(currentStep);
  
  // Track which option was just selected for animation
  const [lastSelectedOption, setLastSelectedOption] = useState<string | null>(null);
  
  // Store references to option animations
  const optionAnimations = useRef<{[key: string]: Animated.Value}>({});

  // Run animation only when step changes
  useEffect(() => {
    if (prevStepRef.current !== currentStep) {
      // Reset animation values
      fadeAnim.setValue(0);
      translateXAnim.setValue(50);

      // Start animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Update previous step
      prevStepRef.current = currentStep;
    }
  }, [currentStep, fadeAnim, translateXAnim]);

  // Initialize option animations when options change
  useEffect(() => {
    if (contentType === ContentType.OPTIONS && options) {
      options.forEach(option => {
        if (!optionAnimations.current[option.id]) {
          optionAnimations.current[option.id] = new Animated.Value(1);
        }
      });
    }
  }, [contentType, options]);

  // Handle option selection with animation
  const handleOptionSelect = (option: OptionItem) => {
    if (onSelectOption) {
      // First run animation
      setLastSelectedOption(option.value);
      
      // Create a scale animation
      if (optionAnimations.current[option.id]) {
        Animated.sequence([
          Animated.timing(optionAnimations.current[option.id], {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(optionAnimations.current[option.id], {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ]).start();
      }
      
      // Then call the select handler
      onSelectOption(option.value);
    }
  };

  // Render different content based on contentType
  const renderContent = () => {
    switch (contentType) {
      case ContentType.OPTIONS:
        return (
          <Animated.View 
            style={[
              styles.optionsContainer, 
              { opacity: fadeAnim, transform: [{ translateX: translateXAnim }] }
            ]}
          >
            {options.map((option) => {
              // Initialize animation value if needed
              if (!optionAnimations.current[option.id]) {
                optionAnimations.current[option.id] = new Animated.Value(1);
              }
              
              const isSelected = selectedOption === option.value;
              
              return (
                <Animated.View
                  key={option.id}
                  style={{
                    transform: [{ scale: optionAnimations.current[option.id] }],
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.optionItem,
                      isSelected && styles.selectedOption,
                    ]}
                    onPress={() => handleOptionSelect(option)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </Animated.View>
        );

      case ContentType.IMAGE:
        return (
          <Animated.View 
            style={[
              styles.imageContainer, 
              { opacity: fadeAnim, transform: [{ translateX: translateXAnim }] }
            ]}
          >
            {imageSource && (
              <Image
                source={imageSource}
                style={styles.image}
                accessibilityLabel={imageAlt}
              />
            )}
          </Animated.View>
        );

      case ContentType.TEXT:
        return (
          <Animated.View 
            style={[
              styles.textContainer, 
              { opacity: fadeAnim, transform: [{ translateX: translateXAnim }] }
            ]}
          >
            <Text style={styles.contentText}>{textContent}</Text>
          </Animated.View>
        );

      default:
        return null;
    }
  };

  // Render progress indicator
  const renderProgressBar = () => {
    const progressWidth = (currentStep / totalSteps) * 100;
    
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <Animated.View 
            style={[
              styles.progressFill,
              { width: `${progressWidth}%` }
            ]} 
          />
        </View>
      </View>
    );
  };

  // Handle next button press
  const handleNextPress = () => {
    console.log('Next button pressed');
    if (onNext) {
      onNext();
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      {/* Progress indicator */}
      {renderProgressBar()}
      
      <ScrollView 
        contentContainerStyle={styles.contentScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title and subtitle */}
        <Animated.View 
          style={[
            styles.headerContainer, 
            { opacity: fadeAnim, transform: [{ translateX: translateXAnim }] }
          ]}
        >
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </Animated.View>
        
        {/* Main content area */}
        <View style={styles.mainContent}>
          {renderContent()}
        </View>
      </ScrollView>
      
      {/* Next button */}
      <View style={styles.buttonContainer}>
        <RoundedButton
          title={nextButtonTitle}
          onPress={handleNextPress}
          disabled={nextDisabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginTop: 60,
  },
  progressBackground: {
    height: 6,
    backgroundColor: colorsConstants.InactiveDot,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colorsConstants.ActiveDot,
    borderRadius: 3,
  },
  contentScrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 40,
  },
  titleText: {
    fontSize: 34,
    color: colorsConstants.onBoardingTitle,
    fontFamily: fonts.DMSansBold,
    marginBottom: 12,
  },
  subtitleText: {
    fontSize: 16,
    color: colorsConstants.onBoardingSubtitle,
    fontFamily: fonts.DMSansRegular,
    lineHeight: 22,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  // Options styles
  optionsContainer: {
    width: '100%',
  },
  optionItem: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#1c1b23',
  },
  optionText: {
    fontSize: 18,
    fontFamily: fonts.DMSansMedium,
    color: '#1c1b23',
  },
  selectedOptionText: {
    color: 'white',
  },
  // Image styles
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  // Text styles
  textContainer: {
    paddingVertical: 20,
  },
  contentText: {
    fontSize: 18,
    fontFamily: fonts.DMSansRegular,
    color: '#333',
    lineHeight: 26,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    width: '100%',
  },
});

export default FormScreen; 