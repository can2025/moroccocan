import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, MapPin, ExternalLink } from 'lucide-react-native';
import CountryFlag from "react-native-country-flag";
import { Picker } from '@react-native-picker/picker';
import LanguageSelector from '../../components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n'; // Import the i18n instance directly


const filters = {
  groups: ['All Groups', 'Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F'],
  dates: ['All Dates', 'Dec 21', 'Dec 22', 'Dec 23', 'Dec 24'],
  cities: ['All Cities', 'Rabat', 'Casablanca', 'Tangier', 'Marrakech', 'Agadir', 'Fez'],
};

export default function MatchesScreen() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState('All Groups');
  const [selectedDate, setSelectedDate] = useState('All Dates');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const { t } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/matches');
        const data = await res.json();
        setMatches(data);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  // Dynamically compute filter options
  const groupOptions = ['All Groups', ...Array.from(new Set(matches.map(m => m.group)))];
  const dateOptions = ['All Dates', ...Array.from(new Set(matches.map(m => m.date)))];
  const cityOptions = ['All Cities', ...Array.from(new Set(matches.map(m => m.city)))];

  const filteredMatches = matches.filter(match => {
    return (
      (selectedGroup === 'All Groups' || match.group === selectedGroup) &&
      (selectedDate === 'All Dates' || match.date === selectedDate) &&
      (selectedCity === 'All Cities' || match.city === selectedCity)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <LanguageSelector />
      <Text style={styles.title}>{t('match.calendar')}</Text>
      {/* Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.filterRow}>
          {/* Group Filter */}
          <Picker
            selectedValue={selectedGroup}
            style={styles.filterPicker}
            onValueChange={(itemValue) => setSelectedGroup(itemValue)}
          >
            {groupOptions.map((group) => (
              <Picker.Item key={group} label={group} value={group} />
            ))}
          </Picker>
          {/* Date Filter */}
          <Picker
            selectedValue={selectedDate}
            style={styles.filterPicker}
            onValueChange={(itemValue) => setSelectedDate(itemValue)}
          >
            {dateOptions.map((date) => (
              <Picker.Item key={date} label={date} value={date} />
            ))}
          </Picker>
          {/* City Filter */}
          <Picker
            selectedValue={selectedCity}
            style={styles.filterPicker}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
          >
            {cityOptions.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {loading ? (
            <ActivityIndicator color="#E53E3E" size="large" style={{ marginTop: 40 }} />
          ) : filteredMatches.length === 0 ? (
            <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>No matches found.</Text>
          ) : (
            filteredMatches.map((match) => (
              <View key={match._id || match.id} style={styles.matchCard}>
                <View style={styles.matchInfo}>
                  <View style={styles.teamContainer}>
                    <CountryFlag isoCode={match.homeFlag} size={25} style={styles.flag} />
                    <Text style={styles.teamName}>{match.homeTeam}</Text>
                  </View>
                  <View style={styles.matchCenter}>
                    <Text style={styles.vs}>vs.</Text>
                  </View>
                  <View style={styles.teamContainer}>
                    <Text style={styles.teamName}>{match.awayTeam}</Text>
                    <CountryFlag isoCode={match.awayFlag} size={25} style={styles.flag} />
                  </View>
                </View>
                <View style={styles.matchDetails}>
                  <Text style={styles.matchDate}>{match.date} | {match.time}</Text>
                  <View style={styles.venueInfo}>
                    <MapPin size={14} color="#9CA3AF" />
                    <Text style={styles.venue}>{match.venue} | {match.city}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.buyTicketButton}>
                  <Text style={styles.buyTicketText}>Buy Tickets</Text>
                  <ExternalLink size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))
          )}
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
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterPicker: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#2b0d0d',
    marginHorizontal: 4,
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
  matchCard: {
    backgroundColor: '#2b0d0d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3e1415',
  },
  matchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8, // Add gap for consistent spacing (React Native >=0.71)
  },
  flag: {
    marginHorizontal: 8, // fallback for older React Native versions
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  matchCenter: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  vs: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  matchDetails: {
    marginBottom: 16,
  },
  matchDate: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  venueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  venue: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  buyTicketButton: {
    backgroundColor: '#E53E3E',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyTicketText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});