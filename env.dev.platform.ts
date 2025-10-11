import { Platform } from 'react-native';

// Android emulator uses 10.0.2.2 to reach the host machine's localhost
// iOS simulator and web can use localhost directly
const getLocalApiUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000/api'; // Android emulator
  }
  return 'http://localhost:5000/api'; // iOS simulator and web
};

export default {
  API_BASE_URL: getLocalApiUrl(),
  MOBADS_BANNER_ID_IOS: 'ca-app-pub-3940256099942544/2435281174',
  MOBADS_BANNER_ID_ANDROID: 'ca-app-pub-3940256099942544/9214589741',
  MOBADS_BANNER_ID_IOS_2: 'ca-app-pub-3940256099942544/2435281174',
  MOBADS_BANNER_ID_ANDROID_2: 'ca-app-pub-3940256099942544/9214589741',
};