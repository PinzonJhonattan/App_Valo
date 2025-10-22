/**
 * Sistema de colores de la aplicación
 * Cambia estos colores para personalizar toda la app
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Colores principales
    primary: '#4299E1',       // Azul profesional (Tailwind Blue 500)
    secondary: '#E2E8F0',     // Gris claro (Tailwind Gray 200)
    accent: '#E53E3E',       // Rojo para acentos/errores (Tailwind Red 600)
    
    // Colores de estado
    success: '#38A169',       // Verde (Tailwind Green 600)
    warning: '#D69E2E',       // Naranja (Tailwind Orange 600)
    error: '#E53E3E',         // Rojo (Tailwind Red 600)
    info: '#4299E1',           // Azul (Usamos el primario)
    
    // Colores de texto
    text: '#1A202C',         // Gris carbón (Casi negro - Tailwind Gray 900)
    textSecondary: '#4A5568', // Gris oscuro (Tailwind Gray 700)
    textTertiary: '#718096',  // Gris medio (Tailwind Gray 500)
    
    // Colores de fondo
    background: '#F7FAFC',         // Blanco hueso (Tailwind Gray 50)
    backgroundSecondary: '#FFFFFF', // Blanco puro (para tarjetas/superficies)
    backgroundTertiary: '#EDF2F7',  // Gris muy claro (Tailwind Gray 100)
    
    // Colores de bordes
    border: '#CBD5E0',       // Gris claro (Tailwind Gray 400)
    borderLight: '#E2E8F0',     // Gris muy claro (Tailwind Gray 300)
    
    // Colores de componentes
    card: '#FFFFFF',           // Blanco puro
    cardShadow: 'rgba(0, 0, 0, 0.08)', // Sombra sutil para light mode
    
    // Colores de inputs
    inputBackground: '#FFFFFF',
    inputBorder: '#CBD5E0',
    inputPlaceholder: '#718096',
    
    // Botones
    buttonPrimary: '#4299E1',
    buttonPrimaryText: '#FFFFFF', // Texto blanco para buen contraste
    
    // Colores de tabs
    tint: '#4299E1',
    tabIconDefault: '#718096',
    tabIconSelected: '#4299E1',
  },
dark: {
  // Colores principales
  primary: '#4299E1',       // Azul profesional (Tailwind Blue 500)
  secondary: '#1E1E1E',     // Gris oscuro (para fondos secundarios)
  accent: '#E53E3E',       // Rojo para acentos/errores (Tailwind Red 600)
  
  // Colores de estado
  success: '#48BB78',       // Verde (Tailwind Green 500)
  warning: '#F6AD55',       // Naranja (Tailwind Orange 400)
  error: '#E53E3E',         // Rojo (Tailwind Red 600)
  info: '#4299E1',           // Azul (Usamos el primario)
  
  // Colores de texto
  text: '#F5F5F5',         // Blanco (ligeramente apagado)
  textSecondary: '#AAAAAA', // Gris medio (para texto secundario)
  textTertiary: '#757575',  // Gris oscuro (para placeholders/deshabilitado)
  
  // Colores de fondo
  background: '#121212',         // Gris casi negro (Material Design standard)
  backgroundSecondary: '#1E1E1E', // Gris oscuro (para tarjetas/superficies)
  backgroundTertiary: '#2A2A2A',  // Gris medio-oscuro (para inputs/hovers)
  
  // Colores de bordes
  border: '#3A3A3A',
  borderLight: '#4A4A4A',
  
  // Colores de componentes
  card: '#1E1E1E',           // Igual a backgroundSecondary
  cardShadow: 'rgba(0, 0, 0, 0.5)',
  
  // Colores de inputs
  inputBackground: '#2A2A2A',
  inputBorder: '#3A3A3A',
  inputPlaceholder: '#757575',
  
  // Botones
  buttonPrimary: '#4299E1',
  buttonPrimaryText: '#FFFFFF', // Texto blanco para mejor contraste
  
  // Colores de tabs
  tint: '#4299E1',
  tabIconDefault: '#757575',
  tabIconSelected: '#4299E1',
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
