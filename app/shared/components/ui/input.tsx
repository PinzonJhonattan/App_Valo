import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { useThemeColor } from '../../hooks/use-theme-color';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  const border = useThemeColor({}, 'border');
  const borderLight = useThemeColor({}, 'borderLight');
  const text = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const errorColor = useThemeColor({}, 'error');
  const background = useThemeColor({}, 'background');

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: text }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error ? errorColor : borderLight,
            color: text,
            backgroundColor: background,
          },
          style,
        ]}
        placeholderTextColor={textSecondary}
        {...props}
      />
      {error && (
        <Text style={[styles.error, { color: errorColor }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    minHeight: 50,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
});

