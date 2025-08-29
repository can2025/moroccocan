import React, { useState, useEffect } from 'react';
import { Platform, View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryFlag from "react-native-country-flag";
import LanguageSelector from '../../components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import env from '../../env';
//@ts-ignore
import BannerBlock from '../../components/BannerBlock';



export default function GroupsScreen() {
  const [groupsData, setGroupsData] = useState<{ [key: string]: any[] }>({});
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedView, setSelectedView] = useState('Groups');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch(`${env.API_BASE_URL}/groups`);
        const data = await res.json();
        // Transform flat array into grouped object
        const grouped: { [key: string]: any[] } = {};
        data.forEach((team: any) => {
          const groupKey = team[`group_${currentLang}`];  // consistent key
          if (!grouped[groupKey]) grouped[groupKey] = [];
          grouped[groupKey].push(team);
        });
        setGroupsData(grouped);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const groups = Object.keys(groupsData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.languages}>
        <LanguageSelector />
      </View>
      <Text style={styles.title}>{t('groups.groups')}</Text>

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
          {/* Add "All" button */}
          <TouchableOpacity
            key="All"
            style={[
              styles.groupButton,
              selectedGroup === 'All' && styles.activeGroupButton
            ]}
            onPress={() => setSelectedGroup('All')}
          >
            <Text style={[
              styles.groupButtonText,
              selectedGroup === 'All' && styles.activeGroupButtonText
            ]}>All</Text>
          </TouchableOpacity>
          {/* Render first 3 groups */}
          {groups.slice(0, 3).map((group) => (
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
          {/* Render remaining groups */}
          {groups.slice(3).map((group) => (
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
      {/* Banner Ad Block */}
      {Platform.OS !== 'web' && (
        <View style={styles.bannerContainer}>
          <BannerBlock />
        </View>
      )}


      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator color="#E53E3E" size="large" style={{ marginTop: 40 }} />
        ) : selectedGroup === 'All' ? (
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
                {groupsData[groupKey]?.map((team, index) => (
                  <View key={team.id} style={styles.tableRow}>
                    <View style={styles.teamCell}>
                      <Text style={styles.position}>{index + 1}</Text>
                      <CountryFlag isoCode={team.flag} size={25} style={styles.flag} />
                      <Text style={styles.teamName}>{team[`name_${currentLang}`]}</Text>
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
              {groupsData[selectedGroup]?.map((team, index) => (
                <View key={team.id} style={styles.tableRow}>
                  <View style={styles.teamCell}>
                    <Text style={styles.position}>{index + 1}</Text>
                    <CountryFlag isoCode={team.flag} size={25} style={styles.flag} />
                    <Text style={styles.teamName}>{team[`name_${currentLang}`]}</Text>
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
  languages: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  viewSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
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
  flag: {
    marginHorizontal: 8, // fallback for older React Native versions
  },
  pointsCell: {
    fontWeight: 'bold',
    color: '#E53E3E',
  },
});