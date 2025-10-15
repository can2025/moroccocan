import { Platform } from 'react-native';
import { isGoogleMobileAdsAvailable } from './adMobCompatibility';

let isInitialized = false;

/**
 * Initialize Google Mobile Ads
 * This should be called when the app starts
 */
export const initializeAdMob = async (): Promise<boolean> => {
  if (!isGoogleMobileAdsAvailable()) {
    console.log('⚠️  AdMob not available - skipping initialization');
    return false;
  }

  if (isInitialized) {
    console.log('✅ AdMob already initialized');
    return true;
  }

  try {
    const GoogleMobileAds = require('react-native-google-mobile-ads');
    
    // Initialize AdMob
    await GoogleMobileAds.default().initialize();
    
    // Set request configuration
    await GoogleMobileAds.default().setRequestConfiguration({
      // Max Ad Content Rating
      maxAdContentRating: GoogleMobileAds.MaxAdContentRating.PG,
      
      // Indicates if you want child-directed treatment
      tagForChildDirectedTreatment: false,
      
      // Indicates if you want treatment for users in the European Economic Area (EEA)
      tagForUnderAgeOfConsent: false,
      
      // An array of test device IDs to allow test ads
      testDeviceIdentifiers: __DEV__ ? ['EMULATOR'] : [],
    });

    isInitialized = true;
    console.log('✅ Google Mobile Ads initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize Google Mobile Ads:', error);
    return false;
  }
};

/**
 * Check if AdMob is initialized
 */
export const isAdMobInitialized = (): boolean => {
  return isInitialized;
};

/**
 * Force re-initialization (useful for debugging)
 */
export const reinitializeAdMob = async (): Promise<boolean> => {
  isInitialized = false;
  return await initializeAdMob();
};