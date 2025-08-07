import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, MapPin, Trophy, Clock } from 'lucide-react-native';
import CountryFlag from "react-native-country-flag"; // Use this for flags in React Native
import LanguageSelector from '../../components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n'; // Import the i18n instance directly

export default function HomeScreen() {
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const { t } = useTranslation();
  const currentLang = i18n.language;

  // Dummy data for live matches (replace with API fetch if needed)
  const [liveMatches, setLiveMatches] = useState<any[]>([
    // Example:
    // {
    //   id: '1',
    //   homeTeam: 'Morocco',
    //   homeFlag: 'MA',
    //   homeScore: 2,
    //   awayTeam: 'Senegal',
    //   awayFlag: 'SN',
    //   awayScore: 1,
    //   minute: "75'",
    //   venue: 'Stade Mohammed V',
    //   city: 'Casablanca'
    // }
  ]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/matches/upcoming');
        const data = await res.json();
        setUpcomingMatches(data);
      } catch (error) {
        console.error('Failed to fetch upcoming matches:', error);
      } finally {
        setLoadingUpcoming(false);
      }
    };
    fetchUpcoming();
  }, []);

  return (
    <SafeAreaView style={styles.container}>  
    <LinearGradient
  colors={['#2b0d0d', '#190504']}
  style={styles.header}
>
  {/* Top Row: Logo left, Language Selector right */}
  <View style={styles.topRow}>
    <Image
      source={require('../../assets/images/afcon2025.png')}
      style={styles.logo}
      resizeMode="contain"
    />
    <View style={styles.languageSelector}>
      <LanguageSelector />
    </View>
  </View>

  {/* Centered Text Slightly Lower */}
  <View style={styles.centerTextContainer}>
    <Text style={styles.title}>CAN 2025 Morocco</Text>
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
                  <CountryFlag isoCode={match.homeFlag} size={25} style={styles.flag} />
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
                  <CountryFlag isoCode={match.awayFlag} size={25} style={styles.flag} />
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
          {loadingUpcoming ? (
            <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>Loading...</Text>
          ) : upcomingMatches.length === 0 ? (
            <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>No upcoming matches.</Text>
          ) : (
            upcomingMatches.map((match) => (
              <TouchableOpacity key={match._id || match.id} style={styles.matchCard}>
                <View style={styles.matchInfo}>
                  <View style={styles.teamContainer}>
                    <CountryFlag isoCode={match.homeFlag} size={25} style={styles.flag} />
                    <Text style={styles.teamName}>{match.homeTeam}</Text>
                  </View>
                  <View style={styles.matchCenter}>
                    <Text style={styles.matchTime}>{match.time}</Text>
                    <Text style={styles.vs}>vs</Text>
                    <Text style={styles.matchDate}>{match.date}</Text>
                  </View>
                  <View style={styles.teamContainer}>
                    <Text style={styles.teamName}>{match.awayTeam}</Text>
                    <CountryFlag isoCode={match.awayFlag} size={25} style={styles.flag} />
                  </View>
                </View>
                <View style={styles.venueInfo}>
                  <MapPin size={14} color="#9CA3AF" />
                  <Text style={styles.venue}>{match.venue}, {match.city}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Tournament Stats */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Trophy size={20} color="#E53E3E" />
            <Text style={styles.sectionTitle}>{t('home.tournamentinfos')}</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>{t('home.teams')}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>{t('home.groups')}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>{t('home.cities')}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>52</Text>
              <Text style={styles.statLabel}>{t('home.matches')}</Text>
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
  headerContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  header: {
    height: 200,
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingHorizontal: 10,
    position: 'relative',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logo: {
    width: 79,
    height: 140,
  },
  languageSelector: {
    alignSelf: 'flex-start',
  },
  centerTextContainer: {
    position: 'absolute',
    top: 110, // Adjust to move text down
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  flag: {
    marginHorizontal: 8, // fallback for older React Native versions
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