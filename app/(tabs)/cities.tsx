import React, { useState, useEffect } from 'react';
import { View, Text, Linking, ScrollView, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LanguageSelector from '../../components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import env from '../../env';

// Helper to split array into chunks of 3
function chunkArray(arr: any[], size: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function CitiesScreen() {
  const [cities, setCities] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const currentLang = i18n.language;

  const handlePress = () => {
  const url = selectedCity.stadiumlocation;
  // Vérifie si l'URL est accessible, puis ouvre
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Impossible d'ouvrir l'URL :", url);
      }
    })
    .catch((err) => console.error('Erreur lors de l\'ouverture de l\'URL', err));
};

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${env.API_BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        setSelectedCity(data[0]);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  // Split cities into rows of 3
  const cityRows = chunkArray(cities, 3);

  if (loading || !selectedCity) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color="#E53E3E" size="large" style={{ marginTop: 40 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.languages}>
        <LanguageSelector />
      </View>
      <Text style={styles.title}>{t('cities.cities')}</Text>
      <View style={styles.cityHeader}>
        <Text style={styles.cityName}>{selectedCity[`name_${currentLang}`]}</Text>
        {/* City Selector as 2-row grid */}
        <View style={styles.citySelectorGrid}>
          {cityRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.citySelectorRow}>
              {row.map((city) => (
                <TouchableOpacity
                  key={city.id}
                  style={[
                    styles.cityButtonGrid,
                    selectedCity._id === city._id && styles.activeCityButton
                  ]}
                  onPress={() => setSelectedCity(city)}
                >
                  <Text style={[
                    styles.cityButtonText,
                    selectedCity._id === city._id && styles.activeCityButtonText
                  ]}>{city[`name_${currentLang}`]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cultural Heritage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{selectedCity[`title1_${currentLang}`]}</Text>
          <Text style={styles.description}>{selectedCity[`content1_${currentLang}`]}</Text>
          <View style={styles.imageGrid}>
            {[selectedCity.image1, selectedCity.image2].map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </View>
        </View>

        {/* What to Do in the City */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{selectedCity[`title2_${currentLang}`]}</Text>
          <Text style={styles.description}>{selectedCity[`content2_${currentLang}`]}</Text>
        </View>

        {/* Stadium Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('cities.stadiuminfo') || 'Stadium Information'}</Text>
          <View style={styles.stadiumCard}>
            <Text style={styles.stadiumCardName}>{selectedCity[`stadiumname_${currentLang}`]}</Text>
            <Text style={styles.stadiumCardCapacity}>
              {t('cities.stadiumcapacity') || 'Capacity'}: {selectedCity.stadiumcapacity}
            </Text>
            <Text style={styles.stadiumCardLocation}>
              {t('cities.stadiumlocation') || 'Location'}:</Text>
            <TouchableOpacity style={styles.mapButton} onPress={handlePress}>
                <Text style={styles.mapButtonText}>{t('cities.viewonmap') || 'View on Map'}</Text>
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
  languages: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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
  citySelectorGrid: {
    marginBottom: 16,
  },
  citySelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cityButtonGrid: {
    flex: 1,
    backgroundColor: '#2b0d0d',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#3e1415',
    alignItems: 'center',
  },
  cityButton: {
    backgroundColor: '#2b0d0d',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 8,
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