import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
  const [burnedCaloriesEnabled, setBurnedCaloriesEnabled] = React.useState(false);

  const toggleBurnedCalories = () => {
    setBurnedCaloriesEnabled(previousState => !previousState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>13</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>5 ft 5 in</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Current Weight</Text>
            <Text style={styles.infoValue}>119 lbs</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customization</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Personal details</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View>
              <Text style={styles.menuItemText}>Adjust goals</Text>
              <Text style={styles.menuItemSubtext}>Calories, carbs, fats, and protein</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.menuItem}>
            <View>
              <Text style={styles.menuItemText}>Burned Calories</Text>
              <Text style={styles.menuItemSubtext}>Add burned calories to daily goal</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#ccc' }}
              thumbColor={burnedCaloriesEnabled ? '#000' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleBurnedCalories}
              value={burnedCaloriesEnabled}
            />
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Terms and Conditions</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
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
    fontWeight: 'bold',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  infoLabel: {
    fontSize: 18,
    color: '#000',
  },
  infoValue: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 18,
    color: '#000',
  },
  menuItemSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e1e1e1',
    marginVertical: 10,
  },
});

export default SettingsScreen; 