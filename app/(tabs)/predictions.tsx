import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlagIcon from '@/components/FlagIcon';

const upcomingMatches = [
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
    time: '15:30',
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
    time: '18:00',
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
    time: '20:30',
    venue: 'Marrakesh Stadium',
    city: 'Marrakech',
    group: 'Group B',
    status: 'upcoming',
  },
  {
    id: 5,
    homeTeam: 'Nigeria',
    awayTeam: 'Tanzania',
    homeFlag: 'NG',
    awayFlag: 'TZ',
    date: 'Dec 23',
    time: '13:00',
    venue: 'Fes Stadium',
    city: 'Fes',
    group: 'Group C',
    status: 'upcoming',
  },
  {
    id: 6,
    homeTeam: 'Tunisia',
    awayTeam: 'Uganda',
    homeFlag: 'TN',
    awayFlag: 'UG',
    date: 'Dec 23',
    time: '15:30',
    venue: 'Moulay Abdellah Sports Complex',
    city: 'Rabat',
    group: 'Group C',
    status: 'upcoming',
  },
  {
    id: 7,
    homeTeam: 'Senegal',
    awayTeam: 'Botswana',
    homeFlag: 'SN',
    awayFlag: 'BW',
    date: 'Dec 23',
    time: '18:00',
    venue: 'Ibn Batouta Stadium',
    city: 'Tangier',
    group: 'Group D',
    status: 'upcoming',
  },
  {
    id: 8,
    homeTeam: 'DR Congo',
    awayTeam: 'Benin',
    homeFlag: 'CD',
    awayFlag: 'BJ',
    date: 'Dec 23',
    time: '20:30',
    venue: 'Al Barid Stadium',
    city: 'Rabat',
    group: 'Group D',
    status: 'upcoming',
  },
  {
    id: 9,
    homeTeam: 'DR Congo',
    awayTeam: 'Benin',
    homeFlag: 'CD',
    awayFlag: 'BJ',
    date: 'Dec 23',
    time: '20:30',
    venue: 'Al Barid Stadium',
    city: 'Rabat',
    group: 'Group D',
    status: 'upcoming',
  },
];

export default function PredictionsScreen() {
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const [predictions, setPredictions] = useState({});

  const handlePredictionChange = (matchId, field, value) => {
    setPredictions(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [field]: value
      }
    }));
  };

  const submitPrediction = (matchId) => {
    const prediction = predictions[matchId];
    if (prediction && prediction.homeScore && prediction.awayScore) {
      // Handle prediction submission
      console.log(`Prediction submitted for match ${matchId}:`, prediction);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Predictions</Text>
      
      {/* Tab Selector */}
      <View style={styles.tabSelector}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Upcoming' && styles.activeTabButton
          ]}
          onPress={() => setSelectedTab('Upcoming')}
        >
          <Text style={[
            styles.tabButtonText,
            selectedTab === 'Upcoming' && styles.activeTabButtonText
          ]}>Upcoming</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Leaderboard' && styles.activeTabButton
          ]}
          onPress={() => setSelectedTab('Leaderboard')}
        >
          <Text style={[
            styles.tabButtonText,
            selectedTab === 'Leaderboard' && styles.activeTabButtonText
          ]}>Leaderboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'History' && styles.activeTabButton
          ]}
          onPress={() => setSelectedTab('History')}
        >
          <Text style={[
            styles.tabButtonText,
            selectedTab === 'History' && styles.activeTabButtonText
          ]}>History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'Upcoming' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today</Text>
            
            {upcomingMatches.map((match) => (
              <View key={match.id} style={styles.matchCard}>
                <Text style={styles.matchTime}>{match.date} | {match.time}</Text>
                
                <View style={styles.matchInfo}>
                  <View style={styles.teamContainer}>
                    <FlagIcon country={match.homeTeam} size={32} />
                    <Text style={styles.teamName}>{match.homeTeam}</Text>
                  </View>
                  
                  <View style={styles.predictionContainer}>
                    <TextInput
                      style={styles.scoreInput}
                      placeholder="U"
                      placeholderTextColor="#9CA3AF"
                      value={predictions[match.id]?.homeScore || ''}
                      onChangeText={(value) => handlePredictionChange(match.id, 'homeScore', value)}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                    <Text style={styles.vs}>-</Text>
                    <TextInput
                      style={styles.scoreInput}
                      placeholder="U"
                      placeholderTextColor="#9CA3AF"
                      value={predictions[match.id]?.awayScore || ''}
                      onChangeText={(value) => handlePredictionChange(match.id, 'awayScore', value)}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  </View>
                  
                  <View style={styles.teamContainer}>
                    <Text style={styles.teamName}>{match.awayTeam}</Text>
                    <FlagIcon country={match.awayTeam} size={32} />
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={() => submitPrediction(match.id)}
                >
                  <Text style={styles.submitButtonText}>Submit Prediction</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {selectedTab === 'Leaderboard' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Leaderboard</Text>
            
            <View style={styles.leaderboardCard}>
              <View style={styles.leaderboardHeader}>
                <Text style={styles.leaderboardHeaderText}>Rank</Text>
                <Text style={styles.leaderboardHeaderText}>Player</Text>
                <Text style={styles.leaderboardHeaderText}>Points</Text>
              </View>
              
              {[
                { rank: 1, name: 'Ahmed M.', points: 156 },
                { rank: 2, name: 'Fatima K.', points: 142 },
                { rank: 3, name: 'Youssef B.', points: 138 },
                { rank: 4, name: 'Aicha R.', points: 132 },
                { rank: 5, name: 'Omar T.', points: 128 },
              ].map((player) => (
                <View key={player.rank} style={styles.leaderboardRow}>
                  <Text style={styles.leaderboardRank}>{player.rank}</Text>
                  <Text style={styles.leaderboardName}>{player.name}</Text>
                  <Text style={styles.leaderboardPoints}>{player.points}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {selectedTab === 'History' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prediction History</Text>
            
            <View style={styles.historyCard}>
              <Text style={styles.historyText}>Your prediction history will appear here once matches are completed.</Text>
            </View>
          </View>
        )}
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
  tabSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#E53E3E',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activeTabButtonText: {
    color: '#E53E3E',
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
  matchTime: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
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
  predictionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  scoreInput: {
    backgroundColor: '#3e1415',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3e1415',
  },
  vs: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginHorizontal: 8,
  },
  submitButton: {
    backgroundColor: '#E53E3E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  leaderboardCard: {
    backgroundColor: '#2b0d0d',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3e1415',
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3e1415',
    marginBottom: 12,
  },
  leaderboardHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  leaderboardRank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  leaderboardName: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  leaderboardPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53E3E',
    flex: 1,
    textAlign: 'center',
  },
  historyCard: {
    backgroundColor: '#2b0d0d',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3e1415',
  },
  historyText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});