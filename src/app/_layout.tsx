// app/_layout.tsx

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ThemedProvider, useTheme } from '@/context/ThemeContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <InnerRootLayout />
  );
}

function InnerRootLayout() {
  const { theme } = useTheme();
  const scheme = theme === 'light' ? DefaultTheme : DarkTheme;

  return (
    <ThemeProvider value={scheme}>
      <Stack screenOptions={{ headerTintColor: scheme.colors.text }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default function Root() {
  return (
    <ThemedProvider>
      <RootLayout />
    </ThemedProvider>
  );
}
