import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Chrome as Home, Calendar, Users, MapPin, Target } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2b0d0d',
          borderTopColor: '#3e1415',
          height: 70,
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
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={size} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="calendar-number-outline" size={size} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ size, color }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cities"
        options={{
          title: 'Cities',
          tabBarIcon: ({ size, color }) => (
            <MapPin size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="predictions"
        options={{
          title: 'Predictions',
          tabBarIcon: ({ size, color }) => (
    
            <AntDesign name="Trophy" size={size} color="white" />
          ),
        }}
      />
    </Tabs>
  );
}