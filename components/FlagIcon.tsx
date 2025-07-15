import React from 'react';
import { View, StyleSheet } from 'react-native';

interface FlagIconProps {
  country: string;
  size?: number;
}

export default function FlagIcon({ country, size = 40 }: FlagIconProps) {
  const getFlag = (countryName: string) => {
    const flags: { [key: string]: JSX.Element } = {
      'Morocco': (
        <View style={[styles.flag, { width: size, height: size * 0.67 }]}>
          <View style={[styles.flagBackground, { backgroundColor: '#C1272D' }]} />
          <View style={[styles.star, { 
            top: size * 0.2, 
            left: size * 0.35,
            width: size * 0.3,
            height: size * 0.3
          }]}>
            <View style={styles.starShape} />
          </View>
        </View>
      ),
      'South Africa': (
        <View style={[styles.flag, { width: size, height: size * 0.67 }]}>
          <View style={[styles.flagBackground, { backgroundColor: '#007A4D' }]} />
          <View style={[styles.triangleFlag, { 
            borderRightColor: '#007A4D',
            borderTopWidth: size * 0.335,
            borderBottomWidth: size * 0.335,
            borderRightWidth: size * 0.4
          }]} />
          <View style={[styles.yellowStripe, { 
            backgroundColor: '#FFB612',
            height: size * 0.1,
            top: size * 0.285
          }]} />
          <View style={[styles.blueStripe, { 
            backgroundColor: '#002395',
            height: size * 0.1,
            top: size * 0.1
          }]} />
          <View style={[styles.redStripe, { 
            backgroundColor: '#DE3831',
            height: size * 0.1,
            bottom: size * 0.1
          }]} />
        </View>
      ),
      'Nigeria': (
        <View style={[styles.flag, { width: size, height: size * 0.67 }]}>
          <View style={[styles.flagThird, { backgroundColor: '#008751', left: 0 }]} />
          <View style={[styles.flagThird, { backgroundColor: '#FFFFFF', left: size * 0.33 }]} />
          <View style={[styles.flagThird, { backgroundColor: '#008751', left: size * 0.66 }]} />
        </View>
      ),
      'Egypt': (
        <View style={[styles.flag, { width: size, height: size * 0.67 }]}>
          <View style={[styles.flagStripe, { backgroundColor: '#CE1126', top: 0 }]} />
          <View style={[styles.flagStripe, { backgroundColor: '#FFFFFF', top: size * 0.22 }]} />
          <View style={[styles.flagStripe, { backgroundColor: '#000000', top: size * 0.44 }]} />
          <View style={[styles.eagle, { 
            top: size * 0.25,
            left: size * 0.4,
            width: size * 0.2,
            height: size * 0.15,
            backgroundColor: '#FFD700'
          }]} />
        </View>
      ),
      'Senegal': (
        <View style={[styles.flag, { width: size, height: size * 0.67 }]}>
          <View style={[styles.flagThird, { backgroundColor: '#00853F', left: 0 }]} />
          <View style={[styles.flagThird, { backgroundColor: '#FDEF42', left: size * 0.33 }]} />
          <View style={[styles.flagThird, { backgroundColor: '#E31B23', left: size * 0.66 }]} />
          <View style={[styles.star, { 
            top: size * 0.2, 
            left: size * 0.4,
            width: size * 0.2,
            height: size * 0.2
          }]}>
            <View style={[styles.starShape, { backgroundColor: '#00853F' }]} />
          </View>
        </View>
      ),
      'Cameroon': (
        <View style={[styles.flag, { width: size, height: size * 0.67 }]}>
          <View style={[styles.flagThird, { backgroundColor: '#007A5E', left: 0 }]} />
          <View style={[styles.flagThird, { backgroundColor: '#CE1126', left: size * 0.33 }]} />
          <View style={[styles.flagThird, { backgroundColor: '#FCD116', left: size * 0.66 }]} />
          <View style={[styles.star, { 
            top: size * 0.2, 
            left: size * 0.4,
            width: size * 0.2,
            height: size * 0.2
          }]}>
            <View style={[styles.starShape, { backgroundColor: '#FCD116' }]} />
          </View>
        </View>
      ),
      'Mali': (
        <View style={[styles.flag, { width: size, height: size * 0.67 }]}>
          <View style={[styles.flagThird, { backgroundColor: '#14B53A', left: 0 }]} />
          <View style={[styles.flagThird, { backgroundColor: '#FCD116', left: size * 0.33 }]} />
          <View style={[styles.flagThird, { backgroundColor: '#CE1126', left: size * 0.66 }]} />
        </View>
      ),
      'Zambia': (
        <View style={[styles.flag, { width: size, height: size * 0.67 }]}>
          <View style={[styles.flagBackground, { backgroundColor: '#198A00' }]} />
          <View style={[styles.eagle, { 
            top: size * 0.1,
            right: size * 0.1,
            width: size * 0.25,
            height: size * 0.2,
            backgroundColor: '#EF7D00'
          }]} />
        </View>
      ),
      'Comoros': (
        <View style={[styles.flag, { width: size, height: size * 0.67 }]}>
          <View style={[styles.triangleFlag, { 
            borderRightColor: '#3D8E33',
            borderTopWidth: size * 0.335,
            borderBottomWidth: size * 0.335,
            borderRightWidth: size * 0.3
          }]} />
          <View style={[styles.flagStripe, { backgroundColor: '#FFFF00', top: 0, left: size * 0.3 }]} />
          <View style={[styles.flagStripe, { backgroundColor: '#FFFFFF', top: size * 0.17, left: size * 0.3 }]} />
          <View style={[styles.flagStripe, { backgroundColor: '#CE1126', top: size * 0.34, left: size * 0.3 }]} />
          <View style={[styles.flagStripe, { backgroundColor: '#3A75C4', top: size * 0.51, left: size * 0.3 }]} />
        </View>
      )
    };

    return flags[countryName] || (
      <View style={[styles.flag, { width: size, height: size * 0.67, backgroundColor: '#374151' }]} />
    );
  };

  return (
    <View style={styles.container}>
      {getFlag(country)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  flag: {
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#4B5563',
    position: 'relative',
  },
  flagBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flagThird: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '33.33%',
  },
  flagStripe: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '25%',
  },
  triangleFlag: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  star: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starShape: {
    width: '100%',
    height: '100%',
    backgroundColor: '#14B53A',
    transform: [{ rotate: '0deg' }],
  },
  eagle: {
    position: 'absolute',
    borderRadius: 2,
  },
  yellowStripe: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  blueStripe: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  redStripe: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});