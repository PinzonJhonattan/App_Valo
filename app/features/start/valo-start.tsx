import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../shared/components/themed-text';

const { height } = Dimensions.get('window');

export default function SplashScreen() {
  useEffect(() => {
    // Navegar automáticamente después de 2 segundos
    const timer = setTimeout(() => {
      router.replace('/features/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#ADC5C6']}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.content}>
        <ThemedText type="title" style={styles.logo}>
          Valo
        </ThemedText>
        
        <View style={styles.footer}>
          <ThemedText style={styles.tagline}>
            Tu mundo habla
          </ThemedText>
          <ThemedText style={styles.tagline}>
            descubre lo que te dice
          </ThemedText>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    fontSize: 72,
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: -2,
    color: '#2D2D2D',
    marginBottom: height * 0.3,
    padding: 20,
    
  },
  footer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2D2D2D',
    opacity: 0.9,
    lineHeight: 22,
  },
});