import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface CustomMarkerProps {
  imageUrl: string;
  size?: number;
  onImageLoad?: () => void;
}

export function CustomMarker({ imageUrl, size = 50, onImageLoad }: CustomMarkerProps) {


  const containerSize = size * 3; 

  return (
    <View
      style={{
        width: containerSize,
        height: containerSize,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

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