import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../shared/components/themed-text';
import { ThemedView } from '../../shared/components/themed-view';
import { Button } from '../../shared/components/ui/button';
import { ThemeToggle } from '../../shared/components/ui/theme-toggle';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemeToggle />
          <ThemedText type="title" style={styles.title}>
            Bienvenido
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Selecciona una opción para comenzar
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Autenticación
          </ThemedText>

          button icono
          <Button
            title="start"
            onPress={() => router.push('/features/start/valo-start')}
            variant="primary"
            style={styles.button}
          />
          
          <Button
            title="Iniciar Sesión"
            onPress={() => router.push('/features/auth/login')}
            variant="primary"
            style={styles.button}
          />

          <Button
            title="Registrarse"
            onPress={() => router.push('/features/auth/register')}
            variant="primary"
            style={styles.button}
          />
          
          <Button
            title="Recuperar Contraseña"
            onPress={() => router.push('/features/auth/forgot-password')}
            variant="outline"
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Configuración de Cuenta
          </ThemedText>
          
          <Button
            title="Cambiar Contraseña"
            onPress={() => router.push('/features/auth/change-password')}
            variant="outline"
            style={styles.button}
          />
          
          <Button
            title="Verificar Código"
            onPress={() => router.push('/features/auth/verify-code-otp')}
            variant="outline"
            style={styles.button}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 32,
    alignItems: 'center',
    gap: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 12,
  },
});

