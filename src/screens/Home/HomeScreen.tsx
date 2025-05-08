// In HomeScreen.tsx
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { faAppleAlt, faXmark } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import fonts from '../../constants/fontConstants';
import { colorsConstants } from '../../constants/colorsConstants';


const HomeScreen = () => {
  // Week days
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dayNumbers = [20, 21, 22, 23, 24, 25, 26];
  const today = 4; // Index for today (Thursday)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
        <FontAwesomeIcon icon={faAppleAlt} size={24} color="black" />
          <Text style={styles.logoText}>Cal AI</Text>
        </View>
        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>🔥 0</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Calendar Week */}
        <View style={styles.calendarWeek}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.dayCol}>
              <View 
                style={[
                  styles.dayCircle, 
                  index === today ? styles.dayCircleActive : styles.dayCircleInactive
                ]}
              >
                <Text style={styles.dayText}>{day}</Text>
              </View>
              <Text style={[styles.dateText, index === today && styles.dateTextActive]}>
                {dayNumbers[index]}
              </Text>
            </View>
          ))}
        </View>

        {/* Calories Card */}
        <View style={styles.caloriesCard}>
          <View style={styles.caloriesInfo}>
            <Text style={styles.caloriesNumber}>1882</Text>
            <Text style={styles.caloriesLabel}>Calories left</Text>
          </View>
          <View style={styles.circleContainer}>
            <View style={styles.caloriesCircle}>
              <Ionicons name="flame" size={28} color="black" />
            </View>
          </View>
        </View>

        {/* Macros Section */}
        <View style={styles.macrosContainer}>
          <View style={styles.macroCard}>
            <Text style={styles.macroValue}>87g</Text>
            <Text style={styles.macroLabel}>Protein left</Text>
            <View style={styles.macroIconCircle}>
              <Ionicons name="flash" size={24} color="#ff6b6b" />
            </View>
          </View>

          <View style={styles.macroCard}>
            <Text style={styles.macroValue}>265g</Text>
            <Text style={styles.macroLabel}>Carbs left</Text>
            <View style={styles.macroIconCircle}>
              <Ionicons name="leaf" size={24} color="#e29c68" />
            </View>
          </View>

          <View style={styles.macroCard}>
            <Text style={styles.macroValue}>52g</Text>
            <Text style={styles.macroLabel}>Fats left</Text>
            <View style={styles.macroIconCircle}>
              <Ionicons name="water" size={24} color="#6495ed" />
            </View>
          </View>
        </View>

        {/* Pagination Dots */}
        <View style={styles.paginationDots}>
          <View style={styles.dotActive} />
          <View style={styles.dotInactive} />
        </View>

        {/* Recently Eaten Section */}
        <View style={styles.recentlyEatenSection}>
          <Text style={styles.sectionTitle}>Recently eaten</Text>
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>You haven't uploaded any food</Text>
            <Text style={styles.emptyStateSubText}>
              Start tracking Today's meals by taking a quick pictures
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontFamily: fonts.DMSansBold,
    color : colorsConstants.onBoardingTitle,
    marginLeft: 8,
    marginTop: 2,
    
    
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  calendarWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  dayCol: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  dayCircleActive: {
    backgroundColor: '#000',
  },
  dayCircleInactive: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#888',
    fontFamily: fonts.DMSansMedium,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fonts.DMSansMedium,
  },
  dateTextActive: {
    fontWeight: 'bold',
  },
  caloriesCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caloriesInfo: {
    flex: 1,
  },
  caloriesNumber: {
    fontSize: 48,
    fontFamily: fonts.DMSansBold,
    color: colorsConstants.onBoardingTitle,
  },
  caloriesLabel: {
    fontSize: 16,
    color: colorsConstants.onBoardingSubtitle,
    fontFamily: fonts.DMSansRegular,
  },
  circleContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caloriesCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  macroCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    height: 150,
  },
  macroValue: {
    fontSize: 20,
    fontFamily: fonts.DMSansBold,
    color: colorsConstants.onBoardingTitle,
  },
  macroLabel: {
    fontSize: 12,
    color: colorsConstants.onBoardingSubtitle,
    fontFamily: fonts.DMSansRegular,
  },
  macroIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 5,
  },
  dotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  recentlyEatenSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100, // Extra padding at bottom to account for tab bar
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: fonts.DMSansBold,
    color: colorsConstants.onBoardingTitle,
    marginBottom: 20,
  },
  emptyStateContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: colorsConstants.onBoardingTitle,
    fontFamily: fonts.DMSansBold,
    marginBottom: 10,
  },
  emptyStateSubText: {
    fontSize: 16,
    fontFamily: fonts.DMSansRegular,
    color: colorsConstants.onBoardingSubtitle,
    textAlign: 'left',
  },
});

export default HomeScreen;