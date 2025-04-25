import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import { imageConstants } from '../../constants/imageConstants';
import fonts from '../../constants/fontConstants';
import { colorsConstants } from '../../constants/colorsConstants';


// Define types for route params
interface RouteParams {
  title: string;
  value: string;
  progressColor: string;
  progress: number;
  unit?: string;
  icon?: any;
}

const MacroEditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;
  
  // Extract parameters
  const { title, value: initialValue, progressColor, progress, unit = '', icon } = params;
  
  // Remove any non-numeric characters for the input
  const numericValue = initialValue.replace(/[^0-9.]/g, '');
  
  const [value, setValue] = useState(numericValue);
  const [originalValue] = useState(numericValue); // For revert functionality
  
  // SVG parameters for the progress circle
  const size = 110;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference * (1 - progress);
  const center = size / 2;

  // Handle text input change
  const handleValueChange = (text: string) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9.]/g, '');
    setValue(numericText);
  };

  // Handle done button press
  const handleDone = () => {
    // Here you would typically save the value and return to previous screen
    navigation.goBack();
  };

  // Handle revert button press
  const handleRevert = () => {
    setValue(originalValue);
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Image 
          source={imageConstants.BackArrow} 
          style={styles.backIcon} 
        />
      </TouchableOpacity>
      
      {/* Title - FIXED: Now below back button */}
      <Text style={styles.headerTitle}>Edit {title} Goal</Text>

      {/* Card with circle progress */}
      <View style={styles.progressCard}>
        <View style={styles.circleContainer}>
          <Svg width={size} height={size}>
            {/* Background Circle */}
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#E5E5E5"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Progress Circle */}
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={progressColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              transform={`rotate(-90 ${center} ${center})`} // Start from top
            />
          </Svg>

          {/* FIXED: Icon box in center of circle */}
          <View style={styles.centerIconContainer}>
            {icon && (
              <Image source={icon} style={styles.macroIcon} />
            )}
          </View>
        </View>
        
        {/* FIXED: Value shown outside circle to the right */}
        <Text style={styles.valueDisplay}>{value}</Text>
      </View>

      {/* Input field */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{title}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleValueChange}
          keyboardType="numeric"
          placeholder={`Enter ${title.toLowerCase()}`}
          placeholderTextColor="#999"
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.revertButton} 
          onPress={handleRevert}
        >
          <Text style={styles.revertButtonText}>Revert</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.doneButton} 
          onPress={handleDone}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#F2F2F2',
    marginTop: 40,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 32,
    
    fontFamily: fonts.DMSansBold,
    color: '#222222',
    marginTop: 20,
    marginBottom: 30,
  },
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 26,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  circleContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerIconContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  macroIcon: {
    width: 24,
    height: 24,
  },
  valueDisplay: {
    fontSize: 26,
    color: colorsConstants.onBoardingTitle,
    fontFamily: fonts.DMSansMedium,
    marginLeft: 20,
  },
  inputContainer: {
    marginVertical: 6,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: fonts.DMSansMedium,
    color: '#777777',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    fontSize: 20,
    fontFamily: fonts.DMSansRegular,
    color: '#222222',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 30,
  },
  revertButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 30,
  },
  revertButtonText: {
    fontSize: 18,
    fontFamily: fonts.DMSansMedium,
    color: '#222222',
  },
  doneButton: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222222',
    borderRadius: 30,
  },
  doneButtonText: {
    fontSize: 18,
    fontFamily: fonts.DMSansMedium,
    color: '#FFFFFF',
  },
});

export default MacroEditScreen;