import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { Platform, View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
//@ts-ignore
import BannerBlock from '../../components/BannerBlock2';


export default function TabLayout() {
  const { t } = useTranslation();
  const currentLang = i18n.language;
  return (

    <>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2b0d0d',
          borderTopColor: '#3e1415',
          height: 90,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#E53E3E',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('menu.home'),
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={size} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: t('menu.matches'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="calendar-number-outline" size={size} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: t('menu.groups'),
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="groups" size={size} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="cities"
        options={{
          title: t('menu.cities'),
          tabBarIcon: ({ size, color }) => (
            <Feather name="map-pin" size={size} color="white" />
          ),
        }}
      />
      
      <Tabs.Screen
        name="news"
        options={{
          title: t('menu.news'),
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="newspaper-o" size={size} color="white" />
          ),
        }}
      />

    </Tabs>

    {/* Banner Ad Block */}
          {Platform.OS !== 'web' && (
            <View style={styles.bannerContainer}>
              <BannerBlock screenName="home" />
            </View>
          )}
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190504',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 20,
  },
  languages: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  viewSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
})