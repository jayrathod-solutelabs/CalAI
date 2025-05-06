import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faChartBar, faGear, faHouse } from '@fortawesome/free-solid-svg-icons';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';


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
      let icon;

      if (route.name === 'Home') {
        icon = faHome;
      } else if (route.name === 'Analytics') {
        icon = faChartBar;
      } else if (route.name === 'Settings') {
        icon = faGear;
      } else {
        icon = faGear;
      }

      return <FontAwesomeIcon icon={icon} size={size} color={color} />;
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