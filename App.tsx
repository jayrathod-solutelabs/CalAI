import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';




export default function App() {
  return (
      <StackNavigation />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
