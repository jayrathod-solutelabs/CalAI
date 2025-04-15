import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FormScreen, { ContentType, OptionItem } from '../../components/FormScreen';
import { useProfile } from '../../contexts/ProfileContext';
import { imageConstants } from '../../constants/imageConstants';

// Replace individual image imports with constants
const appLogo = imageConstants.SplashScreenLogo;
const weight = imageConstants.Weight;
const orange = imageConstants.orange;
const sun = imageConstants.sun;
const rocket = imageConstants.rocket;
const yoga = imageConstants.yoga;
const pescatarian = imageConstants.pescatarian;
const vegetarian = imageConstants.vegetarian;
const vegan = imageConstants.vegan;
const fish = imageConstants.fish;
const weightTransition = imageConstants.WeightTransition;
const lowFrequencyIcon = imageConstants.LowFrequencyIcon;
const medFrequencyIcon = imageConstants.MedFrequencyIcon;
const highFrequencyIcon = imageConstants.HighFrequencyIcon;
const thumbsUpIcon = imageConstants.ThumbsUpIcon;
const thumbsDownIcon = imageConstants.ThumbsDownIcon;
const activityLowIcon = imageConstants.ActivityLowIcon;
const activityMediumIcon = imageConstants.ActivityMediumIcon;
const activityHighIcon = imageConstants.ActivityHighIcon;
const mealThreeIcon = imageConstants.MealThreeIcon;
const mealFourIcon = imageConstants.MealFourIcon;
const mealFiveIcon = imageConstants.MealFiveIcon;

// Define content props type
interface ContentProps {
  title: string;
  subtitle: string;
  contentType: ContentType;
  options?: OptionItem[];
  selectedOption?: string;
  onSelectOption?: (value: string) => void;
  imageSource?: any;
  imageAlt?: string;
  textContent?: string;
}

