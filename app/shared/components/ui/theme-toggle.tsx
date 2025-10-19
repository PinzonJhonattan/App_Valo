import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/theme-context';
import { useThemeColor } from '../../hooks/use-theme-color';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const primary = useThemeColor({}, 'primary');
  const background = useThemeColor({}, 'backgroundSecondary');
  const text = useThemeColor({}, 'text');

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: background, borderColor: primary }]}
      onPress={toggleTheme}
    >
      <Text style={[styles.text, { color: text }]}>
        {theme === 'dark' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});

