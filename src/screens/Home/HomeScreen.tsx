// In HomeScreen.tsx
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { faAppleAlt, faXmark } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import fonts from '../../constants/fontConstants';
import { colorsConstants } from '../../constants/colorsConstants';

// Type definitions
interface WeekData {
  weekDays: string[];
  dayNumbers: number[];
  today: number | null;
}

const HomeScreen = () => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [showStreakModal, setShowStreakModal] = useState(true);
  const weekListRef = useRef<FlatList<WeekData>>(null);
  const weekWidth = Dimensions.get('window').width;
  const today = new Date();
  const currentDayIndex = today.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Generate past weeks and current week data
  const generateCalendarData = (): WeekData[] => {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Generate 10 weeks of data (current week and 9 past weeks)
    const weeks: WeekData[] = [];
    
    for (let weekOffset = 0; weekOffset < 10; weekOffset++) {
      const weekDays: string[] = [];
      const dayNumbers: number[] = [];
      
      // Calculate the start date of this week (Sunday)
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - currentDayOfWeek - (7 * weekOffset));
      
      // Generate 7 days for this week
      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        
        weekDays.push(['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]);
        dayNumbers.push(day.getDate());
      }
      
      weeks.push({
        weekDays,
        dayNumbers,
        today: weekOffset === 0 ? currentDayOfWeek : null // Only set today for current week
      });
    }
    
    // Reverse the array to have the oldest week first
    return weeks.reverse();
  };
  
  const calendarData = generateCalendarData();
  
  useEffect(() => {
    // Scroll to the most recent week initially
    if (weekListRef.current) {
      setTimeout(() => {
        if (weekListRef.current) {
          weekListRef.current.scrollToIndex({
            index: calendarData.length - 1,
            animated: false
          });
        }
      }, 100);
    }
  }, []);

  // Render a single week
  const renderWeek = ({ item, index }: { item: WeekData; index: number }) => {
    return (
      <View style={[styles.calendarWeek, { width: weekWidth }]}>
        {item.weekDays.map((day: string, dayIndex: number) => {
          // Determine if this date is in the future
          const isFutureDate = index === calendarData.length - 1 && dayIndex > (item.today || 0);
          
          return (
            <View key={dayIndex} style={styles.dayCol}>
              <View 
                style={[
                  styles.dayCircle, 
                  item.today === dayIndex && index === calendarData.length - 1 ? styles.dayCircleActive : styles.dayCircleInactive,
                  isFutureDate && styles.dayCircleDisabled
                ]}
              >
                <Text 
                  style={[
                    styles.dayText,
                    item.today === dayIndex && index === calendarData.length - 1 && styles.activeDayText,
                    isFutureDate && styles.disabledDayText
                  ]}
                >
                  {day}
                </Text>
              </View>
              <Text 
                style={[
                  styles.dateText, 
                  item.today === dayIndex && index === calendarData.length - 1 && styles.dateTextActive,
                  isFutureDate && styles.disabledDateText
                ]}
              >
                {item.dayNumbers[dayIndex]}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  // Renders the streak modal popup
  const renderStreakModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showStreakModal}
        onRequestClose={() => setShowStreakModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <FontAwesomeIcon icon={faAppleAlt} size={16} color="black" />
                <Text style={styles.modalTitle}>Cal AI</Text>
              </View>
              <View style={styles.streakBadge}>
                <Text style={styles.streakBadgeText}>🔥 0</Text>
              </View>
            </View>
            
            <View style={styles.modalStreakContainer}>
              <View style={styles.fireIconContainer}>
                <View style={styles.fireIconCircle}>
                  <Text style={styles.fireIcon}>🔥</Text>
                </View>
                <View style={styles.fireIconSparks}>
                  <Text style={styles.sparkIcon}>✨</Text>
                  <Text style={styles.sparkIcon}>✨</Text>
                </View>
              </View>
              
              <Text style={styles.streakTitle}>0</Text>
              <Text style={styles.streakSubtitle}>Day streak</Text>
              
              <View style={styles.weekdayRow}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <View key={index} style={styles.weekdayContainer}>
                    <Text style={[
                      styles.weekdayText,
                      index === currentDayIndex && styles.weekdayTextActive
                    ]}>
                      {day}
                    </Text>
                    <View style={[
                      styles.weekdayCircle
                    ]} />
                  </View>
                ))}
              </View>
              
              <Text style={styles.streakMessage}>
                You're on fire! Every day matters for hitting your goal!
              </Text>
              
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => setShowStreakModal(false)}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStreakModal()}
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
        {/* Calendar Week - Horizontal Scrollable */}
        <FlatList
          ref={weekListRef}
          data={calendarData}
          renderItem={renderWeek}
          keyExtractor={(_, index) => `week-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={calendarData.length - 1}
          getItemLayout={(_, index) => ({
            length: weekWidth,
            offset: weekWidth * index,
            index,
          })}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / weekWidth);
            setCurrentWeekIndex(newIndex);
          }}
        />

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
  dayCircleDisabled: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    opacity: 0.5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#888',
    fontFamily: fonts.DMSansMedium,
  },
  activeDayText: {
    color: '#fff',
  },
  disabledDayText: {
    color: '#ccc',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fonts.DMSansMedium,
  },
  dateTextActive: {
    fontWeight: 'bold',
  },
  disabledDateText: {
    color: '#ccc',
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
  
  // Day Streak Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.DMSansBold,
    marginTop: 2,
    color: colorsConstants.onBoardingTitle,
  },
  streakBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  streakBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalStreakContainer: {
    alignItems: 'center',
    padding: 25,
  },
  fireIconContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  fireIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF5E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fireIcon: {
    fontSize: 40,
  },
  fireIconSparks: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sparkIcon: {
    fontSize: 22,
    marginHorizontal: -5,
  },
  streakTitle: {
    fontSize: 40,
    fontFamily: fonts.DMSansBold,
    color: colorsConstants.onBoardingTitle,
    marginBottom: 5,
  },
  streakSubtitle: {
    fontSize: 18,
    fontFamily: fonts.DMSansMedium,
    color: colorsConstants.onBoardingSubtitle,
    marginBottom: 25,
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  weekdayContainer: {
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: 14,
    fontFamily: fonts.DMSansMedium,
    color: '#aaa',
    marginBottom: 8,
  },
  weekdayTextActive: {
    color: '#F6923D',
  },
  weekdayCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  weekdayCircleActive: {
    backgroundColor: '#F6923D',
  },
  streakMessage: {
    fontSize: 10,
    fontFamily: fonts.DMSansRegular,
    color: colorsConstants.onBoardingSubtitle,
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  continueButton: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.DMSansBold,
  },
  tipsText: {
    fontSize: 14,
    fontFamily: fonts.DMSansRegular,
    color: colorsConstants.onBoardingSubtitle,
    textAlign: 'center',
  },
});

export default HomeScreen;