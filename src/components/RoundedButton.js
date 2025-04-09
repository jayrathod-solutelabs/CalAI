// components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import fonts from '../constants/fontConstants';
import { colorsConstants } from '../constants/colorsConstants';

const RoundedButton = ({ 
  title, 
  onPress,
  disabled = false
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorsConstants.roundedButton, 
    borderRadius: 50,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: colorsConstants.roundedButtonText,
    fontSize: 18, // Slightly larger
    fontWeight: '600',
    letterSpacing: 0.5, // Slight letter spacing
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  disabledText: {
    color: '#eee',
  },
});

export default RoundedButton;