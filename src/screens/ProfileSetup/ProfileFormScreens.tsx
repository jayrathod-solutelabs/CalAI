import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FormScreen, { ContentType, OptionItem } from '../../components/FormScreen';
import { useProfile } from '../../contexts/ProfileContext';

// Import app logo
// Note: This is a placeholder, you'll need to add the actual logo file
const appLogo = require('../../assets/images/splash_screen_logo.png');

// Screen 1: Gender Select
export const GenderSelectScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { profileData, updateProfile } = useProfile();
  const [selectedGender, setSelectedGender] = useState<string | undefined>(profileData.gender);

  // Immediately update profile when option is selected
  const handleSelectGender = (value: string) => {
    setSelectedGender(value);
    updateProfile({ gender: value });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (selectedGender) {
      navigation.navigate('WorkoutFrequency');
    }
  };

  const genderOptions: OptionItem[] = [
    { id: '1', label: 'Male', value: 'male' },
    { id: '2', label: 'Female', value: 'female' },
    { id: '3', label: 'Other', value: 'other' },
  ];

  return (
    <FormScreen
      title="Choose your gender"
      subtitle="This will be used to calibrate your custom plan"
      contentType={ContentType.OPTIONS}
      options={genderOptions}
      selectedOption={selectedGender}
      onSelectOption={handleSelectGender}
      currentStep={1}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextDisabled={!selectedGender}
    />
  );
};

// Screen 2: Workout Frequency
export const WorkoutFrequencyScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { profileData, updateProfile } = useProfile();
  const [selectedFrequency, setSelectedFrequency] = useState<string | undefined>(
    profileData.workoutFrequency
  );

  // Immediately update profile when option is selected
  const handleSelectFrequency = (value: string) => {
    setSelectedFrequency(value);
    updateProfile({ workoutFrequency: value });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (selectedFrequency) {
      navigation.navigate('PreviousApps');
    }
  };

  const frequencyOptions: OptionItem[] = [
    { id: '1', label: '0-2', value: '0-2' },
    { id: '2', label: '3-5', value: '3-5' },
    { id: '3', label: '6+', value: '6+' },
  ];

  return (
    <FormScreen
      title="How many workouts do you do per week?"
      subtitle="This will be used to calibrate your custom plan"
      contentType={ContentType.OPTIONS}
      options={frequencyOptions}
      selectedOption={selectedFrequency}
      onSelectOption={handleSelectFrequency}
      currentStep={2}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextDisabled={!selectedFrequency}
    />
  );
};

// Screen 3: Previous Calorie Tracking Apps
export const PreviousAppsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { profileData, updateProfile } = useProfile();
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    profileData.usedPreviousApps
  );

  // Immediately update profile when option is selected
  const handleSelectOption = (value: string) => {
    setSelectedOption(value);
    updateProfile({ usedPreviousApps: value });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (selectedOption) {
      navigation.navigate('LongTermResults');
    }
  };

  const options: OptionItem[] = [
    { id: '1', label: 'Yes', value: 'yes' },
    { id: '2', label: 'No', value: 'no' },
  ];

  return (
    <FormScreen
      title="Have you tried other calorie tracking apps?"
      subtitle=""
      contentType={ContentType.OPTIONS}
      options={options}
      selectedOption={selectedOption}
      onSelectOption={handleSelectOption}
      currentStep={3}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextDisabled={!selectedOption}
    />
  );
};

// Screen 4: Long Term Results (Image)
export const LongTermResultsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate('GoalSelect');
  };

  return (
    <FormScreen
      title="Cal AI creates long-term results"
      subtitle=""
      contentType={ContentType.IMAGE}
      imageSource={appLogo}
      imageAlt="Cal AI Logo"
      currentStep={4}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
};

