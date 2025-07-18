import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, MapPin, Trophy, Clock } from 'lucide-react-native';
import Flag from 'react-world-flags';

const upcomingMatches = [
  {
    id: 1,
    homeTeam: 'Morocco',
    awayTeam: 'Comoros',
    homeFlag: 'ma',
    awayFlag: 'km',
    date: 'Today',
    time: '20:00',
    venue: 'Prince Moulay Abdellah Stadium',
    city: 'Rabat',
    isLive: false,
  },
  {
    id: 2,
    homeTeam: 'Egypt',
    awayTeam: 'Zimbabwe',
    homeFlag: 'eg',
    awayFlag: 'zw',
    date: 'Dec 22',
    time: '18:00',
    venue: 'Adrar Stadium',
    city: 'Agadir',
    isLive: false,
  },
];

const liveMatches = [
  {
    id: 1,
    homeTeam: 'Nigeria',
    awayTeam: 'Tunisia',
    homeFlag: 'ng',
    awayFlag: 'tn',
    homeScore: 2,
    awayScore: 1,
    minute: '78\'',
    venue: 'Complexe Sportif de Fès',
    city: 'Fès',
    isLive: true,
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>     
      <LinearGradient
  colors={['#2b0d0d', '#190504']}
  style={styles.header}
>
  <View style={styles.headerContent}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>CAN 2025 Morocco</Text>
      <Text style={styles.subtitle}>Africa Cup of Nations</Text>
    </View>
  </View>
</LinearGradient>
      {/*
      <LinearGradient
  colors={['#2b0d0d', '#190504']}
  style={styles.header}>
  <View style={styles.headerContent}>
    <View style={styles.textContainer}>
      <Image
          source={require('../../assets/images/afcon2025.png')}
          style={{ width: 25, height: 50 }}
          resizeMode="contain"
      />
      <View style={styles.texts}>
        <Text style={styles.title}>CAN 2025 Morocco</Text>
        <Text style={styles.subtitle}>Africa Cup of Nations</Text>
      </View>
    </View>
  </View>
</LinearGradient>
*/}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Live Matches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Play size={20} color="#E53E3E" />
            <Text style={styles.sectionTitle}>Live Now</Text>
          </View>
          
          {liveMatches.map((match) => (
            <TouchableOpacity key={match.id} style={styles.liveMatchCard}>
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
              
              <View style={styles.matchInfo}>
                <View style={styles.teamContainer}>
                  <Flag code={match.homeFlag} style={{ width: 32, height: 32, margin: '10px' }} />
                  <Text style={styles.teamName}>{match.homeTeam}</Text>
                  <Text style={styles.score}>{match.homeScore}</Text>
                </View>
                
                <View style={styles.matchCenter}>
                  <Text style={styles.minute}>{match.minute}</Text>
                  <Text style={styles.vs}>-</Text>
                </View>
                
                <View style={styles.teamContainer}>
                  <Text style={styles.score}>{match.awayScore}</Text>
                  <Text style={[styles.teamName, { margin: 10 }]}>{match.awayTeam}</Text>
                  <Flag code={match.awayFlag} style={{ width: 32, height: 32, margin: '10px' }} />
                </View>
              </View>
              
              <View style={styles.venueInfo}>
                <MapPin size={14} color="#9CA3AF" />
                <Text style={styles.venue}>{match.venue}, {match.city}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Matches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={20} color="#E53E3E" />
            <Text style={styles.sectionTitle}>Upcoming</Text>
          </View>
          
          {upcomingMatches.map((match) => (
            <TouchableOpacity key={match.id} style={styles.matchCard}>
              <View style={styles.matchInfo}>
                <View style={styles.teamContainer}>
                  <Flag code={match.homeFlag} style={{ width: 32, height: 32, margin: '10px' }} />
                  <Text style={styles.teamName}>{match.homeTeam}</Text>
                </View>
                
                <View style={styles.matchCenter}>
                  <Text style={styles.matchTime}>{match.time}</Text>
                  <Text style={styles.vs}>vs</Text>
                  <Text style={styles.matchDate}>{match.date}</Text>
                </View>
                
                <View style={styles.teamContainer}>
                  <Text style={styles.teamName}>{match.awayTeam}</Text>
                  <Flag code={match.awayFlag} style={{ width: 32, height: 32, margin: '10px' }} />
                </View>
              </View>
              
              <View style={styles.venueInfo}>
                <MapPin size={14} color="#9CA3AF" />
                <Text style={styles.venue}>{match.venue}, {match.city}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tournament Stats */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Trophy size={20} color="#E53E3E" />
            <Text style={styles.sectionTitle}>Tournament Info</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Teams</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Groups</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>9</Text>
              <Text style={styles.statLabel}>Cities</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>52</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E53E3E',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  liveMatchCard: {
    backgroundColor: '#2b0d0d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E53E3E',
  },
  matchCard: {
    backgroundColor: '#2b0d0d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3e1415',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53E3E',
    marginRight: 8,
  },
  liveText: {
    color: '#E53E3E',
    fontSize: 12,
    fontWeight: 'bold',
  },
  matchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
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
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  matchCenter: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  minute: {
    fontSize: 14,
    color: '#E53E3E',
    fontWeight: 'bold',
  },
  vs: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  matchTime: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  matchDate: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#2b0d0d',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3e1415',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E53E3E',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});