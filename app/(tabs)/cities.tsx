import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const cities = [
  {
    id: 1,
    name: 'Marrakech',
    isActive: true,
    heritage: 'Marrakech – The Red City Awaits You! Step into the vibrant heart of Morocco in Marrakech, a city where ancient traditions and modern energy collide. From the bustling souks of the Medina to the majestic Koutoubia Mosque and the lively Jemaa el-Fnaa square, Marrakech offers an unforgettable cultural experience. AFCON fans can enjoy not only the excitement of football but also the warm hospitality, rich flavors, and iconic red architecture that make this city truly unique. Discover world-class cuisine, breathtaking gardens, and centuries-old palaces – all under the glowing Moroccan sun. Marrakech is more than a destination – it’s a celebration of life.',
    football: 'Marrakech has a rich football history with the Stade de Marrakech being one of Morocco\'s premier football venues. The city\'s local club, Kawkab Marrakech, has contributed significantly to Moroccan football, winning national championships and showcasing Morocco\'s passion for the beautiful game.',
    stadium: 'Marrakesh Stadium',
    capacity: '41,245',
    images: [
      'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 2,
    name: 'Rabat',
    isActive: false,
    heritage: 'Rabat is the capital city of Morocco and the country\'s seventh largest city with an urban population of approximately 580,000. It is also the capital of the Rabat-Salé-Kénitra region. The city is located on the Atlantic Ocean at the mouth of the river Bou Regreg, opposite Salé, the city\'s main commuter town.',
    football: 'Rabat hosts several important football venues and has been central to Moroccan football development. The city\'s sporting infrastructure includes multiple stadiums that have hosted significant national and international matches.',
    stadium: 'Prince Moulay Abdellah Stadium',
    capacity: '69,500',
    images: [
      'https://images.pexels.com/photos/11641690/pexels-photo-11641690.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/14901002/pexels-photo-14901002.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    id: 3,
    name: 'Tangier',
    isActive: false,
    heritage: 'Tangier is a major city in northwestern Morocco. It is located on the Maghreb coast at the western entrance to the Strait of Gibraltar, where the Mediterranean Sea meets the Atlantic Ocean off Cape Spartel. The city is the capital of the Tanger-Tetouan-Al Hoceima region.',
    football: 'Tangier\'s football scene is vibrant with the impressive Ibn Batouta Stadium serving as a modern venue for international matches. The city has produced talented players and maintains strong football traditions.',
    stadium: 'Ibn Batouta Stadium',
    capacity: '75,600',
    images: [
      'https://images.pexels.com/photos/10813896/pexels-photo-10813896.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4930014/pexels-photo-4930014.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
];

export default function CitiesScreen() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Host Cities</Text>
      
      <View style={styles.cityHeader}>
        <Text style={styles.cityName}>{selectedCity.name}</Text>
        
        {/* City Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.citySelector}
        >
          {cities.map((city) => (
            <TouchableOpacity
              key={city.id}
              style={[
                styles.cityButton,
                selectedCity.id === city.id && styles.activeCityButton
              ]}
              onPress={() => setSelectedCity(city)}
            >
              <Text style={[
                styles.cityButtonText,
                selectedCity.id === city.id && styles.activeCityButtonText
              ]}>{city.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cultural Heritage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cultural Heritage</Text>
          <Text style={styles.description}>{selectedCity.heritage}</Text>
          
          <View style={styles.imageGrid}>
            {selectedCity.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </View>
        </View>

        {/* Football History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Football History</Text>
          <Text style={styles.description}>{selectedCity.football}</Text>
          
          <View style={styles.stadiumInfo}>
            <Text style={styles.stadiumName}>{selectedCity.stadium}</Text>
            <Text style={styles.capacity}>Capacity: {selectedCity.capacity}</Text>
          </View>
        </View>

        {/* Stadium Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stadium Information</Text>
          <View style={styles.stadiumCard}>
            <Text style={styles.stadiumCardName}>{selectedCity.stadium}</Text>
            <Text style={styles.stadiumCardCapacity}>Capacity: {selectedCity.capacity}</Text>
            <Text style={styles.stadiumCardLocation}>Location: {selectedCity.name}, Morocco</Text>
            
            <TouchableOpacity style={styles.mapButton}>
              <Text style={styles.mapButtonText}>View on Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  cityHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  citySelector: {
    marginBottom: 16,
  },
  cityButton: {
    backgroundColor: '#2b0d0d',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#3e1415',
  },
  activeCityButton: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  cityButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  activeCityButtonText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 16,
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  image: {
    width: '48%',
    height: 120,
    borderRadius: 8,
  },
  stadiumInfo: {
    backgroundColor: '#2b0d0d',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#3e1415',
  },
  stadiumName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  capacity: {
    fontSize: 14,
    color: '#E53E3E',
    fontWeight: '600',
  },
  stadiumCard: {
    backgroundColor: '#2b0d0d',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3e1415',
  },
  stadiumCardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  stadiumCardCapacity: {
    fontSize: 16,
    color: '#E53E3E',
    fontWeight: '600',
    marginBottom: 4,
  },
  stadiumCardLocation: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  mapButton: {
    backgroundColor: '#E53E3E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});