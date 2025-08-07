import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Bookmark } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import LanguageSelector from '../../components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n'; // Import the i18n instance directly




export default function NewsDetailScreen() {
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const currentLang = i18n.language;
  const { category, image, date} = params;
  const content = params[`content_${currentLang}`] || params.content_en || '';
  const title = params[`title_${currentLang}`] || params.title_en || '';



  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
       <LanguageSelector />
       <Text style={styles.title}>{t('news.title')}</Text> 

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/news')} style={styles.backButton}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Image source={{ uri: image as string }} style={styles.heroImage} />

        <View style={styles.contentContainer}>
          <Text style={styles.articleTitle}>{title}</Text>
          <View style={styles.row}>
            <Text style={styles.categoryTag}>{category}</Text>
            <Text style={styles.publishDate}>{date}</Text>
          </View>
          <Text style={styles.articleContent}>{content}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#190504',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 20,
  },
  backButton: {
    padding: 8,
  },
  bookmarkButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: '#333',
  },
  contentContainer: {
    padding: 20,
  },
  articleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 30,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  categoryTag: {
    fontSize: 14,
    color: '#4ade80',
    fontWeight: '600',
    backgroundColor: '#1f4625',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  publishDate: {
    fontSize: 13,
    color: '#aaa',
  },
  articleContent: {
    fontSize: 16,
    color: '#e5e5e5',
    lineHeight: 24,
    marginBottom: 20,
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