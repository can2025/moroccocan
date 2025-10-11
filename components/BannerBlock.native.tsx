import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { isGoogleMobileAdsAvailable, getBannerAd, getBannerAdSize } from '../utils/adMobCompatibility';
import { adMobService } from '../services/adMobService';

interface BannerBlockProps {
  screenName?: 'cities' | 'groups' | 'home' | 'matches' | 'news';
}

export default function BannerBlock({ screenName = 'home' }: BannerBlockProps) {
  const [bannerUnitId, setBannerUnitId] = React.useState<string>('');

  React.useEffect(() => {
    // Only fetch banner unit ID if AdMob is available
    if (!isGoogleMobileAdsAvailable()) {
      console.log(`⚠️  AdMob not available for ${screenName} banner (Expo Go mode)`);
      return;
    }

    const fetchBannerUnitId = async () => {
      try {
        const unitId = await adMobService.getBannerUnitId(screenName);
        setBannerUnitId(unitId);
      } catch (error) {
        console.error('Failed to fetch banner unit ID:', error);
        // Fallback to test ads
        const fallbackId = Platform.OS === 'ios' 
          ? 'ca-app-pub-3940256099942544/2435281174'
          : 'ca-app-pub-3940256099942544/9214589741';
        setBannerUnitId(fallbackId);
      }
    };

    fetchBannerUnitId();
  }, [screenName]);

  // If AdMob is not available (Expo Go), show a placeholder or nothing
  if (!isGoogleMobileAdsAvailable()) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          📱 AdMob Banner ({screenName})
        </Text>
        <Text style={styles.placeholderSubtext}>
          Ads will show in production build
        </Text>
      </View>
    );
  }

  // Don't render the ad until we have a unit ID
  if (!bannerUnitId) {
    return null;
  }

  const BannerAd = getBannerAd();
  const BannerAdSize = getBannerAdSize();

  if (!BannerAd || !BannerAdSize) {
    return null;
  }

  return (
    <BannerAd
      unitId={bannerUnitId}
      size={BannerAdSize.BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#2b0d0d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3e1415',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#E53E3E',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  placeholderSubtext: {
    color: '#9CA3AF',
    fontSize: 12,
  },
});