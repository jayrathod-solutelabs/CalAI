import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageSourcePropType, ScrollView, Animated, Easing } from 'react-native';
import { colorsConstants } from '../constants/colorsConstants';
import RoundedButton from './RoundedButton';
import fonts from '../constants/fontConstants';
import { imageConstants } from '../constants/imageConstants';
import ConfettiEffect from './ConfettiEffect';
import MacroCard from './MacroCard';

const { width } = Dimensions.get('window');



// Define content type enum
export enum ContentType {
  OPTIONS = 'options',
  IMAGE = 'image',
  TEXT = 'text',
  CIRCULAR_ICON_OPTIONS = 'circular_icon_options',
  CIRCULAR_ICON_SUBTEXT_OPTIONS = 'circular_icon_subtext_options',
  HIGHLIGHT_TEXT = 'highlight_text',
  THANK_YOU = 'thank_you',
  PLAN_READY = 'plan_ready', 
}

// Option item interface
export interface OptionItem {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  icon?: any; // For icon-based options
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
  highlightText?: string; // For highlighted text in HIGHLIGHT_TEXT type
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
  highlightText,
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

      case ContentType.CIRCULAR_ICON_OPTIONS:
        return (
          <Animated.View 
            style={[
              styles.circularOptionsContainer, 
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
                      styles.circularOptionItem,
                      isSelected && styles.selectedCircularOption,
                    ]}
                    onPress={() => handleOptionSelect(option)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.circleIconContainer}>
                      {option.icon && (
                        <Image source={option.icon} style={styles.optionIcon} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.circularOptionText,
                        isSelected && styles.selectedCircularOptionText,
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

      case ContentType.CIRCULAR_ICON_SUBTEXT_OPTIONS:
        return (
          <Animated.View 
            style={[
              styles.circularOptionsContainer, 
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
                      styles.circularOptionItem,
                      isSelected && styles.selectedCircularOption,
                    ]}
                    onPress={() => handleOptionSelect(option)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.circleIconContainer}>
                      {option.icon && (
                        <Image source={option.icon} style={styles.optionIcon} />
                      )}
                    </View>
                    <View style={styles.optionTextContainer}>
                      <Text
                        style={[
                          styles.circularOptionText,
                          isSelected && styles.selectedCircularOptionText,
                        ]}
                      >
                        {option.label}
                      </Text>
                      {option.subtext && (
                        <Text
                          style={[
                            styles.optionSubtext,
                            isSelected && styles.selectedOptionSubtext,
                          ]}
                        >
                          {option.subtext}
                        </Text>
                      )}
                    </View>
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
        
      case ContentType.HIGHLIGHT_TEXT:
        return (
          <Animated.View 
            style={[
              styles.highlightTextContainer, 
              { opacity: fadeAnim, transform: [{ translateX: translateXAnim }] }
            ]}
          >
            <Text style={styles.highlightTitleText}>
              Losing <Text style={styles.highlightedPart}>{highlightText}</Text> is a realistic target. it's not hard at all!
            </Text>
            <Text style={styles.highlightSubText}>
              90% of users say that the change is obvious after using Cal AI and it is not easy to rebound.
            </Text>
          </Animated.View>
        );
        
      case ContentType.THANK_YOU:
        return (
          <Animated.View 
            style={[
              styles.thankYouContainer, 
              { opacity: fadeAnim, transform: [{ translateX: translateXAnim }] }
            ]}
          >
            {/* <ConfettiEffect /> */}
            <View style={styles.checkmarkContainer}>
              <View style={styles.checkmarkIconWrapper}>
                <Image 
                  source={imageConstants.ThumbsUpIcon} 
                  style={styles.checkmarkIcon} 
                />
              </View>
              <Text style={styles.allDoneText}>All done!</Text>
            </View>
            <Text style={styles.thankYouTitleText}>
              Thank you for trusting us
            </Text>
            <Text style={styles.thankYouSubText}>
              We promise to always keep your personal information private and secure.
            </Text>
          </Animated.View>
        );

        case ContentType.PLAN_READY:
          return (
            <View style={styles.container}>
              <Animated.View 
                style={[
                  styles.contentContainer, 
                  { opacity: fadeAnim, transform: [{ translateX: translateXAnim }] }
                ]}
              >
                {/* Checkmark */}
                <View style={styles.checkmarkContainerNew}>
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkSymbol}>✓</Text>
                  </View>
                </View>
                
                {/* Congratulations text */}
                <Text style={styles.congratulationsTitle}>Congratulations</Text>
                <Text style={styles.congratulationsTitle}>your custom plan is ready!</Text>
                
                {/* Weight target */}
                <View style={styles.weightTargetContainer}>
                  <Text style={styles.weightTargetLabel}>You should Lose:</Text>
                  <View style={styles.weightTargetPill}>
                    <Text style={styles.weightTargetValue}>10.0 lbs by May 27</Text>
                  </View>
                </View>
        
                {/* Daily recommendation section */}
                <View style={styles.recommendationsSectionNew}>
                  <Text style={styles.recommendationsTitleNew}>Daily Recommendation</Text>
                  <Text style={styles.recommendationsSubtitle}>You can edit this any time</Text>


          <View style={styles.content}>
          <View style={styles.macrosGrid}>
  <MacroCard 
    title="Calories" 
    value="1790" 
    progressColor="#333333"
    progress={0.1}  // Adjust this value to match the progress shown in the screenshot
    onEditPress={handleEditCalories} 
  />
  
  <MacroCard 
    title="Carbs" 
    value="219g" 
    progressColor="#E8A87C"
    progress={0.6}  // Adjust this value to match the progress shown in the screenshot
    onEditPress={handleEditCarbs} 
  />
  
  <MacroCard 
    title="Protein" 
    value="116g" 
    progressColor="#E27D60"
    progress={0.3}  // Adjust this value to match the progress shown in the screenshot
    onEditPress={handleEditProtein}
  />
  
  <MacroCard 
    title="Fats" 
    value="49g" 
    progressColor="#85CDCA"
    progress={0.8}  // Adjust this value to match the progress shown in the screenshot
    onEditPress={handleEditFats} 
  />
</View>



      </View>
                  
                  {/* Health score */}
                  <View style={styles.healthScoreContainer}>
                    <View style={styles.healthScoreHeader}>
                      <View style={styles.healthScoreIcon}>
                        <Text style={styles.heartIcon}>♥</Text>
                      </View>
                      <Text style={styles.healthScoreText}>Health score</Text>
                    </View>
                    <Text style={styles.healthScoreValue}>7/10</Text>
                    <View style={styles.healthScoreBar}>
                      <View style={[styles.healthScoreFill, { width: '70%' }]} />
                    </View>
                  </View>
                  
                  {/* Goals section from second image */}
                  <View style={styles.goalsSection}>
                    <Text style={styles.goalsSectionTitle}>How to reach your goals:</Text>
                    
                    {/* Goal items */}
                    <View style={styles.goalItem}>
                      <View style={styles.goalIcon}>
                        <Text style={styles.goalIconText}>♥⚡</Text>
                      </View>
                      <Text style={styles.goalText}>Use health scores to improve your routine</Text>
                    </View>
                    
                    <View style={styles.goalItem}>
                      <View style={styles.goalIcon}>
                        <Text style={styles.goalIconText}>🥑</Text>
                      </View>
                      <Text style={styles.goalText}>Track your food</Text>
                    </View>
                    
                    <View style={styles.goalItem}>
                      <View style={styles.goalIcon}>
                        <Text style={styles.goalIconText}>◯</Text>
                      </View>
                      <Text style={styles.goalText}>Follow your daily calorie recommendation</Text>
                    </View>
                  </View>
                </View>
              </Animated.View>
            </View>
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
      {/* Navigation row with back button and progress bar */}
      <View style={styles.navigationRow}>
        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Image source={imageConstants.BackArrow} style={styles.backButtonImage} />
        </TouchableOpacity>
        
        {/* Progress indicator */}
        {renderProgressBar()}
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.contentScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title and subtitle - only show for non-THANK_YOU screens */}
        {contentType !== ContentType.THANK_YOU && contentType !== ContentType.HIGHLIGHT_TEXT && contentType !== ContentType.PLAN_READY && (
          <Animated.View 
            style={[
              styles.headerContainer, 
              { opacity: fadeAnim, transform: [{ translateX: translateXAnim }] }
            ]}
          >
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.subtitleText}>{subtitle}</Text>
          </Animated.View>
        )}
        
        {/* Main content area */}
        <View style={[
          styles.mainContent,
          (contentType === ContentType.THANK_YOU || contentType === ContentType.HIGHLIGHT_TEXT || contentType === ContentType.PLAN_READY) && styles.centeredContent
        ]}>
          {renderContent()}
        </View>
      </ScrollView>
      
      {/* Next button */}
      <View style={styles.buttonContainer}>
        <RoundedButton
          title={contentType === ContentType.THANK_YOU ? "Create my plan" : nextButtonTitle}
          onPress={handleNextPress}
          disabled={nextDisabled}
        />
      </View>
    </View>

    
  );
};

const handleEditCalories = () => {
  console.log('Edit calories');
  
};

const handleEditCarbs = () => {
  console.log('Edit carbs');
 
};

const handleEditProtein = () => {
  console.log('Edit protein');
 
};

const handleEditFats = () => {
  console.log('Edit fats');
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  navigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
  },
  backButtonImage: {
    width: 20,
    height: 20,
  },
  progressContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 0,
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
  // Circular options styles
  circularOptionsContainer: {
    width: '100%',
  },
    
  planReadyContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  congratulationsTitle: {
    fontSize: 28,
    textAlign: 'center',
    color: colorsConstants.onBoardingTitle,
    fontFamily: fonts.DMSansBold,
    lineHeight: 42,
  },
  planReadySubtitle: {
    fontFamily: fonts.DMSansMedium,
    fontSize: 32,
    textAlign: 'center',
    color: colorsConstants.ActiveDot,
    marginBottom: 32,
  },
  weightTargetContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  weightTargetLabel: {
    fontFamily: fonts.DMSansBold,
    fontSize: 20,
    color: colorsConstants.onBoardingTitle,
    marginBottom: 16,
  },
  weightTargetPill: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 12,
    marginBottom: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  weightTargetValue: {
    fontFamily: fonts.DMSansBold,
    fontSize: 18,
    color: colorsConstants.onBoardingTitle,
  },
  recommendationsSectionNew: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  recommendationsTitleNew: {
    fontSize: 20,
    fontFamily: fonts.DMSansMedium,
    marginBottom: 2,
  },
  recommendationsSubtitleNew: {
    fontSize: 16,
    color: '#666666',
    fontFamily: fonts.DMSansMedium,
    marginBottom: 24,
  },

  macrosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  macroCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editIcon: {
    fontSize: 16,
  },
  healthScoreContainer: {
    width: '100%',
    marginBottom: 24,
  },
  healthScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthScoreIcon: {
    marginRight: 8,
  },
  healthScoreText: {
    fontSize: 16,
  },
  healthScoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  goalsSection: {
    width: '100%',
  },
  goalsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  recommendationsSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  goalIcon: {
    marginRight: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5E5',
    marginTop: 8,
    marginHorizontal: 16,
  },
  progressFillNew: {
    height: '100%',
    width: '95%', // Adjust based on progress
    backgroundColor: '#000000',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 24,
    alignItems: 'center',
  },
  checkmarkContainerNew: {
    marginBottom: 16,
  },
  checkmark: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkSymbol: {
    color: '#FFFFFF',
    fontSize: 32,
  },

