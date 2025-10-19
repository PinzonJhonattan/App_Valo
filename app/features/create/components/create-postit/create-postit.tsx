import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '../../../../shared/components/themed-text';
import { ThemedView } from '../../../../shared/components/themed-view';

export default function CreatePostit() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Create Postit
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Crea notas y recordatorios
        </ThemedText>
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
});