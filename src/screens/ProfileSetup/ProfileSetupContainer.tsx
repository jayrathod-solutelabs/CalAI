import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FormScreen, { ContentType, OptionItem } from '../../components/FormScreen';
import { useProfile } from '../../contexts/ProfileContext';

// Import app logo
// Note: This is a placeholder, you'll need to add the actual logo file
const appLogo = require('../../assets/images/splash_screen_logo.png');

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
  const TOTAL_STEPS = 9;

  // State for each step
  const [selectedGender, setSelectedGender] = useState<string | undefined>(profileData.gender);
  const [selectedFrequency, setSelectedFrequency] = useState<string | undefined>(profileData.workoutFrequency);
  const [selectedPreviousApps, setSelectedPreviousApps] = useState<string | undefined>(profileData.usedPreviousApps);
  const [selectedGoal, setSelectedGoal] = useState<string | undefined>(profileData.goal);
  const [selectedDiet, setSelectedDiet] = useState<string | undefined>(profileData.diet);
  const [selectedAccomplishment, setSelectedAccomplishment] = useState<string | undefined>(profileData.accomplishment);

  useEffect(() => {
    // If we have saved profile data, initialize the state
    if (profileData.gender) setSelectedGender(profileData.gender);
    if (profileData.workoutFrequency) setSelectedFrequency(profileData.workoutFrequency);
    if (profileData.usedPreviousApps) setSelectedPreviousApps(profileData.usedPreviousApps);
    if (profileData.goal) setSelectedGoal(profileData.goal);
    if (profileData.diet) setSelectedDiet(profileData.diet);
    if (profileData.accomplishment) setSelectedAccomplishment(profileData.accomplishment);
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

  // Define all options for different steps
  const genderOptions: OptionItem[] = [
    { id: '1', label: 'Male', value: 'male' },
    { id: '2', label: 'Female', value: 'female' },
    { id: '3', label: 'Other', value: 'other' },
  ];

  const frequencyOptions: OptionItem[] = [
    { id: '1', label: '0-2', value: '0-2' },
    { id: '2', label: '3-5', value: '3-5' },
    { id: '3', label: '6+', value: '6+' },
  ];

  const previousAppsOptions: OptionItem[] = [
    { id: '1', label: 'Yes', value: 'yes' },
    { id: '2', label: 'No', value: 'no' },
  ];

  const goalOptions: OptionItem[] = [
    { id: '1', label: 'Lose weight', value: 'lose' },
    { id: '2', label: 'Gain weight', value: 'gain' },
    { id: '3', label: 'Maintain weight', value: 'maintain' },
  ];

  const dietOptions: OptionItem[] = [
    { id: '1', label: 'Classic', value: 'classic' },
    { id: '2', label: 'Pescatarian', value: 'pescatarian' },
    { id: '3', label: 'Vegetarian', value: 'vegetarian' },
    { id: '4', label: 'Vegan', value: 'vegan' },
  ];

  const accomplishmentOptions: OptionItem[] = [
    { id: '1', label: 'Eat and live healthier', value: 'healthier' },
    { id: '2', label: 'Boost my energy and mood', value: 'energy' },
    { id: '3', label: 'Stay motivated and consistent', value: 'motivated' },
    { id: '4', label: 'Feel better about my body', value: 'body' },
  ];

  // Check if next button should be disabled
  const isNextDisabled = () => {
    switch (currentStep) {
      case 1: return !selectedGender;
      case 2: return !selectedFrequency;
      case 3: return !selectedPreviousApps;
      case 4: return false;
      case 5: return !selectedGoal;
      case 6: return !selectedDiet;
      case 7: return !selectedAccomplishment;
      case 8: return false;
      case 9: return false;
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
          contentType: ContentType.OPTIONS,
          options: frequencyOptions,
          selectedOption: selectedFrequency,
          onSelectOption: handleSelectFrequency,
        };
      case 3:
        return {
          title: "Have you tried other calorie tracking apps?",
          subtitle: "",
          contentType: ContentType.OPTIONS,
          options: previousAppsOptions,
          selectedOption: selectedPreviousApps,
          onSelectOption: handleSelectPreviousApps,
        };
      case 4:
        return {
          title: "Cal AI creates long-term results",
          subtitle: "",
          contentType: ContentType.IMAGE,
          imageSource: appLogo,
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
          subtitle: "",
          contentType: ContentType.OPTIONS,
          options: dietOptions,
          selectedOption: selectedDiet,
          onSelectOption: handleSelectDiet,
        };
      case 7:
        return {
          title: "What would you like to accomplish?",
          subtitle: "",
          contentType: ContentType.OPTIONS,
          options: accomplishmentOptions,
          selectedOption: selectedAccomplishment,
          onSelectOption: handleSelectAccomplishment,
        };
      case 8:
        return {
          title: "You have a great potential to crush your goals",
          subtitle: "",
          contentType: ContentType.IMAGE,
          imageSource: appLogo,
          imageAlt: "Cal AI Logo",
        };
      case 9:
        return {
          title: "You have a great potential to crush your goals",
          subtitle: "",
          contentType: ContentType.IMAGE,
          imageSource: appLogo,
          imageAlt: "Cal AI Logo",
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