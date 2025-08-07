import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import HomeScreen from './app/(tabs)/index';
import GroupsScreen from './app/(tabs)/groups';
import CitiesScreen from './app/(tabs)/cities';
import MatchesScreen from './app/(tabs)/matches';
import NewsScreen from './app/(tabs)/news';
import NewsDetailScreen from './app/newsDetails';
import './i18n';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
                <Stack.Screen name="Groups" component={GroupsScreen} options={{ title: 'Groups' }} />
                <Stack.Screen name="Cities" component={CitiesScreen} options={{ title: 'Cities' }} />
                <Stack.Screen name="Matches" component={MatchesScreen} options={{ title: 'Matches' }} />
                <Stack.Screen name="News" component={NewsScreen} options={{ title: 'News' }} />
                <Stack.Screen name="NewsDetails" component={NewsDetailScreen} options={{ title: 'News Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
