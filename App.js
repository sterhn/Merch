import React, { useEffect } from 'react';
import { Platform, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono';
import { ThemeProvider } from './src/theme/ThemeContext';
import TabNavigator from './src/navigation/TabNavigator';

if (Platform.OS !== 'web') {
  SplashScreen.preventAutoHideAsync();
}

class ErrorBoundary extends React.Component {
  state = { error: null };
  componentDidCatch(error, info) {
    this.setState({ error: error.toString() + '\n\n' + (info?.componentStack || '') });
  }
  render() {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#18141F' }}>
          <Text style={{ color: '#FF8AEC', fontSize: 13, fontFamily: 'monospace', textAlign: 'left' }}>
            {'ERROR:\n' + this.state.error}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Comfortaa_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    JetBrainsMono_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded && Platform.OS !== 'web') {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && Platform.OS !== 'web') return null;

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider>
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
