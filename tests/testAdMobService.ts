import { adMobService } from '../services/adMobService';
import { isGoogleMobileAdsAvailable, isExpoGo } from '../utils/adMobCompatibility';

/**
 * Test script to verify Firebase AdMob integration
 * Run this in a React Native environment to test the service
 */
export async function testAdMobService() {
  console.log('Testing AdMob Service with Firebase...');
  
  // Check environment
  if (isExpoGo()) {
    console.log('🔍 Running in Expo Go - AdMob native modules not available');
  } else if (isGoogleMobileAdsAvailable()) {
    console.log('✅ Running in production environment - AdMob available');
  } else {
    console.log('⚠️  AdMob status unknown');
  }
  
  try {
    // Test fetching banner unit IDs for different screens
    const screens = ['cities', 'groups', 'home', 'matches', 'news'] as const;
    
    for (const screen of screens) {
      console.log(`\nTesting ${screen} screen...`);
      
      try {
        const bannerUnitId = await adMobService.getBannerUnitId(screen);
        console.log(`✓ Banner Unit ID for ${screen}: ${bannerUnitId}`);
      } catch (error) {
        console.error(`✗ Failed to get banner unit ID for ${screen}:`, error);
      }
    }
    
    // Test getting current mode
    try {
      const currentMode = await adMobService.getCurrentMode();
      console.log(`\n✓ Current mode: ${currentMode}`);
    } catch (error) {
      console.error('\n✗ Failed to get current mode:', error);
    }
    
    // Test interstitial unit IDs
    const interstitialScreens = ['home', 'matchDetails'] as const;
    
    for (const screen of interstitialScreens) {
      console.log(`\nTesting ${screen} interstitial...`);
      
      try {
        const interstitialUnitId = await adMobService.getInterstitialUnitId(screen);
        console.log(`✓ Interstitial Unit ID for ${screen}: ${interstitialUnitId}`);
      } catch (error) {
        console.error(`✗ Failed to get interstitial unit ID for ${screen}:`, error);
      }
    }
    
    console.log('\n🎉 AdMob Service testing completed!');
    
    if (isExpoGo()) {
      console.log('\n📱 Note: Running in Expo Go - ads will show as placeholders');
      console.log('   Build with EAS Build or create a development build to see real ads');
    }
    
  } catch (error) {
    console.error('❌ AdMob Service test failed:', error);
  }
}

// Instructions for manual testing
console.log(`
To test the AdMob service manually:

1. Make sure you're running this in a React Native environment
2. Import and call testAdMobService() from this file
3. Check the console output for results

Example usage:
import { testAdMobService } from './tests/testAdMobService';
testAdMobService();

Environment Detection:
- Expo Go: AdMob will show placeholders
- Production Build: AdMob will show real ads
- Web: AdMob components are disabled
`);