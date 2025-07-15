import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlagIcon from './FlagIcon';

interface Team {
  name: string;
  flag: string;
  mp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
}

interface GroupTableProps {
  teams: Team[];
  groupName: string;
}

export default function GroupTable({ teams, groupName }: GroupTableProps) {
  const sortedTeams = [...teams].sort((a, b) => {
    if (a.pts !== b.pts) return b.pts - a.pts;
    if (a.gd !== b.gd) return b.gd - a.gd;
    if (a.gf !== b.gf) return b.gf - a.gf;
    return 0;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.groupTitle}>{groupName}</Text>
      
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.teamHeader]}>Team</Text>
          <Text style={styles.headerCell}>MP</Text>
          <Text style={styles.headerCell}>W</Text>
          <Text style={styles.headerCell}>D</Text>
          <Text style={styles.headerCell}>L</Text>
          <Text style={styles.headerCell}>GF</Text>
          <Text style={styles.headerCell}>GA</Text>
          <Text style={styles.headerCell}>GD</Text>
          <Text style={styles.headerCell}>Pts</Text>
        </View>
        
        {sortedTeams.map((team, index) => (
          <View key={team.name} style={styles.tableRow}>
            <View style={styles.teamCell}>
              <Text style={styles.position}>{index + 1}</Text>
              <FlagIcon country={team.name} size={20} />
              <Text style={styles.teamName}>{team.name}</Text>
            </View>
            <Text style={styles.cell}>{team.mp}</Text>
            <Text style={styles.cell}>{team.w}</Text>
            <Text style={styles.cell}>{team.d}</Text>
            <Text style={styles.cell}>{team.l}</Text>
            <Text style={styles.cell}>{team.gf}</Text>
            <Text style={styles.cell}>{team.ga}</Text>
            <Text style={[styles.cell, team.gd > 0 ? styles.positive : team.gd < 0 ? styles.negative : null]}>
              {team.gd > 0 ? '+' : ''}{team.gd}
            </Text>
            <Text style={[styles.cell, styles.pointsCell]}>{team.pts}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  table: {
    backgroundColor: '#2b0d0d',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3e1415',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3e1415',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerCell: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    width: 32,
  },
  teamHeader: {
    flex: 1,
    textAlign: 'left',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#3e1415',
    alignItems: 'center',
  },
  teamCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  position: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    width: 20,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  cell: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    width: 32,
  },
  pointsCell: {
    fontWeight: 'bold',
    color: '#E53E3E',
  },
  positive: {
    color: '#10B981',
  },
  negative: {
    color: '#EF4444',
  },
});