import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface AnimatedWavesProps {
  size?: number;
}

export function AnimatedWaves({ size = 50 }: AnimatedWavesProps) {
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createWaveAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const wave1Animation = createWaveAnimation(wave1, 0);
    const wave2Animation = createWaveAnimation(wave2, 666);
    const wave3Animation = createWaveAnimation(wave3, 1333);

    wave1Animation.start();
    wave2Animation.start();
    wave3Animation.start();

    return () => {
      wave1Animation.stop();
      wave2Animation.stop();
      wave3Animation.stop();
    };
  }, []);

  const createWaveStyle = (animValue: Animated.Value) => ({
    transform: [
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 2.5],
        }),
      },
    ],
    opacity: animValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.5, 0.25, 0],
    }),
  });

  const containerSize = size * 3; // Contenedor 3x más grande para las ondas expandidas

  return (
    <View
      style={{
        width: containerSize,
        height: containerSize,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      pointerEvents="none"
    >
      <Animated.View
        style={[
          styles.wave,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          createWaveStyle(wave1),
        ]}
      />
      <Animated.View
        style={[
          styles.wave,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          createWaveStyle(wave2),
        ]}
      />
      <Animated.View
        style={[
          styles.wave,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          createWaveStyle(wave3),
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wave: {
    position: 'absolute',
    backgroundColor: 'rgba(250, 126, 30, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(250, 126, 30, 0.4)',
  },
});