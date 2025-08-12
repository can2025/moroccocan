import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LanguageSelector from '../../components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n'; // Import the i18n instance directly
import env from '../../env'; 


type NewsItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  content: string;
};


type RootStackParamList = {
  newsDetails: NewsItem;
  // add other routes here if needed
};

export default function NewsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const currentLang = i18n.language;

  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${env.API_BASE_URL}/news`);
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.languages}>
                <LanguageSelector />
      </View>
      <Text style={styles.title}>{t('news.title')}</Text>
      
      <FlatList
        data={news}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.newsItem}
            onPress={() => navigation.navigate('newsDetails', { ...item })}
          >
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <View style={styles.newsTextContainer}>
              <Text style={styles.newsTitle}>{item[`title_${currentLang}`]}</Text>
              <Text style={styles.newsCategory}>{item.category}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190504',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 20,
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b0d0d',
    borderRadius: 14,
    marginBottom: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  languages: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  newsImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 14,
    backgroundColor: '#333',
  },
  newsTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  newsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  newsCategory: {
    color: '#4ade80',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  newsDate: {
    color: '#aaa',
    fontSize: 12,
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  flagButton: {
    marginHorizontal: 8,
  },
  flagImage: {
    width: 32,
    height: 32,
  },
});