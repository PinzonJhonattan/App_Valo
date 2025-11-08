import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../../shared/components/map/map'; // 👈 Importa tu componente Map
import { ThemedView } from '../../shared/components/themed-view';

const GlobalScreen = React.memo(function GlobalScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ThemedView style={styles.container}>
        {/* Mapa ocupa el resto de la pantalla */}
        <View style={styles.mapContainer}>
          <Map />
        </View>
      </ThemedView>
    </SafeAreaView>
  );
});

export default GlobalScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    zIndex: 1,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: 8,
  },
  mapContainer: {
    flex: 1,
    marginBottom: -40, 
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100, // 👈 Por encima del tab bar
    left: 20,
    right: 20,
    zIndex: 2,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});