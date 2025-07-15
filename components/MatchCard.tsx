import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';
import FlagIcon from './FlagIcon';

interface MatchCardProps {
  match: {
    id: number;
    homeTeam: string;
    awayTeam: string;
    homeFlag: string;
    awayFlag: string;
    date: string;
    time: string;
    venue: string;
    city: string;
    homeScore?: number;
    awayScore?: number;
    isLive?: boolean;
    minute?: string;
  };
  onPress?: () => void;
}

export default function MatchCard({ match, onPress }: MatchCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {match.isLive && (
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      )}
      
      <View style={styles.matchInfo}>
        <View style={styles.teamContainer}>
          <FlagIcon country={match.homeTeam} size={32} />
          <Text style={styles.teamName}>{match.homeTeam}</Text>
          {match.homeScore !== undefined && (
            <Text style={styles.score}>{match.homeScore}</Text>
          )}
        </View>
        
        <View style={styles.matchCenter}>
          {match.isLive ? (
            <Text style={styles.minute}>{match.minute}</Text>
          ) : (
            <Text style={styles.matchTime}>{match.time}</Text>
          )}
          <Text style={styles.vs}>
            {match.homeScore !== undefined ? '-' : 'vs'}
          </Text>
          {!match.isLive && (
            <Text style={styles.matchDate}>{match.date}</Text>
          )}
        </View>
        
        <View style={styles.teamContainer}>
          {match.awayScore !== undefined && (
            <Text style={styles.score}>{match.awayScore}</Text>
          )}
          <Text style={styles.teamName}>{match.awayTeam}</Text>
          <FlagIcon country={match.awayTeam} size={32} />
        </View>
      </View>
      
      <View style={styles.venueInfo}>
        <MapPin size={14} color="#9CA3AF" />
        <Text style={styles.venue}>{match.venue}, {match.city}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
});