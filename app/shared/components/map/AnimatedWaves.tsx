import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export function AnimatedWaves() {
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de onda 1
    Animated.loop(
      Animated.sequence([
        Animated.timing(wave1, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(wave1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Onda 2 (con delay)
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave2, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(wave2, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 666);

    // Onda 3 (con más delay)
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave3, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(wave3, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 1333);
  }, []);

  const createWaveStyle = (animValue: Animated.Value) => ({ 
    transform: [
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 2], // Crece de 50% a 200%
        }),
      },
    ],
    opacity: animValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.8, 0.4, 0], // Se desvanece
    }),
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wave, createWaveStyle(wave1)]} />
      <Animated.View style={[styles.wave, createWaveStyle(wave2)]} />
      <Animated.View style={[styles.wave, createWaveStyle(wave3)]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#42A5F5',
    backgroundColor: 'transparent',
  },
});
