import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlagIcon from '@/components/FlagIcon';
import Flag from 'react-world-flags';

const groupsData = {
  'All': [
    // Group A
    { name: 'Morocco', flag: 'ma', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'A' },
    { name: 'Mali', flag: 'ml', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'A' },
    { name: 'Zambia', flag: 'zm', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'A' },
    { name: 'Comoros', flag: 'km', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'A' },
    // Group B
    { name: 'Egypt', flag: 'eg', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'B' },
    { name: 'South Africa', flag: 'za', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'B' },
    { name: 'Angola', flag: 'ao', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'B' },
    { name: 'Zimbabwe', flag: 'zw', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'B' },
    // Group C
    { name: 'Nigeria', flag: 'ng', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'C' },
    { name: 'Tunisia', flag: 'tn', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'C' },
    { name: 'Uganda', flag: 'ug', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'C' },
    { name: 'Tanzania', flag: 'tz', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'C' },
    // Group D
    { name: 'Senegal', flag: 'sn', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'D' },
    { name: 'DR Congo', flag: 'cd', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'D' },
    { name: 'Benin', flag: 'bj', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'D' },
    { name: 'Botswana', flag: 'bw', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'D' },
    // Group E
    { name: 'Algeria', flag: 'dz', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'E' },
    { name: 'Burkina Faso', flag: 'bf', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'E' },
    { name: 'Equatorial Guinea', flag: 'gq', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'E' },
    { name: 'Sudan', flag: 'sd', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'E' },
    // Group F
    { name: 'Ivory Coast', flag: 'ci', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'F' },
    { name: 'Cameroon', flag: 'cm', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'F' },
    { name: 'Gabon', flag: 'ga', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'F' },
    { name: 'Mozambique', flag: 'mz', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, group: 'F' },
  ],
  'Group A': [
    { name: 'Morocco', flag: 'ma', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Mali', flag: 'ml', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Zambia', flag: 'zm', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Comoros', flag: 'km', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
  'Group B': [
    { name: 'Egypt', flag: 'eg', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'South Africa', flag: 'za', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Angola', flag: 'ao', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Zimbabwe', flag: 'zw', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
  'Group C': [
    { name: 'Nigeria', flag: 'ng', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Tunisia', flag: 'tn', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Uganda', flag: 'ug', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Tanzania', flag: 'tz', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
  'Group D': [
    { name: 'Senegal', flag: 'sn', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'DR Congo', flag: 'cd', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Benin', flag: 'bj', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Botswana', flag: 'bw', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
  'Group E': [
    { name: 'Algeria', flag: 'dz', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Burkina Faso', flag: 'bf', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Equatorial Guinea', flag: 'gq', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Sudan', flag: 'sd', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
  'Group F': [
    { name: 'Ivory Coast', flag: 'ci', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Cameroon', flag: 'cm', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Gabon', flag: 'ga', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { name: 'Mozambique', flag: 'mz', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
};

export default function GroupsScreen() {
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedView, setSelectedView] = useState('Groups');

  const groups = Object.keys(groupsData);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Groups</Text>
      
      {/* View Selector */}
      <View style={styles.viewSelector}>
        <TouchableOpacity
          style={[
            styles.viewButton,
            selectedView === 'Groups' && styles.activeViewButton
          ]}
          onPress={() => setSelectedView('Groups')}
        >
          <Text style={[
            styles.viewButtonText,
            selectedView === 'Groups' && styles.activeViewButtonText
          ]}>Groups</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.viewButton,
            selectedView === 'Knockout' && styles.activeViewButton
          ]}
          onPress={() => setSelectedView('Knockout')}
        >
          <Text style={[
            styles.viewButtonText,
            selectedView === 'Knockout' && styles.activeViewButtonText
          ]}>Knockout</Text>
        </TouchableOpacity>
      </View>

      {/* Group Selector */}
      <View style={styles.groupSelector}>
        <View style={styles.groupRow}>
          {groups.slice(0, 4).map((group) => (
            <TouchableOpacity
              key={group}
              style={[
                styles.groupButton,
                selectedGroup === group && styles.activeGroupButton
              ]}
              onPress={() => setSelectedGroup(group)}
            >
              <Text style={[
                styles.groupButtonText,
                selectedGroup === group && styles.activeGroupButtonText
              ]}>{group}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.groupRow}>
          {groups.slice(4).map((group) => (
            <TouchableOpacity
              key={group}
              style={[
                styles.groupButton,
                selectedGroup === group && styles.activeGroupButton
              ]}
              onPress={() => setSelectedGroup(group)}
            >
              <Text style={[
                styles.groupButtonText,
                selectedGroup === group && styles.activeGroupButtonText
              ]}>{group}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedGroup === 'All' ? (
          // Show all groups
          Object.keys(groupsData).filter(key => key !== 'All').map((groupKey) => (
            <View key={groupKey} style={styles.section}>
              <Text style={styles.sectionTitle}>{groupKey}</Text>
              
              <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.headerCell, styles.teamHeader]}>Team</Text>
                  <Text style={styles.headerCell}>MP</Text>
                  <Text style={styles.headerCell}>GF</Text>
                  <Text style={styles.headerCell}>GA</Text>
                  <Text style={styles.headerCell}>Pts</Text>
                </View>
                
                {/* Table Rows */}
                {groupsData[groupKey].map((team, index) => (
                  <View key={team.name} style={styles.tableRow}>
                    <View style={styles.teamCell}>
                      <Text style={styles.position}>{index + 1}</Text>
                      <FlagIcon country={team.name} size={24} />
                      <Flag code={team.flag} style={{ width: 32, height: 32, margin: '10px' }} />
                      <Text style={styles.teamName}>{team.name}</Text>
                    </View>
                    <Text style={styles.cell}>{team.mp}</Text>
                    <Text style={styles.cell}>{team.gf}</Text>
                    <Text style={styles.cell}>{team.ga}</Text>
                    <Text style={[styles.cell, styles.pointsCell]}>{team.pts}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          // Show single group
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{selectedGroup}</Text>
            
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, styles.teamHeader]}>Team</Text>
                <Text style={styles.headerCell}>MP</Text>
                <Text style={styles.headerCell}>GF</Text>
                <Text style={styles.headerCell}>GA</Text>
                <Text style={styles.headerCell}>Pts</Text>
              </View>
              
              {/* Table Rows */}
              {groupsData[selectedGroup].map((team, index) => (
                <View key={team.name} style={styles.tableRow}>
                  <View style={styles.teamCell}>
                    <Text style={styles.position}>{index + 1}</Text>
                    <FlagIcon country={team.name} size={24} />
                    <Text style={styles.teamName}>{team.name}</Text>
                  </View>
                  <Text style={styles.cell}>{team.mp}</Text>
                  <Text style={styles.cell}>{team.gf}</Text>
                  <Text style={styles.cell}>{team.ga}</Text>
                  <Text style={[styles.cell, styles.pointsCell]}>{team.pts}</Text>
                </View>
              ))}
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
  viewSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  viewButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeViewButton: {
    borderBottomColor: '#E53E3E',
  },
  viewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activeViewButtonText: {
    color: '#E53E3E',
  },
  groupSelector: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  groupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  groupButton: {
    backgroundColor: '#2b0d0d',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#3e1415',
    alignItems: 'center',
  },
  activeGroupButton: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  groupButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  activeGroupButtonText: {
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
    width: 40,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    width: 24,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  cell: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    width: 40,
  },
  pointsCell: {
    fontWeight: 'bold',
    color: '#E53E3E',
  },
});