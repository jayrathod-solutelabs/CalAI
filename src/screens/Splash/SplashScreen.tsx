import {View, Text, SafeAreaView, StatusBar, Image, StyleSheet} from 'react-native';
import { imageConstants } from '../../constants/imageConstants';
import fonts from '../../constants/fontConstants';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.logoContainer}>
        <Image
          source={imageConstants.SplashScreenLogo}
          style={styles.logo}
        />
        <Text style={styles.title}>Cal AI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 58,
      height: 58,
      resizeMode: 'contain',
      marginRight: 8,
    },
    title: {
      fontSize: 36,
      color: '#000',
      marginTop: 8,
      fontFamily: fonts.DMSansBold,
    },
  });
