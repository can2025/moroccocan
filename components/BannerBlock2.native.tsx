import React from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import env from '../env';

export default function BannerBlock() {
  const bannerUnitId =
    Platform.OS === 'ios'
      ? env.MOBADS_BANNER_ID_IOS_2
      : env.MOBADS_BANNER_ID_ANDROID_2;

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