// All screens data
const ProfileSetupContainer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { profileData, updateProfile } = useProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const TOTAL_STEPS = 12;

  // State for each step
  const [selectedGender, setSelectedGender] = useState<string | undefined>(profileData.gender);
  const [selectedFrequency, setSelectedFrequency] = useState<string | undefined>(profileData.workoutFrequency);
  const [selectedPreviousApps, setSelectedPreviousApps] = useState<string | undefined>(profileData.usedPreviousApps);
  const [selectedGoal, setSelectedGoal] = useState<string | undefined>(profileData.goal);
  const [selectedDiet, setSelectedDiet] = useState<string | undefined>(profileData.diet);
  const [selectedAccomplishment, setSelectedAccomplishment] = useState<string | undefined>(profileData.accomplishment);
  const [selectedActivity, setSelectedActivity] = useState<string | undefined>(profileData.activityLevel);
  const [selectedMealPreference, setSelectedMealPreference] = useState<string | undefined>(profileData.mealPreference);
  const [selectedTrackingFrequency, setSelectedTrackingFrequency] = useState<string | undefined>(profileData.trackingFrequency);

  useEffect(() => {
    // If we have saved profile data, initialize the state
    if (profileData.gender) setSelectedGender(profileData.gender);
    if (profileData.workoutFrequency) setSelectedFrequency(profileData.workoutFrequency);
    if (profileData.usedPreviousApps) setSelectedPreviousApps(profileData.usedPreviousApps);
    if (profileData.goal) setSelectedGoal(profileData.goal);
    if (profileData.diet) setSelectedDiet(profileData.diet);
    if (profileData.accomplishment) setSelectedAccomplishment(profileData.accomplishment);
    if (profileData.activityLevel) setSelectedActivity(profileData.activityLevel);
    if (profileData.mealPreference) setSelectedMealPreference(profileData.mealPreference);
    if (profileData.trackingFrequency) setSelectedTrackingFrequency(profileData.trackingFrequency);
  }, [profileData]);

  // Handle back navigation
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Go back to previous screen if on first step
      navigation.goBack();
    }
  };

  // Handle next navigation
  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to home on completion
      navigation.navigate('Home');
    }
  };

  // Handle option selections
  const handleSelectGender = (value: string) => {
    setSelectedGender(value);
    updateProfile({ gender: value });
  };

  const handleSelectFrequency = (value: string) => {
    setSelectedFrequency(value);
    updateProfile({ workoutFrequency: value });
  };

  const handleSelectPreviousApps = (value: string) => {
    setSelectedPreviousApps(value);
    updateProfile({ usedPreviousApps: value });
  };

  const handleSelectGoal = (value: string) => {
    setSelectedGoal(value);
    updateProfile({ goal: value });
  };

  const handleSelectDiet = (value: string) => {
    setSelectedDiet(value);
    updateProfile({ diet: value });
  };

  const handleSelectAccomplishment = (value: string) => {
    setSelectedAccomplishment(value);
    updateProfile({ accomplishment: value });
  };

  const handleSelectActivity = (value: string) => {
    setSelectedActivity(value);
    updateProfile({ activityLevel: value });
  };

  const handleSelectMealPreference = (value: string) => {
    setSelectedMealPreference(value);
    updateProfile({ mealPreference: value });
  };

  const handleSelectTrackingFrequency = (value: string) => {
    setSelectedTrackingFrequency(value);
    updateProfile({ trackingFrequency: value });
  };

  // Define all options for different steps
  const genderOptions: OptionItem[] = [
    { id: '1', label: 'Male', value: 'male' },
    { id: '2', label: 'Female', value: 'female' },
    { id: '3', label: 'Other', value: 'other' },
  ];

  const frequencyOptions: OptionItem[] = [
    { id: '1', label: '0-2', value: '0-2', icon: lowFrequencyIcon, subtext: 'Workouts now and then' },
    { id: '2', label: '3-5', value: '3-5', icon: medFrequencyIcon, subtext: 'A few workouts per week' },
    { id: '3', label: '6+', value: '6+', icon: highFrequencyIcon, subtext: 'Dedicated athlete' },
  ];

  const previousAppsOptions: OptionItem[] = [
    { id: '1', label: 'Yes', value: 'yes', icon: thumbsUpIcon },
    { id: '2', label: 'No', value: 'no', icon: thumbsDownIcon },
  ];

  const goalOptions: OptionItem[] = [
    { id: '1', label: 'Lose weight', value: 'lose' },
    { id: '2', label: 'Gain weight', value: 'gain' },
    { id: '3', label: 'Maintain weight', value: 'maintain' },
  ];

  const dietOptions: OptionItem[] = [
    { id: '1', label: 'Classic', value: 'classic', icon: fish},
    { id: '2', label: 'Pescatarian', value: 'pescatarian', icon: pescatarian },
    { id: '3', label: 'Vegetarian', value: 'vegetarian', icon: vegetarian },
    { id: '4', label: 'Vegan', value: 'vegan', icon: vegan },
  ];

  const accomplishmentOptions: OptionItem[] = [
    { id: '1', label: 'Eat and live healthier', value: 'healthier', icon: orange },
    { id: '2', label: 'Boost my energy and mood', value: 'energy', icon: sun },
    { id: '3', label: 'Stay motivated and consistent', value: 'motivated', icon: rocket },
    { id: '4', label: 'Feel better about my body', value: 'body', icon: yoga },
  ];

  const activityOptions: OptionItem[] = [
    { id: '1', label: 'Low', value: 'low', icon: activityLowIcon, subtext: 'Mostly sedentary' },
    { id: '2', label: 'Medium', value: 'medium', icon: activityMediumIcon, subtext: 'Moderately active' },
    { id: '3', label: 'High', value: 'high', icon: activityHighIcon, subtext: 'Very active lifestyle' },
  ];

  const mealPreferenceOptions: OptionItem[] = [
    { id: '1', label: '3 meals', value: 'three', icon: mealThreeIcon },
    { id: '2', label: '4 meals', value: 'four', icon: mealFourIcon },
    { id: '3', label: '5+ meals', value: 'five', icon: mealFiveIcon },
  ];

  const trackingFrequencyOptions: OptionItem[] = [
    { id: '1', label: 'Daily', value: 'daily', icon: highFrequencyIcon, subtext: 'Track meals every day' },
    { id: '2', label: 'Several times a week', value: 'several', icon: medFrequencyIcon, subtext: 'Track 3-5 days per week' },
    { id: '3', label: 'Occasionally', value: 'occasionally', icon: lowFrequencyIcon, subtext: 'Track when it fits your schedule' },
  ];

  // Check if next button should be disabled
  const isNextDisabled = () => {
    switch (currentStep) {
      case 1: return !selectedGender;
      case 2: return !selectedFrequency;
      case 3: return !selectedPreviousApps;
      case 4: return false; // Image screen
      case 5: return !selectedGoal;
      case 6: return !selectedDiet;
      case 7: return !selectedAccomplishment;
      case 8: return !selectedActivity;
      case 9: return !selectedMealPreference;
      case 10: return !selectedTrackingFrequency;
      case 11: return false; // Image screen
      case 12: return false; // Final screen
      default: return false;
    }
  };

  // Render the content based on current step
  const renderStepContent = (): ContentProps => {
    switch (currentStep) {
      case 1:
        return {
          title: "Choose your gender",
          subtitle: "This will be used to calibrate your custom plan",
          contentType: ContentType.OPTIONS,
          options: genderOptions,
          selectedOption: selectedGender,
          onSelectOption: handleSelectGender,
        };
      case 2:
        return {
          title: "How many workouts do you do per week?",
          subtitle: "This will be used to calibrate your custom plan",
          contentType: ContentType.CIRCULAR_ICON_SUBTEXT_OPTIONS,
          options: frequencyOptions,
          selectedOption: selectedFrequency,
          onSelectOption: handleSelectFrequency,
        };
      case 3:
        return {
          title: "Have you tried other calorie tracking apps?",
          subtitle: "",
          contentType: ContentType.CIRCULAR_ICON_OPTIONS,
          options: previousAppsOptions,
          selectedOption: selectedPreviousApps,
          onSelectOption: handleSelectPreviousApps,
        };
      case 4:
        return {
          title: "Cal AI creates long-term results",
          subtitle: "Our AI coach adapts to your schedule and preferences",
          contentType: ContentType.IMAGE,
          imageSource: weight,
          imageAlt: "Cal AI Logo",
        };
      case 5:
        return {
          title: "What is your goal?",
          subtitle: "This helps us generate a plan for your calorie intake",
          contentType: ContentType.OPTIONS,
          options: goalOptions,
          selectedOption: selectedGoal,
          onSelectOption: handleSelectGoal,
        };
      case 6:
        return {
          title: "Do you follow a specific diet?",
          subtitle: "We'll tailor your meal recommendations accordingly",
          contentType: ContentType.CIRCULAR_ICON_OPTIONS,
          options: dietOptions,
          selectedOption: selectedDiet,
          onSelectOption: handleSelectDiet,
        };
      case 7:
        return {
          title: "What would you like to accomplish?",
          subtitle: "Beyond just calories, what matters to you?",
          contentType: ContentType.CIRCULAR_ICON_OPTIONS,
          options: accomplishmentOptions,
          selectedOption: selectedAccomplishment,
          onSelectOption: handleSelectAccomplishment,
        };
      case 8:
        return {
          title: "What's your activity level?",
          subtitle: "Outside of workouts, how active are you daily?",
          contentType: ContentType.CIRCULAR_ICON_SUBTEXT_OPTIONS,
          options: activityOptions,
          selectedOption: selectedActivity,
          onSelectOption: handleSelectActivity,
        };
      case 9:
        return {
          title: "How many meals do you prefer?",
          subtitle: "We'll optimize your meal plan accordingly",
          contentType: ContentType.CIRCULAR_ICON_OPTIONS,
          options: mealPreferenceOptions,
          selectedOption: selectedMealPreference,
          onSelectOption: handleSelectMealPreference,
        };
      case 10:
        return {
          title: "How often will you track?",
          subtitle: "Be realistic - consistency is more important than perfection",
          contentType: ContentType.CIRCULAR_ICON_SUBTEXT_OPTIONS,
          options: trackingFrequencyOptions,
          selectedOption: selectedTrackingFrequency,
          onSelectOption: handleSelectTrackingFrequency,
        };
      case 11:
        return {
          title: "You have great potential to crush your goals",
          subtitle: "Let's start your journey to a healthier lifestyle",
          contentType: ContentType.IMAGE,
          imageSource: weightTransition,
          imageAlt: "Cal AI Logo",
        };
      case 12:
        return {
          title: "Your plan is ready!",
          subtitle: "We've created a custom plan based on your unique profile",
          contentType: ContentType.IMAGE,
          imageSource: appLogo,
          imageAlt: "Cal AI Plan Ready",
        };
      default:
        return {
          title: "",
          subtitle: "",
          contentType: ContentType.TEXT,
          textContent: "",
        };
    }
  };

  const stepContent = renderStepContent();
  const nextButtonTitle = currentStep === TOTAL_STEPS ? "Complete" : "Next";

  return (
    <FormScreen
      key={`step-${currentStep}`}
      title={stepContent.title}
      subtitle={stepContent.subtitle}
      contentType={stepContent.contentType}
      options={stepContent.options}
      selectedOption={stepContent.selectedOption}
      onSelectOption={stepContent.onSelectOption}
      imageSource={stepContent.imageSource}
      imageAlt={stepContent.imageAlt}
      textContent={stepContent.textContent}
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      onNext={handleNext}
      onBack={handleBack}
      nextDisabled={isNextDisabled()}
      nextButtonTitle={nextButtonTitle}
    />
  );
};

export default ProfileSetupContainer; 