import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Modal,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '../../hooks/use-theme-color';

interface FloatingActionMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function FloatingActionMenu({ visible, onClose }: FloatingActionMenuProps) {
  const tint = useThemeColor({}, 'tint');
  const insets = useSafeAreaInsets();
  
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const button1Anim = useRef(new Animated.Value(0)).current;
  const button2Anim = useRef(new Animated.Value(0)).current;
  const button3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Resetear valores antes de animar
      scaleAnim.setValue(0);
      button1Anim.setValue(0);
      button2Anim.setValue(0);
      button3Anim.setValue(0);

      // Animación de entrada
      Animated.stagger(80, [
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(button1Anim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(button2Anim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(button3Anim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animación de salida rápida
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(button1Anim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(button2Anim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(button3Anim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleAnim, button1Anim, button2Anim, button3Anim]);

  const handleNavigate = (route: string) => {
    // Primero cerrar con animación
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(button1Anim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(button2Anim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(button3Anim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Después de la animación, cerrar y navegar
      onClose();
      setTimeout(() => {
        router.push(route as any);
      }, 50);
    });
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.safeArea}>
        <Pressable style={[styles.overlay, { paddingTop: insets.top, paddingBottom: insets.bottom }]} onPress={onClose}>
          <View style={styles.menuContainer}>
          {/* Botón izquierdo - Post-it/Texto */}
          <Animated.View
            style={[
              styles.menuButton,
              {
                transform: [
                  {
                    translateX: button1Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -90],
                    }),
                  },
                  {
                    translateY: button1Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -25],
                    }),
                  },
                  { scale: button1Anim },
                ],
                opacity: button1Anim,
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: tint }]}
              onPress={() => handleNavigate('/features/create/components/create-postit/create-postit')}         
              activeOpacity={0.8}
            >
              <Ionicons name="document-text-outline" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>

          {/* Botón centro arriba - Dibujo/Editar */}
          <Animated.View
            style={[
              styles.menuButton,
              {
                transform: [
                  {
                    translateY: button2Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -80],
                    }),
                  },
                  { scale: button2Anim },
                ],
                opacity: button2Anim,
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: tint }]}
              onPress={() => handleNavigate('/features/create/components/create-draw/create-draw')}
              activeOpacity={0.8}
            >
              <Ionicons name="create-outline" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>

          {/* Botón derecho - Audio/Micrófono */}
          <Animated.View
            style={[
              styles.menuButton,
              {
                transform: [
                  {
                    translateX: button3Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 90],
                    }),
                  },
                  {
                    translateY: button3Anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -25],
                    }),
                  },
                  { scale: button3Anim },
                ],
                opacity: button3Anim,
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: tint }]}
              onPress={() => handleNavigate('/features/create/components/create-audio/create-audio')}
              activeOpacity={0.8}
            >
              <Ionicons name="mic-outline" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    position: 'absolute',
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});