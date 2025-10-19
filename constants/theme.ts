/**
 * Sistema de colores de la aplicación
 * Cambia estos colores para personalizar toda la app
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Colores principales
    primary: '#2D2D2D',        // Negro del logo y botones
    secondary: '#E8F1F0',      // Verde agua claro de fondo
    accent: '#FF6B6B',         // Rojo/coral de los enlaces
    
    // Colores de estado
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#FF6B6B',          // Rojo de "Inicia sesión"
    info: '#2196F3',
    
    // Colores de texto
    text: '#2D2D2D',           // Negro principal
    textSecondary: '#6B6B6B',  // Gris del texto secundario
    textTertiary: '#9E9E9E',   // Gris claro de placeholders
    
    // Colores de fondo
    background: '#E8F1F0',     // Verde agua claro principal
    backgroundSecondary: '#FFFFFF',  // Blanco de inputs y cards
    backgroundTertiary: '#F5F5F5',
    
    // Colores de bordes
    border: '#2D2D2D',         // Negro de los bordes de inputs
    borderLight: '#D1D1D1',
    
    // Colores de componentes
    card: '#FFFFFF',
    cardShadow: 'rgba(0, 0, 0, 0.08)',
    
    // Colores de inputs
    inputBackground: '#FFFFFF',
    inputBorder: '#2D2D2D',
    inputPlaceholder: '#9E9E9E',
    
    // Botones
    buttonPrimary: '#2D2D2D',
    buttonPrimaryText: '#FFFFFF',
    
    // Colores de tabs
    tint: '#2D2D2D',
    tabIconDefault: '#9E9E9E',
    tabIconSelected: '#2D2D2D',
},
dark: {
  // Colores principales
  primary: '#7FB3A0',        // Verde sage suave
  secondary: '#1C2B26',      // Verde casi negro
  accent: '#E57373',         // Coral rojizo para acentos
  
  // Colores de estado
  success: '#66BB6A',
  warning: '#FFB74D',
  error: '#E57373',
  info: '#64B5F6',
  
  // Colores de texto
  text: '#E8F0ED',           // Blanco verdoso
  textSecondary: '#8BA399',  // Verde gris
  textTertiary: '#5A6B63',   // Verde gris oscuro
  
  // Colores de fondo
  background: '#0F1613',     // Verde negruzco (casi negro puro)
  backgroundSecondary: '#1C2B26',  // Verde muy oscuro
  backgroundTertiary: '#27342E',   // Verde oscuro
  
  // Colores de bordes
  border: '#3A4A42',
  borderLight: '#4A5A52',
  
  // Colores de componentes
  card: '#1C2B26',
  cardShadow: 'rgba(0, 0, 0, 0.5)',
  
  // Colores de inputs
  inputBackground: '#27342E',
  inputBorder: '#3A4A42',
  inputPlaceholder: '#5A6B63',
  
  // Botones
  buttonPrimary: '#7FB3A0',
  buttonPrimaryText: '#0F1613',
  
  // Colores de tabs
  tint: '#7FB3A0',
  tabIconDefault: '#5A6B63',
  tabIconSelected: '#7FB3A0',
}
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',  
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
