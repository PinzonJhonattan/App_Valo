import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '../../../../shared/components/themed-text';
import { ThemedView } from '../../../../shared/components/themed-view';
import { Button } from '../../../../shared/components/ui/button';

export default function CreateAudio() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Create Audio
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Crea contenido de audio
        </ThemedText>
        
        <Button
          title="Ir a Autenticación"
          onPress={() => router.push('../../features/auth/login')}
          variant="primary"
          style={styles.button}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
});




