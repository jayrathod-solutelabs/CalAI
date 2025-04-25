import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import fonts from '../constants/fontConstants';
import { imageConstants } from '../constants/imageConstants';

const editPencil = imageConstants.editPencil;

interface MacroCardProps {
  title: string;
  value: string | number;
  progressColor?: string;
  progress?: number;
  onEditPress?: () => void;
  icon?: any;
  unit?: string;
}

const MacroCard: FC<MacroCardProps> = ({ 
  title, 
  value, 
  progressColor = '#000000', 
  progress = 0, 
  onEditPress,
  icon,
  unit = ''
}) => {
  const navigation = useNavigation() as any;
  
  // SVG parameters
  const size = 110;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference * (1 - progress);
  const center = size / 2;

  // Handle edit press with navigation
  const handleEditPress = () => {
    if (onEditPress) {
      onEditPress();
    } else {
      // Navigate to MacroEditScreen with appropriate params
      navigation.navigate('MacroEdit', {
        title,
        value,
        progressColor,
        progress,
        icon,
        unit
      });
    }
  };

  return (
    <View style={styles.macroCard}>
      <Text style={styles.macroTitle}>{title}</Text>
      <View style={styles.progressCircleContainer}>
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
            transform={`rotate(-90 ${center} ${center})`} // Start from top (12 o'clock)
          />
        </Svg>

        {/* Center text */}
        <View style={styles.valueContainer}>
          <Text style={styles.macroValue}>{value}</Text>
        </View>

        {/* Edit button - positioned outside the circle */}
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={handleEditPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image source={editPencil} style={styles.editIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  macroCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  macroTitle: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: fonts.DMSansMedium,
    marginBottom: 12,
    color: '#333333',
  },
  progressCircleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
  },
  valueContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 11,
    marginRight: 4,
  },
  macroIcon: {
    width: 12,
    height: 12,
    tintColor: '#333333',
  },
  macroValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  editButton: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    zIndex: 10,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
});

export default MacroCard;