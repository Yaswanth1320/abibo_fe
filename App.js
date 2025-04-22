import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import AppNavigator from './navigation/AppNavigator';
import { ActivityIndicator, View } from 'react-native';

const App = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return <AppNavigator />;
};

export default App;