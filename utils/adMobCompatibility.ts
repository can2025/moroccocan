import { Platform } from 'react-native';

/**
 * AdMob Compatibility Utility
 * 
 * This utility safely checks if Google Mobile Ads is available in the current environment.
 * This is necessary because Expo Go doesn't include native AdMob modules,
 * but production builds (EAS Build or bare React Native) do.
 */

let isAdMobAvailable = false;
let BannerAd: any = null;
let BannerAdSize: any = null;

try {
  // Try to import Google Mobile Ads
  const GoogleMobileAds = require('react-native-google-mobile-ads');
  BannerAd = GoogleMobileAds.BannerAd;
  BannerAdSize = GoogleMobileAds.BannerAdSize;
  isAdMobAvailable = true;
  console.log('✅ Google Mobile Ads available');
} catch (error) {
  console.log('⚠️  Google Mobile Ads not available (likely running in Expo Go)');
  isAdMobAvailable = false;
}

/**
 * Check if AdMob is available in the current environment
 */
export const isGoogleMobileAdsAvailable = (): boolean => {
  return isAdMobAvailable;
};

/**
 * Get BannerAd component if available
 */
export const getBannerAd = () => {
  return isAdMobAvailable ? BannerAd : null;
};

/**
 * Get BannerAdSize enum if available
 */
export const getBannerAdSize = () => {
  return isAdMobAvailable ? BannerAdSize : null;
};

/**
 * Check if we're running in Expo Go
 */
export const isExpoGo = (): boolean => {
  return !isAdMobAvailable && __DEV__;
};

/**
 * Safe AdMob initialization
 * Only initializes AdMob if the native module is available
 */
export const initializeAdMob = async (): Promise<boolean> => {
  if (!isAdMobAvailable) {
    console.log('🔄 Skipping AdMob initialization (not available)');
    return false;
  }

  try {
    const GoogleMobileAds = require('react-native-google-mobile-ads');
    await GoogleMobileAds.initialize();
    console.log('✅ AdMob initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize AdMob:', error);
    return false;
  }
};

export default {
  isGoogleMobileAdsAvailable,
  getBannerAd,
  getBannerAdSize,
  isExpoGo,
  initializeAdMob,
};