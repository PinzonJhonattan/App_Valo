import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../shared/components/themed-text';
import { ThemedView } from '../../shared/components/themed-view';
import { Button } from '../../shared/components/ui/button';
import { Input } from '../../shared/components/ui/input';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Éxito', 'Se ha enviado un enlace de recuperación a tu correo');
    }, 1500);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Recuperar Contraseña</ThemedText>
      
      <ThemedText style={styles.description}>
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </ThemedText>
      
      <View style={styles.form}>
        <Input
          label="Correo electrónico"
          placeholder="tu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Button
          title="Enviar Enlace"
          onPress={handleForgotPassword}
          variant="error"
          loading={loading}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.7,
  },
  form: {
    gap: 8,
  },
});
