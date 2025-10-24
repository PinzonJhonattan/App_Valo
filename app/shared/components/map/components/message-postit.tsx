import {
    Caveat_400Regular,
    Caveat_700Bold
} from '@expo-google-fonts/caveat';
import { IndieFlower_400Regular } from '@expo-google-fonts/indie-flower';
import { PatrickHand_400Regular } from '@expo-google-fonts/patrick-hand';
import { useFonts } from 'expo-font';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

export function MessagePostit({ 
  message, 
  fontStyle = 'caveat' // 'caveat', 'patrick', o 'indie'
}: { 
  message: string;
  fontStyle?: 'caveat' | 'patrick' | 'indie';
}) {
  let [fontsLoaded] = useFonts({
    Caveat_400Regular,
    Caveat_700Bold,
    PatrickHand_400Regular,
    IndieFlower_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#fbbf24" />
      </View>
    );
  }

  const getFontFamily = () => {
    switch (fontStyle) {
      case 'patrick':
        return 'PatrickHand_400Regular';
      case 'indie':
        return 'IndieFlower_400Regular';
      default:
        return 'Caveat_400Regular';
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('@assets/img-messages/postit1.png')} 
        style={styles.image} 
      />
      
      <View style={styles.textContainer}>
        <Text 
          style={[styles.handwrittenText, { fontFamily: getFontFamily() }]} 
          numberOfLines={8}
        >
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    width: '75%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  handwrittenText: {
    fontSize: 22,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 32,
    transform: [{ rotate: '-1.5deg' }],
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 0.5,
    letterSpacing: 0.5,
  },
});