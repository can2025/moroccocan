# Firebase AdMob Integration

This implementation allows you to dynamically control AdMob banner and interstitial ad IDs through Firebase Realtime Database. You can switch between test and real modes for different platforms (iOS/Android) without rebuilding your app.

## Setup

### 1. Firebase Configuration

The Firebase configuration is set up in `config/firebase.ts` with your project credentials:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyAbobrnsfxRyl81BUmoBIklGzqEF9LcdRQ",
  authDomain: "banneradscan2025.firebaseapp.com",
  databaseURL: "https://banneradscan2025-default-rtdb.firebaseio.com",
  projectId: "banneradscan2025",
  storageBucket: "banneradscan2025.appspot.com",
  messagingSenderId: "269622138763",
  appId: "1:269622138763:android:af322e75458e1101f5418e"
};
```

### 2. Firebase Realtime Database Structure

Your database should be structured as follows:

```json
{
  "admob": {
    "config": {
      "android_mode": "real",
      "ios_mode": "real",
      "description": "Set each platform to 'test' for test ads or 'real' for production ads"
    },
    "android": {
      "real": {
        "banners": {
          "cities": "ca-app-pub-6970333913715429/1363624844",
          "groups": "ca-app-pub-6970333913715429/1363624844",
          "home": "ca-app-pub-6970333913715429/1363624844",
          "matches": "ca-app-pub-6970333913715429/1363624844",
          "news": "ca-app-pub-6970333913715429/1363624844"
        },
        "interstitial": {
          "home": "ca-app-pub-6970333913715429/5110624080",
          "matchDetails": "ca-app-pub-6970333913715429/5110624080"
        }
      },
      "test": {
        "banners": {
          "cities": "ca-app-pub-3940256099942544/9214589741",
          "groups": "ca-app-pub-3940256099942544/9214589741",
          "home": "ca-app-pub-3940256099942544/9214589741",
          "matches": "ca-app-pub-3940256099942544/9214589741",
          "news": "ca-app-pub-3940256099942544/9214589741"
        },
        "interstitial": {
          "home": "ca-app-pub-3940256099942544/9214589741",
          "matchDetails": "ca-app-pub-3940256099942544/9214589741"
        }
      }
    },
    "ios": {
      "real": {
        "banners": {
          "cities": "ca-app-pub-6970333913715429/2696285170",
          "groups": "ca-app-pub-6970333913715429/2696285170",
          "home": "ca-app-pub-6970333913715429/2696285170",
          "matches": "ca-app-pub-6970333913715429/2696285170",
          "news": "ca-app-pub-6970333913715429/2696285170"
        },
        "interstitial": {
          "home": "ca-app-pub-6970333913715429/7389303068",
          "matchDetails": "ca-app-pub-6970333913715429/7389303068"
        }
      },
      "test": {
        "banners": {
          "cities": "ca-app-pub-3940256099942544/2435281174",
          "groups": "ca-app-pub-3940256099942544/2435281174",
          "home": "ca-app-pub-3940256099942544/2435281174",
          "matches": "ca-app-pub-3940256099942544/2435281174",
          "news": "ca-app-pub-3940256099942544/2435281174"
        },
        "interstitial": {
          "home": "ca-app-pub-3940256099942544/2435281174",
          "matchDetails": "ca-app-pub-3940256099942544/2435281174"
        }
      }
    }
  }
}
```

## How It Works

### AdMob Service (`services/adMobService.ts`)

The `AdMobService` class handles:

1. **Fetching configuration** from Firebase Realtime Database
2. **Caching** the configuration for 5 minutes to reduce Firebase calls
3. **Platform detection** (iOS/Android) 
4. **Mode selection** (test/real) based on Firebase config
5. **Fallback handling** with Google's test ad units if Firebase fails

### Key Methods

- `getBannerUnitId(screenName)`: Returns the appropriate banner ad unit ID
- `getInterstitialUnitId(screenName)`: Returns the appropriate interstitial ad unit ID  
- `getCurrentMode()`: Returns current mode (test/real) for the platform
- `clearCache()`: Forces a fresh fetch from Firebase

### Banner Components

Both `BannerBlock.native.tsx` and `BannerBlock2.native.tsx` have been updated to:

1. Accept a `screenName` prop to identify which screen the banner is for
2. Fetch the appropriate ad unit ID from Firebase via `adMobService`
3. Handle loading states and fallback to test ads on errors
4. Use React hooks for state management

## Usage

### In Screen Components

The banner components now accept a `screenName` prop:

```tsx
<BannerBlock screenName="cities" />
<BannerBlock screenName="groups" />
<BannerBlock screenName="home" />
<BannerBlock screenName="matches" />
<BannerBlock screenName="news" />
```

### Switching Between Test and Real Modes

To switch modes, simply update the Firebase Realtime Database:

1. Go to your Firebase Console
2. Navigate to Realtime Database
3. Edit `admob/config/android_mode` or `admob/config/ios_mode`
4. Set to either `"test"` or `"real"`
5. The app will pick up the changes within 5 minutes (or immediately if you clear the cache)

## Benefits

1. **No App Updates Required**: Switch between test and real ads without rebuilding
2. **Platform-Specific Control**: Different settings for iOS and Android
3. **Screen-Specific Ads**: Different ad units for different screens
4. **Fallback Safety**: Automatically falls back to test ads if Firebase fails
5. **Performance Optimized**: Caching reduces Firebase calls
6. **Easy Management**: Simple Firebase Console interface for ad management

## Testing

Use the test file `tests/testAdMobService.ts` to verify the integration:

```typescript
import { testAdMobService } from './tests/testAdMobService';
testAdMobService();
```

This will test all banner and interstitial ad unit fetching and log the results.

## Dependencies Added

- `firebase`: Firebase SDK for React Native integration

## Files Modified

- `tsconfig.json`: Added TypeScript configuration for React imports
- `components/BannerBlock.native.tsx`: Updated to use Firebase
- `components/BannerBlock2.native.tsx`: Updated to use Firebase  
- All screen files using BannerBlock: Added `screenName` props

## Files Created

- `config/firebase.ts`: Firebase configuration and initialization
- `services/adMobService.ts`: AdMob service with Firebase integration
- `tests/testAdMobService.ts`: Testing utilities

## Error Handling

The implementation includes comprehensive error handling:

- **Firebase Connection Errors**: Falls back to Google's test ad units
- **Invalid Configuration**: Uses safe defaults
- **Network Issues**: Cached values are used when available
- **Missing Data**: Graceful degradation with test ads

## Security Notes

- The Firebase configuration uses your actual API key, which is safe for client-side use
- Database rules should be configured to allow read access for the `admob` path
- Consider implementing Firebase Authentication for additional security if needed