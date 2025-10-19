import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../shared/components/themed-text';
import { ThemedView } from '../../shared/components/themed-view';
import { Button } from '../../shared/components/ui/button';
import { Input } from '../../shared/components/ui/input';

export default function VerifyCodeOTP() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyCode = () => {
    if (!code) {
      Alert.alert('Error', 'Por favor ingresa el código de verificación');
      return;
    }
    
    if (code.length !== 6) {
      Alert.alert('Error', 'El código debe tener 6 dígitos');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Éxito', 'Código verificado correctamente');
    }, 1500);
  };

  const handleResendCode = () => {
    Alert.alert('Éxito', 'Código reenviado');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Verificar Código</ThemedText>
      
      <ThemedText style={styles.description}>
        Ingresa el código de 6 dígitos que enviamos a tu correo electrónico.
      </ThemedText>
      
      <View style={styles.form}>
        <Input
          label="Código de verificación"
          placeholder="000000"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
        />
        
        <Button
          title="Verificar Código"
          onPress={handleVerifyCode}
          variant="primary"
          loading={loading}
        />
        
        <Button
          title="Reenviar Código"
          onPress={handleResendCode}
          variant="outline"
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
