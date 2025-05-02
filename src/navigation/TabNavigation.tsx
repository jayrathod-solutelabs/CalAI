import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import FloatingActionButton from '../components/FloatingActionButton';

// Screens
import HomeScreen from '../screens/Home/HomeScreen';
import AnalyticsScreen from '../screens/Analytics/AnalyticsScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

// Tab Navigator Parameter List
export type TabNavigatorParamList = {
  Home: undefined;
  Analytics: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigation = () => {
  const handleFabPress = () => {
    console.log('FAB pressed');
    // Add food logging functionality here
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Analytics') {
              iconName = focused ? 'analytics' : 'analytics-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else {
              iconName = 'help-circle-outline';
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      
      <FloatingActionButton onPress={handleFabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  tabBar: {
    height: 60,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  tabBarLabel: {
    fontSize: 12,
  },
});

export default TabNavigation; 