import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { initializeAdMob } from '../utils/adMobInitializer';

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    // Initialize AdMob when app starts
    const setupAdMob = async () => {
      try {
        await initializeAdMob();
      } catch (error) {
        console.error('Failed to initialize AdMob:', error);
      }
    };
    
    setupAdMob();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
