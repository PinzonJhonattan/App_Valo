import React from 'react';
import { StyleSheet, View } from 'react-native';
import Map from '../../shared/components/map/map'; // 👈 Importa tu componente Map
import { ThemedText } from '../../shared/components/themed-text';
import { ThemedView } from '../../shared/components/themed-view';

export default function GlobalScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Global
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Descubre contenido de todo el mundo
        </ThemedText>
      </View>

      {/* Mapa ocupa el resto de la pantalla */}
      <View style={styles.mapContainer}>
        <Map />
      </View>

      {/* Botón opcional flotante sobre el mapa */}
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Ir a Autenticación"
          onPress={() => router.push('/features/auth/login')}
          variant="primary"
          style={styles.button}
        />
      </View> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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