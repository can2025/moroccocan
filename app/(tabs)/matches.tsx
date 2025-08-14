import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, MapPin, ExternalLink } from 'lucide-react-native';
import { Platform } from 'react-native';
import CountryFlag from "react-native-country-flag";
import { Picker } from '@react-native-picker/picker';
import LanguageSelector from '../../components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n'; // Import the i18n instance directly
import env from '../../env';

export default function MatchesScreen() {
  const ALL_VALUE = 'ALL';
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(ALL_VALUE);
  const [selectedDate, setSelectedDate] = useState(ALL_VALUE);
  const [selectedCity, setSelectedCity] = useState(ALL_VALUE);
  const { t } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(`${env.API_BASE_URL}/matches`);
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

  // Dynamically compute filter options with sentinel "ALL" value
  const groupOptions = [
    { label: t('match.all'), value: ALL_VALUE },
    ...Array.from(new Set(matches.map(m => m[`group_${currentLang}`]))).map(g => ({ label: g, value: g }))
  ];

  const dateOptions = [
    { label: t('match.all'), value: ALL_VALUE },
    ...Array.from(new Set(matches.map(m => m[`date_${currentLang}`]))).map(d => ({ label: d, value: d }))
  ];

  const cityOptions = [
    { label: t('match.all'), value: ALL_VALUE },
    ...Array.from(new Set(matches.map(m => m[`city_${currentLang}`]))).map(c => ({ label: c, value: c }))
  ];

  // Filtering using sentinel ALL_VALUE
  const filteredMatches = matches.filter(match => {
    return (
      (selectedGroup === ALL_VALUE || match[`group_${currentLang}`] === selectedGroup) &&
      (selectedDate === ALL_VALUE || match[`date_${currentLang}`] === selectedDate) &&
      (selectedCity === ALL_VALUE || match[`city_${currentLang}`] === selectedCity)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.languages}>
        <LanguageSelector />
      </View>
      <Text style={styles.title}>{t('match.calendar')}</Text>
      {/* Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.filterRow}>
          {/* Group Filter */}
          <View style={styles.filterWrapper}>
            <Text style={styles.filterLabel}>{t('match.groups')}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedGroup}
                style={styles.filterPicker}
                onValueChange={setSelectedGroup}
                dropdownIconColor="#3e1415"
                itemStyle={styles.pickerItemStyle}
              >
                {groupOptions.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker>
            </View>
          </View>
          {/* Date Filter */}
          <View style={styles.filterWrapper}>
            <Text style={styles.filterLabel}>{t('match.dates')}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedDate}
                style={styles.filterPicker}
                onValueChange={setSelectedDate}
                dropdownIconColor="#3e1415"
                itemStyle={styles.pickerItemStyle}
              >
                {dateOptions.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker>
            </View>
          </View>
          {/* City Filter */}
          <View style={styles.filterWrapper}>
            <Text style={styles.filterLabel}>{t('match.cities')}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCity}
                style={styles.filterPicker}
                onValueChange={setSelectedCity}
                dropdownIconColor="#3e1415"
                itemStyle={styles.pickerItemStyle}
              >
                {cityOptions.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </View>

      {/* Matches list */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {loading ? (
            <ActivityIndicator color="#E53E3E" size="large" style={{ marginTop: 40 }} />
          ) : filteredMatches.length === 0 ? (
            <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>{t('home.upcoming')}</Text>
          ) : (
            filteredMatches.map(match => (
              <View key={match._id || match.id} style={styles.matchCard}>
                {/* Teams */}
                <View style={styles.matchInfo}>
                  <View style={styles.teamContainer}>
                    <CountryFlag isoCode={match.homeFlag} size={25} style={styles.flag} />
                    <Text style={styles.teamName}>{match[`homeTeam_${currentLang}`]}</Text>
                  </View>
                  <View style={styles.matchCenter}>
                    <Text style={styles.vs}>vs.</Text>
                  </View>
                  <View style={styles.teamContainer}>
                    <Text style={styles.teamName}>{match[`awayTeam_${currentLang}`]}</Text>
                    <CountryFlag isoCode={match.awayFlag} size={25} style={styles.flag} />
                  </View>
                </View>
                {/* Match details */}
                <View style={styles.matchDetails}>
                  <Text style={styles.matchDate}>
                    {match[`date_${currentLang}`]} | {match.time}
                  </Text>
                  <View style={styles.venueInfo}>
                    <MapPin size={14} color="#9CA3AF" />
                    <Text style={styles.venue}>
                      {match[`venue_${currentLang}`]} | {match[`city_${currentLang}`]}
                    </Text>
                  </View>
                </View>
                {/* Ticket button */}
                <TouchableOpacity style={styles.buyTicketButton}>
                  <Text style={styles.buyTicketText}>{t('match.buyticket')}</Text>
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
  languages: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
  filterLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    marginLeft: 4,
  },
  pickerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E53E3E',
    overflow: 'hidden',
    marginBottom: 8,
    justifyContent: 'center',
  },
  filterPicker: {
    color: '#fff',
    width: '100%',
    height: Platform.OS === 'ios' ? 40 : 40,
    backgroundColor: '#3e1415',
  },
  pickerItemStyle: {
  height: 40,
  fontSize: 14,
  color: '#fff',
  textAlignVertical: 'center', // Mostly Android
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
    gap: 8,
  },
  flag: {
    marginHorizontal: 8,
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