  goalIconText: {
    fontSize: 16,
  },
  goalText: {
    fontSize: 16,
    flex: 1,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  healthScoreBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  healthScoreFill: {
    height: '100%',
    backgroundColor: '#5CB85C',
  },
  heartIcon: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  macroTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  progressCircleContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  circularOptionItem: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCircularOption: {
    backgroundColor: '#1c1b23',
  },
  circleIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  optionTextContainer: {
    flex: 1,
  },
  circularOptionText: {
    fontSize: 18,
    fontFamily: fonts.DMSansMedium,
    color: '#1c1b23',
  },
  selectedCircularOptionText: {
    color: 'white',
  },
  optionSubtext: {
    fontSize: 14,
    fontFamily: fonts.DMSansRegular,
    color: '#666',
    marginTop: 4,
  },
  selectedOptionSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  // Image styles
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
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
  // Highlight text styles
  highlightTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  highlightTitleText: {
    fontSize: 38,
    textAlign: 'center',
    color: colorsConstants.onBoardingTitle,
    fontFamily: fonts.DMSansBold,
    marginBottom: 30,
    lineHeight: 44,
  },
  highlightedPart: {
    color: '#E8833B', // Orange color from the screenshot
  },
  highlightSubText: {
    fontSize: 18,
    textAlign: 'center',
    color: colorsConstants.onBoardingSubtitle,
    fontFamily: fonts.DMSansRegular,
    lineHeight: 26,
  },
  
  // Thank you screen styles
  thankYouContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  checkmarkContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  checkmarkIconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#E8833B', // Orange background
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  checkmarkIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  allDoneText: {
    fontSize: 18,
    color: colorsConstants.onBoardingTitle,
    fontFamily: fonts.DMSansMedium,
  },
  thankYouTitleText: {
    fontSize: 36,
    textAlign: 'center',
    color: colorsConstants.onBoardingTitle,
    fontFamily: fonts.DMSansBold,
    marginBottom: 16,
    lineHeight: 42,
  },
  thankYouSubText: {
    fontSize: 18,
    textAlign: 'center',
    color: colorsConstants.onBoardingSubtitle,
    fontFamily: fonts.DMSansRegular,
    lineHeight: 26,
  },
  
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormScreen; 