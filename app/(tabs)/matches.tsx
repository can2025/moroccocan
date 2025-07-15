import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, MapPin, ExternalLink } from 'lucide-react-native';
import FlagIcon from '@/components/FlagIcon';

const matches = [
  {
    id: 1,
    homeTeam: 'Morocco',
    awayTeam: 'Comoros',
    homeFlag: '🇲🇦',
    awayFlag: '🇰🇲',
    date: 'Dec 21',
    time: '20:00',
    venue: 'Prince Moulay Abdellah Stadium',
    city: 'Rabat',
    group: 'Group A',
    status: 'upcoming',
  },
  {
    id: 2,
    homeTeam: 'Mali',
    awayTeam: 'Zambia',
    homeFlag: '🇲🇱',
    awayFlag: '🇿🇲',
    date: 'Dec 22',
    time: '18:00',
    venue: 'Mohammed V Stadium',
    city: 'Casablanca',
    group: 'Group A',
    status: 'upcoming',
  },
  {
    id: 3,
    homeTeam: 'Egypt',
    awayTeam: 'Zimbabwe',
    homeFlag: '🇪🇬',
    awayFlag: '🇿🇼',
    date: 'Dec 22',
    time: '20:00',
    venue: 'Adrar Stadium',
    city: 'Agadir',
    group: 'Group B',
    status: 'upcoming',
  },
  {
    id: 4,
    homeTeam: 'South Africa',
    awayTeam: 'Angola',
    homeFlag: '🇿🇦',
    awayFlag: '🇦🇴',
    date: 'Dec 22',
    time: '20:00',
    venue: 'Marrakesh Stadium',
    city: 'Marrakech',
    group: 'Group B',
    status: 'upcoming',
  },
];

const filters = {
  groups: ['All Groups', 'Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F'],
  dates: ['All Dates', 'Dec 21', 'Dec 22', 'Dec 23', 'Dec 24'],
  cities: ['All Cities', 'Rabat', 'Casablanca', 'Tangier', 'Marrakech', 'Agadir', 'Fez'],
};

export default function MatchesScreen() {
  const [selectedGroup, setSelectedGroup] = useState('All Groups');
  const [selectedDate, setSelectedDate] = useState('All Dates');
  const [selectedCity, setSelectedCity] = useState('All Cities');

  const filteredMatches = matches.filter(match => {
    return (
      (selectedGroup === 'All Groups' || match.group === selectedGroup) &&
      (selectedDate === 'All Dates' || match.date === selectedDate) &&
      (selectedCity === 'All Cities' || match.city === selectedCity)
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Match Calendar</Text>
      
      {/* Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>{selectedGroup}</Text>
            <ChevronDown size={16} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>{selectedDate}</Text>
            <ChevronDown size={16} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>{selectedCity}</Text>
            <ChevronDown size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Group Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group A</Text>
          
          {filteredMatches.map((match) => (
            <View key={match.id} style={styles.matchCard}>
              <View style={styles.matchInfo}>
                <View style={styles.teamContainer}>
                  <FlagIcon country={match.homeTeam} size={32} />
                  <Text style={styles.teamName}>{match.homeTeam}</Text>
                </View>
                
                <View style={styles.matchCenter}>
                  <Text style={styles.vs}>vs.</Text>
                </View>
                
                <View style={styles.teamContainer}>
                  <Text style={styles.teamName}>{match.awayTeam}</Text>
                  <FlagIcon country={match.awayTeam} size={32} />
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
          ))}
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
  filterButton: {
    backgroundColor: '#2b0d0d',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#3e1415',
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
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