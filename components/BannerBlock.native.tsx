import React from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import env from '../env';

export default function BannerBlock() {
  const bannerUnitId =
    Platform.OS === 'ios'
      ? env.MOBADS_BANNER_ID_IOS
      : env.MOBADS_BANNER_ID_ANDROID;

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