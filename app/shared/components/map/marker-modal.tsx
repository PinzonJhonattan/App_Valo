import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    PanResponder,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface MarkerData {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  imageUrl: string;
  title: string;
}

interface MarkerModalProps {
  visible: boolean;
  marker: MarkerData | null;
  onClose: () => void;
}

const { height: screenHeight } = Dimensions.get('window');

export function MarkerModal({ visible, marker, onClose }: MarkerModalProps) {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const pan = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    if (visible) {
      pan.setValue(0);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      pan.setValue(0);
      onClose();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isScrolling.current,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return !isScrolling.current && gestureState.dy > 5;
      },
      onPanResponderGrant: () => {
        pan.setOffset(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        
        if (gestureState.dy > 150 || gestureState.vy > 0.5) {
          handleClose();
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
            tension: 80,
            friction: 10,
          }).start();
        }
      },
    })
  ).current;

  if (!marker) return null;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={handleClose}
        />
        
        <Animated.View 
          style={[
            styles.modalContainer,
            { 
              transform: [
                { 
                  translateY: Animated.add(
                    slideAnim,
                    pan.interpolate({
                      inputRange: [0, screenHeight],
                      outputRange: [0, screenHeight],
                      extrapolate: 'clamp',
                    })
                  )
                }
              ] 
            }
          ]}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* Barra de arrastre - Solo aquí se puede arrastrar */}
            <View 
              style={styles.dragIndicatorContainer}
              {...panResponder.panHandlers}
            >
              <View style={styles.dragIndicator} />
            </View>

            {/* Contenido con scroll */}
            <ScrollView 
              ref={scrollViewRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              bounces={true}
              scrollEventThrottle={16}
              onScrollBeginDrag={() => {
                isScrolling.current = true;
              }}
              onScrollEndDrag={() => {
                isScrolling.current = false;
              }}
              onMomentumScrollBegin={() => {
                isScrolling.current = true;
              }}
              onMomentumScrollEnd={() => {
                isScrolling.current = false;
              }}
            >
              {/* Imagen destacada con gradiente overlay */}
              <View style={styles.imageSection}>
                <Image
                  source={{ uri: marker.imageUrl }}
                  style={styles.heroImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(15, 23, 42, 0.9)', '#0f172a']}
                  style={styles.imageGradient}
                />
                
                {/* Badge flotante */}
                <View style={styles.badge}>
                  <View style={styles.badgeDot} />
                  <Text style={styles.badgeText}>Activo</Text>
                </View>
              </View>

              {/* Información principal */}
              <View style={styles.mainContent}>
                {/* Título con icono */}
                <View style={styles.titleSection}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>📍</Text>
                  </View>
                  <View style={styles.titleTextContainer}>
                    <Text style={styles.title}>{marker.title}</Text>
                    <Text style={styles.subtitle}>Ubicación verificada</Text>
                  </View>
                </View>

                {/* Coordenadas en cards */}
                <View style={styles.coordinatesContainer}>
                  <View style={styles.coordinateCard}>
                    <Text style={styles.coordinateLabel}>Latitud</Text>
                    <Text style={styles.coordinateValue}>
                      {marker.coordinate.latitude.toFixed(6)}°
                    </Text>
                  </View>
                  <View style={styles.coordinateCard}>
                    <Text style={styles.coordinateLabel}>Longitud</Text>
                    <Text style={styles.coordinateValue}>
                      {marker.coordinate.longitude.toFixed(6)}°
                    </Text>
                  </View>
                </View>

                {/* Información adicional */}
                <View style={styles.infoSection}>
                  <InfoItem icon="🕒" label="Horario" value="Abierto 24/7" />
                  <InfoItem icon="📏" label="Distancia" value="2.5 km" />
                  <InfoItem icon="⭐" label="Calificación" value="4.8/5.0" />
                </View>

                {/* Botones de acción */}
                <View style={styles.actionsContainer}>
                  <TouchableOpacity style={styles.primaryButton}>
                    <LinearGradient
                      colors={['#6366f1', '#8b5cf6', '#d946ef']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.buttonGradient}
                    >
                      <Text style={styles.primaryButtonText}>🧭 Navegar</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <View style={styles.secondaryButtons}>
                    <TouchableOpacity style={styles.secondaryButton}>
                      <Text style={styles.secondaryButtonIcon}>📞</Text>
                      <Text style={styles.secondaryButtonText}>Llamar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton}>
                      <Text style={styles.secondaryButtonIcon}>📤</Text>
                      <Text style={styles.secondaryButtonText}>Compartir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton}>
                      <Text style={styles.secondaryButtonIcon}>💾</Text>
                      <Text style={styles.secondaryButtonText}>Guardar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Botón cerrar flotante */}
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={handleClose}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

// Componente auxiliar para items de información
function InfoItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: screenHeight * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 20,
  },
  safeArea: {
    flex: 1,
  },
  dragIndicatorContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: '#475569',
    borderRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageSection: {
    position: 'relative',
    width: '100%',
    height: 280,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  badge: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  mainContent: {
    padding: 24,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  icon: {
    fontSize: 28,
  },
  titleTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  coordinatesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  coordinateCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  coordinateLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 6,
    fontWeight: '500',
  },
  coordinateValue: {
    fontSize: 16,
    color: '#f1f5f9',
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  infoSection: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIcon: {
    fontSize: 24,
    width: 32,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: '#f1f5f9',
    fontWeight: '600',
  },
  actionsContainer: {
    gap: 16,
    marginBottom: 20,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    gap: 4,
  },
  secondaryButtonIcon: {
    fontSize: 18,
  },
  secondaryButtonText: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButtonText: {
    color: '#f1f5f9',
    fontSize: 20,
    fontWeight: '600',
  },
});