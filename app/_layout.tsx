import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { View } from 'react-native';
import { PersistentTabBar } from './shared/components/ui/persistent-tab-bar';
import { ThemeProvider, useTheme } from './shared/context/theme-context';
import { TabBarProvider } from './shared/contexts/tab-bar-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutContent() {
  const { theme } = useTheme();

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <TabBarProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="features" options={{ headerShown: false }} />
        </Stack>
        <PersistentTabBar />
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      </TabBarProvider>
    </NavigationThemeProvider>
  );
}

function ScreenSafeAreaInternal({children}: {children: React.ReactNode}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom}}>
      {children}
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ScreenSafeAreaInternal>
          <RootLayoutContent />
        </ScreenSafeAreaInternal>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
