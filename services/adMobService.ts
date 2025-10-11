import { Platform } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../config/firebase';
import { isGoogleMobileAdsAvailable } from '../utils/adMobCompatibility';

export interface AdMobConfig {
  banners: {
    cities: string;
    groups: string;
    home: string;
    matches: string;
    news: string;
  };
  interstitial: {
    home: string;
    matchDetails: string;
  };
}

export interface AdMobSettings {
  config: {
    android_mode: 'test' | 'real';
    ios_mode: 'test' | 'real';
    description: string;
  };
  android: {
    real: AdMobConfig;
    test: AdMobConfig;
  };
  ios: {
    real: AdMobConfig;
    test: AdMobConfig;
  };
}

class AdMobService {
  private cachedConfig: AdMobSettings | null = null;
  private lastFetchTime: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

  /**
   * Fetches AdMob configuration from Firebase Realtime Database
   */
  private async fetchAdMobConfig(): Promise<AdMobSettings> {
    try {
      const admobRef = ref(database, 'admob');
      const snapshot = await get(admobRef);
      
      if (snapshot.exists()) {
        const config = snapshot.val() as AdMobSettings;
        this.cachedConfig = config;
        this.lastFetchTime = Date.now();
        return config;
      } else {
        throw new Error('AdMob configuration not found in Firebase');
      }
    } catch (error) {
      console.error('Error fetching AdMob config from Firebase:', error);
      throw error;
    }
  }

  /**
   * Gets AdMob configuration with caching
   */
  private async getAdMobConfig(): Promise<AdMobSettings> {
    const now = Date.now();
    
    // Return cached config if it's still valid
    if (this.cachedConfig && (now - this.lastFetchTime) < this.CACHE_DURATION) {
      return this.cachedConfig;
    }
    
    // Fetch new config from Firebase
    return await this.fetchAdMobConfig();
  }

  /**
   * Gets the banner unit ID for a specific screen
   * @param screenName - Name of the screen (cities, groups, home, matches, news)
   * @returns Promise<string> - The AdMob unit ID
   */
  async getBannerUnitId(screenName: keyof AdMobConfig['banners']): Promise<string> {
    // If AdMob is not available (Expo Go), return a placeholder
    if (!isGoogleMobileAdsAvailable()) {
      console.log(`⚠️  AdMob not available, returning placeholder for ${screenName}`);
      return 'expo-go-placeholder';
    }

    try {
      const config = await this.getAdMobConfig();
      const platform = Platform.OS as 'ios' | 'android';
      const mode = config.config[`${platform}_mode`];
      
      return config[platform][mode].banners[screenName];
    } catch (error) {
      console.error(`Error getting banner unit ID for ${screenName}:`, error);
      
      // Fallback to test ads if Firebase fails
      return Platform.OS === 'ios' 
        ? 'ca-app-pub-3940256099942544/2435281174'
        : 'ca-app-pub-3940256099942544/9214589741';
    }
  }

  /**
   * Gets the interstitial unit ID for a specific screen
   * @param screenName - Name of the screen (home, matchDetails)
   * @returns Promise<string> - The AdMob unit ID
   */
  async getInterstitialUnitId(screenName: keyof AdMobConfig['interstitial']): Promise<string> {
    // If AdMob is not available (Expo Go), return a placeholder
    if (!isGoogleMobileAdsAvailable()) {
      console.log(`⚠️  AdMob not available, returning placeholder for ${screenName} interstitial`);
      return 'expo-go-placeholder';
    }

    try {
      const config = await this.getAdMobConfig();
      const platform = Platform.OS as 'ios' | 'android';
      const mode = config.config[`${platform}_mode`];
      
      return config[platform][mode].interstitial[screenName];
    } catch (error) {
      console.error(`Error getting interstitial unit ID for ${screenName}:`, error);
      
      // Fallback to test ads if Firebase fails
      return Platform.OS === 'ios' 
        ? 'ca-app-pub-3940256099942544/2435281174'
        : 'ca-app-pub-3940256099942544/9214589741';
    }
  }

  /**
   * Gets the current mode (test/real) for the current platform
   */
  async getCurrentMode(): Promise<'test' | 'real'> {
    // If AdMob is not available (Expo Go), return test mode
    if (!isGoogleMobileAdsAvailable()) {
      return 'test';
    }

    try {
      const config = await this.getAdMobConfig();
      const platform = Platform.OS as 'ios' | 'android';
      return config.config[`${platform}_mode`];
    } catch (error) {
      console.error('Error getting current mode:', error);
      return 'test'; // Default to test mode on error
    }
  }

  /**
   * Clears the cached configuration to force a fresh fetch
   */
  clearCache(): void {
    this.cachedConfig = null;
    this.lastFetchTime = 0;
  }
}

// Export a singleton instance
export const adMobService = new AdMobService();
export default adMobService;