// Screen 5: Goal Selection
export const GoalSelectScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { profileData, updateProfile } = useProfile();
  const [selectedGoal, setSelectedGoal] = useState<string | undefined>(profileData.goal);

  // Immediately update profile when option is selected
  const handleSelectGoal = (value: string) => {
    setSelectedGoal(value);
    updateProfile({ goal: value });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (selectedGoal) {
      navigation.navigate('DietSelection');
    }
  };

  const goalOptions: OptionItem[] = [
    { id: '1', label: 'Lose weight', value: 'lose' },
    { id: '2', label: 'Gain weight', value: 'gain' },
    { id: '3', label: 'Maintain weight', value: 'maintain' },
  ];

  return (
    <FormScreen
      title="What is your goal?"
      subtitle="This helps us generate a plan for your calorie intake"
      contentType={ContentType.OPTIONS}
      options={goalOptions}
      selectedOption={selectedGoal}
      onSelectOption={handleSelectGoal}
      currentStep={5}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextDisabled={!selectedGoal}
    />
  );
};

// Screen 6: Diet Selection
export const DietSelectionScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { profileData, updateProfile } = useProfile();
  const [selectedDiet, setSelectedDiet] = useState<string | undefined>(profileData.diet);

  // Immediately update profile when option is selected
  const handleSelectDiet = (value: string) => {
    setSelectedDiet(value);
    updateProfile({ diet: value });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (selectedDiet) {
      navigation.navigate('GoalAccomplishment');
    }
  };

  const dietOptions: OptionItem[] = [
    { id: '1', label: 'Classic', value: 'classic' },
    { id: '2', label: 'Pescatarian', value: 'pescatarian' },
    { id: '3', label: 'Vegetarian', value: 'vegetarian' },
    { id: '4', label: 'Vegan', value: 'vegan' },
  ];

  return (
    <FormScreen
      title="Do you follow a specific diet?"
      subtitle=""
      contentType={ContentType.OPTIONS}
      options={dietOptions}
      selectedOption={selectedDiet}
      onSelectOption={handleSelectDiet}
      currentStep={6}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextDisabled={!selectedDiet}
    />
  );
};

// Screen 7: Goal Accomplishment
export const GoalAccomplishmentScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { profileData, updateProfile } = useProfile();
  const [selectedGoal, setSelectedGoal] = useState<string | undefined>(profileData.accomplishment);

  // Immediately update profile when option is selected
  const handleSelectAccomplishment = (value: string) => {
    setSelectedGoal(value);
    updateProfile({ accomplishment: value });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (selectedGoal) {
      navigation.navigate('PotentialScreen');
    }
  };

  const goalOptions: OptionItem[] = [
    { id: '1', label: 'Eat and live healthier', value: 'healthier' },
    { id: '2', label: 'Boost my energy and mood', value: 'energy' },
    { id: '3', label: 'Stay motivated and consistent', value: 'motivated' },
    { id: '4', label: 'Feel better about my body', value: 'body' },
  ];

  return (
    <FormScreen
      title="What would you like to accomplish?"
      subtitle=""
      contentType={ContentType.OPTIONS}
      options={goalOptions}
      selectedOption={selectedGoal}
      onSelectOption={handleSelectAccomplishment}
      currentStep={7}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextDisabled={!selectedGoal}
    />
  );
};

// Screen 8: Potential Screen
export const PotentialScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate('RatingScreen');
  };

  return (
    <FormScreen
      title="You have a great potential to crush your goals"
      subtitle=""
      contentType={ContentType.IMAGE}
      imageSource={appLogo}
      imageAlt="Cal AI Logo"
      currentStep={8}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
};

// Screen 9: Rating Screen
export const RatingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    // Navigate to the home or completion screen
    navigation.navigate('Home');
  };

  return (
    <FormScreen
      title="You have a great potential to crush your goals"
      subtitle=""
      contentType={ContentType.IMAGE}
      imageSource={appLogo}
      imageAlt="Cal AI Logo"
      currentStep={9}
      totalSteps={9}
      onNext={handleNext}
      onBack={handleBack}
      nextButtonTitle="Complete"
    />
  );
}; 