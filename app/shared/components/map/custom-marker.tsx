import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

interface CustomMarkerProps {
  imageUrl: string;
  size?: number;
  onImageLoad?: () => void;
}

export function CustomMarker({ imageUrl, size = 50, onImageLoad }: CustomMarkerProps) {
  // Animaciones para las 3 ondas
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Función para crear la animación de cada onda
    const createWaveAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 2000, // 2 segundos para expandirse
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 0, // Reset instantáneo
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Iniciar las 3 ondas con diferentes delays
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

  // Estilo para cada onda (escala y opacidad)
  const createWaveStyle = (animValue: Animated.Value) => ({
    transform: [
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 2.5], // Crece hasta 2.5x
        }),
      },
    ],
    opacity: animValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.5, 0.25, 0], // Se desvanece mientras crece
    }),
  });

  const containerSize = size * 3; // Espacio para las ondas expandidas

  return (
    <View
      style={{
        width: containerSize,
        height: containerSize,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 3 Ondas animadas que se expanden */}
      {/* <Animated.View
        style={[
          styles.wave,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          createWaveStyle(wave1),
        ]}
      /> */}
      {/* <Animated.View
        style={[
          styles.wave,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          createWaveStyle(wave2),
        ]}
      /> */}
      {/* <Animated.View
        style={[
          styles.wave,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          createWaveStyle(wave3),
        ]}
      /> */}

      {/* Marcador principal (círculo con imagen) */}
      <View style={{ width: size, height: size, position: 'absolute' }}>
        <LinearGradient
          colors={['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradientBorder,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          <View
            style={[
              styles.innerWhiteBorder,
              {
                width: size - 4,
                height: size - 4,
                borderRadius: (size - 4) / 2,
              },
            ]}
          >
            <Image
              source={{ uri: imageUrl }}
              style={[
                styles.image,
                {
                  width: size - 8,
                  height: size - 8,
                  borderRadius: (size - 8) / 2,
                },
              ]}
              onLoad={onImageLoad}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 /*  wave: {
    position: 'absolute',
    backgroundColor: 'rgba(250, 126, 30, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(250, 126, 30, 0.4)',
  }, */
  gradientBorder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerWhiteBorder: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
});