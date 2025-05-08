import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fonts from '../../constants/fontConstants';
import {colorsConstants} from '../../constants/colorsConstants';
import { faPadlet } from '@fortawesome/free-brands-svg-icons';

const AnalyticsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Overview</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Weight Goal</Text>
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.weightGoalCard}>
        <Text style={styles.weightGoalText}>109 lbs</Text>
        <Text style={styles.labelText}>Current Weight</Text>
        </View>
        

        <View style={styles.overviewCard}>
          <View style={styles.section}>
            <View style={styles.currentWeightContainer}>
              <View style={styles.currentWeightCard}>
                <Text style={styles.currentWeightText}>119 lbs</Text>
                <Text style={styles.updateReminderText}>
                  Try to update once a week so we can adjust your plan to ensure
                  you hit your goal.
                </Text>
                <TouchableOpacity style={styles.logButton}>
                  <Text style={styles.logButtonText}>Log weight</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bmiSection}>
              <Text style={styles.labelTextNew}>Your BMI</Text>
              <View style={styles.bmiCard}>
                <View style={styles.bmiHeaderRow}>
                  <View style={styles.weightStatusContainer}>
                    <Text style={styles.bmiHeaderText}>Your weight is</Text>
                    <View style={styles.healthyButton}>
                      <Text style={styles.healthyText}>Healthy</Text>
                    </View>
                  </View>
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color="#000"
                  />
                </View>
                <Text style={styles.bmiValue}>19.8</Text>

                <View style={styles.bmiGauge}>
                  <View style={styles.bmiIndicator} />
                </View>

                <View style={styles.bmiLabels}>
                  <View style={styles.bmiLabelContainer}>
                    <View
                      style={[styles.bmiColorDot, {backgroundColor: '#3498db'}]}
                    />
                    <Text style={styles.bmiLabelText}>Underweight</Text>
                  </View>
                  <View style={styles.bmiLabelContainer}>
                    <View
                      style={[styles.bmiColorDot, {backgroundColor: '#2ecc71'}]}
                    />
                    <Text style={styles.bmiLabelText}>Healthy</Text>
                  </View>
                  <View style={styles.bmiLabelContainer}>
                    <View
                      style={[styles.bmiColorDot, {backgroundColor: '#f1c40f'}]}
                    />
                    <Text style={styles.bmiLabelText}>Overweight</Text>
                  </View>
                  <View style={styles.bmiLabelContainer}>
                    <View
                      style={[styles.bmiColorDot, {backgroundColor: '#e74c3c'}]}
                    />
                    <Text style={styles.bmiLabelText}>Obese</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.labelText}>Goal Progress</Text>
                <Text style={styles.progressPercentText}>
                  0.0% <Text style={styles.progressSubText}>Goal achieved</Text>
                </Text>
              </View>

              <View style={styles.timeButtons}>
                <TouchableOpacity
                  style={[styles.timeButton, styles.timeButtonActive]}>
                  <Text
                    style={[
                      styles.timeButtonText,
                      styles.timeButtonTextActive,
                    ]}>
                    90 Days
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeButton}>
                  <Text style={styles.timeButtonText}>6 Months</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeButton}>
                  <Text style={styles.timeButtonText}>1 Year</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeButton}>
                  <Text style={styles.timeButtonText}>All time</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: fonts.DMSansBold,
    color: colorsConstants.onBoardingTitle,
  },
  scrollView: {
    flex: 1,
  },
  overviewCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  section: {
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  updateButton: {
    backgroundColor: '#000',
    paddingHorizontal: 15,
    marginStart: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },
  healthyButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 40,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  weightGoalText: {
    fontSize: 40,
    fontFamily : fonts.DMSansBold,
    color: colorsConstants.onBoardingTitle,
    marginVertical: 10,
    marginBottom: 20
  },
  weightGoalCard :{
    marginHorizontal:20,
  },
  currentWeightContainer: {
    borderRadius: 10,
    padding : 8
  },
  labelText: {
    fontSize: 20,
    fontFamily : fonts.DMSansRegular,
    color: colorsConstants.onBoardingTitle,
    marginBottom: 10,
  },
  labelTextNew: {
    fontSize: 20,
    fontFamily : fonts.DMSansRegular,
    color: colorsConstants.onBoardingTitle,
    marginBottom: 10,
    marginHorizontal: 4
  },
  currentWeightCard: {
    backgroundColor: '#fff',  
  },
  currentWeightText: {
    fontSize: 36,
    fontFamily : fonts.DMSansBold,
    color: colorsConstants.onBoardingTitle,
    marginBottom: 10,
  },
  updateReminderText: {
    fontSize: 16,
    fontFamily : fonts.DMSansRegular,
    color: colorsConstants.onBoardingTitle,
    lineHeight: 22,
    marginBottom: 20,
  },
  logButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  logButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily : fonts.DMSansBold
  },
  bmiSection: {
    marginTop: 30,
  },
  bmiCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 15,
  },
  bmiHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weightStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 6,
  },
  bmiHeaderText: {
    fontSize: 16,
    fontFamily: fonts.DMSansMedium,
    color: '#000',
  },
  healthyText: {
    color: '#FFFFFF',
    fontFamily: fonts.DMSansMedium,
    fontSize: 14,
  },
  bmiValue: {
    fontSize: 32,
    fontFamily: fonts.DMSansBold,
    color: colorsConstants.onBoardingTitle,
    marginVertical: 10,
  },
  bmiGauge: {
    height: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  bmiIndicator: {
    position: 'absolute',
    width: 3,
    height: 20,
    backgroundColor: '#000',
    left: '40%',
    top: -5,
  },
  bmiLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bmiLabelContainer: {
    alignItems: 'center',
  },
  bmiColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  bmiLabelText: {
    fontSize: 12,
    fontFamily: fonts.DMSansMedium,
    color: colorsConstants.onBoardingSubtitle,
  },
  progressSection: {
    marginTop: 30,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressPercentText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressSubText: {
    color: '#888',
    fontWeight: 'normal',
  },
  timeButtons: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 5,
  },
  timeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  timeButtonActive: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeButtonText: {
    fontSize: 14,
    color: '#888',
  },
  timeButtonTextActive: {
    color: '#000',
    fontWeight: '500',
  },
});

export default AnalyticsScreen;
