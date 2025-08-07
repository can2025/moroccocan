import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Modal, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

const flags = [
  { code: 'ar', image: require('../assets/flags/ar.png') },
  { code: 'en', image: require('../assets/flags/en.png') },
  { code: 'fr', image: require('../assets/flags/fr.png') },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const currentFlag = flags.find(f => f.code === i18n.language) || flags[0];

  const handleChangeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.flagButton}>
        <Image source={currentFlag.image} style={styles.flagImage} />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          {flags.map(flag => (
            <Pressable
              key={flag.code}
              onPress={() => handleChangeLanguage(flag.code)}
              style={styles.dropdownItem}
            >
              <Image source={flag.image} style={styles.flagImage} />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 100,
  },
  flagButton: {
    padding: 4,
    backgroundColor: 'rgba(25,5,4,0.8)',
    borderRadius: 20,
  },
  flagImage: {
    width: 28,
    height: 20,
    borderRadius: 4,
  },
  dropdown: {
    marginTop: 8,
    backgroundColor: 'rgba(25,5,4,0.95)',
    borderRadius: 10,
    padding: 6,
  },
  dropdownItem: {
    paddingVertical: 4,
  },
});
