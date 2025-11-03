import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useThemeColor } from '../../hooks/use-theme-color';
import { MessageAudio } from './components/message-audio';
import { MessagePostit } from './components/message-postit';
import mockMessageData from './data/data-mcoks-message.json';


interface MessageData {
  messageContent: string;
  messageType: 'TEXT' | 'AUDIO' | 'DRAW';
  messageDate: string;
  messageTime: string;
  dislikes: number;
  messageUuid: string;
  zone: string;
  anonymous: boolean;
  deleted: boolean;
  reactionsCount: {reaction: string; count: number}[];
  usersWhoReacted: string[];
  creator: {
    username: string;
    picture: string;
    sub: string;
    level: number;
  };
}

interface MarkerModalProps {
  visible: boolean;
  messageUuid: string | null;
  onClose: () => void;
}

const { height: screenHeight } = Dimensions.get('window');

export function MarkerModal({ visible, messageUuid, onClose }: MarkerModalProps) {
  const pan = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const isScrolling = useRef(false);
  
  // ✅ Animación para deslizar desde abajo
  const translateYAnim = useRef(new Animated.Value(screenHeight)).current;
  const backgroundOpacityAnim = useRef(new Animated.Value(0)).current;
  
  // Obtener el color primario del tema
  const primaryColor = useThemeColor({}, 'secondary');
  
  // Estado para los datos del mensaje
  const [messageData, setMessageData] = useState<MessageData | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Simular petición al backend cuando se abre el modal
  useEffect(() => {
    if (visible && messageUuid) {
      setLoading(true);
      // Simular petición al backend
      setTimeout(() => {
        // Por ahora usamos el mock, pero aquí iría la petición real
        const mockData = mockMessageData as MessageData[];
        const foundMessage = mockData.find(msg => msg.messageUuid === messageUuid);
        setMessageData(foundMessage || null);
        setLoading(false);
      }, 500);
    }
  }, [visible, messageUuid]);

  useEffect(() => {
    if (visible) {
      // ✅ Animación de apertura - sube desde abajo rápido
      translateYAnim.setValue(screenHeight);
      backgroundOpacityAnim.setValue(0);
      
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 300, // Rápido y fluido
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // ✅ Animación de cierre - baja rápido
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: screenHeight,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateYAnim, backgroundOpacityAnim]);

  const handleClose = () => {
    // ✅ Animación de cierre - baja rápido
    Animated.parallel([
      Animated.timing(translateYAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
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

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      {/* ✅ Overlay animado con opacidad */}
      <Animated.View 
        style={[
          styles.overlay,
          {
            opacity: backgroundOpacityAnim,
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={handleClose}
        />

        {/* ✅ Contenedor centrado con animación de slide desde abajo */}
        <Animated.View 
          style={[
            styles.centeredContainer,
            {
              transform: [{ translateY: translateYAnim }],
            }
          ]}
        >
          {/* ✅ FOTO DE PERFIL SALIENDO CON CÍRCULO DE FONDO */}
          <View style={styles.profilePhotoContainer}>
            {/* Círculo de fondo del color de la tarjeta */}
            <View style={[styles.profileBackgroundCircle, { backgroundColor: primaryColor }]} />
          
            {/* Foto con borde Instagram */}
            <LinearGradient
              colors={['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.profileGradientBorder}
            >
              <View style={styles.profileWhiteBorder}>
                <Image
                  source={{ uri: messageData?.creator.picture || ''}}
                  style={styles.profileImage}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Tarjeta Principal */}
          <View style={styles.mainCard}>
            <View style={[styles.cardGradient, { backgroundColor: primaryColor }]}>
              {/* Espacio para la foto que sobresale */}
              <View style={styles.profileSpacing} />

              {/* Loading o contenido del mensaje */}
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="white" />
                  <Text style={styles.loadingText}>Cargando mensaje...</Text>
                </View>
              ) : messageData ? (
                <>
                  {/* Nombre del usuario */}
                  <View style={styles.profileNameContainer}>
                    <Text style={styles.profileName}>
                      {messageData.anonymous ? 'Usuario anónimo' : messageData.creator.username}
                    </Text>
                  </View>
                  
                  {/* Fecha y hora */}
                  <Text style={styles.profileSubtitle}>
                    {new Date(`${messageData.messageDate}T${messageData.messageTime}`).toLocaleString('es-ES')}
                  </Text>

                  {/* Tipo de mensaje */}
                  <View style={styles.messageTypeContainer}>
                    <Text style={styles.messageTypeText}>
                    {messageData.messageType === 'TEXT' ? (
                      <>
                        <Ionicons name="create-outline" size={15} color="white" />
                        <Text style={styles.labelText}> Post it</Text>
                      </>
                    ) :
                      messageData.messageType === 'AUDIO' ? (
                        <>
                          <Ionicons name="mic-outline" size={15} color="white" />
                          <Text style={styles.labelText}> Audio</Text>
                        </>
                      ) :
                      messageData.messageType === 'DRAW' ? (
                        <>
                          <Ionicons name="pencil-outline" size={15} color="white" />
                          <Text style={styles.labelText}> Draw</Text>
                        </>
                      ) :
                      'Mensaje'} 
                    </Text>
                  </View>
                </>
              ) : (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>No se pudo cargar el mensaje</Text>
                </View>
              )}

              {/* Sección de CONTENIDO DEL MENSAJE */}
              {messageData?.messageType === 'TEXT' && (
                <View style={styles.postitContainer}>
                  <MessagePostit message={messageData.messageContent} />
                </View>
              )}
              
              {/* Sección de AUDIO */}
              {messageData?.messageType === 'AUDIO' && (
                <View style={styles.audioContainer}>
                  <MessageAudio audioUrl={messageData.messageContent}/>
                </View>
              )}
              
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}




const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // ✅ Fondo más opaco (era 0.5)
    justifyContent: 'center', // ✅ Centrado vertical
    alignItems: 'center', // ✅ Centrado horizontal
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject, // ✅ Cubre toda la pantalla
  },
  
  // ✅ NUEVO: Contenedor centrado para la tarjeta
  centeredContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  // ✅ FOTO DE PERFIL SALIENDO CON CÍRCULO DE FONDO
  profilePhotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -40, // ← Hace que la foto se superponga con la tarjeta
    zIndex: 10,
  },

  profileBackgroundCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 1,
  },
  
  profileGradientBorder: {
    width: 84,
    height: 84,
    borderRadius: 42,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileWhiteBorder: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#fff',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  
  // Tarjeta principal
  mainCard: {
    width: '100%', // ✅ Ancho completo del contenedor
    maxWidth: 400, // ✅ Límite máximo para pantallas grandes
    borderRadius: 24,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25, // ✅ Sombra más pronunciada
    shadowRadius: 20, // ✅ Sombra más grande
    elevation: 12, // ✅ Mayor elevación en Android
  },
  cardGradient: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 28,
    borderRadius: 24,
  },
  
  // Espacio para la foto que sobresale
  profileSpacing: {
    height: 32,
    marginBottom: 12,
  },

  profileNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  waveIcon: {
    marginLeft: 8,
  },
  profileSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 12,
  },
  messagesInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 14,
  },
  messageTypeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  messageTypeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 4,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  postitContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  audioContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  balanceContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  balanceCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  actionButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
  },

  // Sección de Mensajes
  messagesSection: {
    marginHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemIconContainer: {
    width: 28,
    alignItems: 'center',
  },
  menuItemLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },

  // Estilos para mensajes
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  messageItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  messageIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  messageDateTime: {
    fontSize: 11,
    color: '#94a3b8',
  },
  messageText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  messageUrl: {
    fontSize: 11,
    color: '#64748b',
    fontStyle: 'italic',
    marginTop: 2,
  },
  messageReactions: {
    flexDirection: 'row',
    gap: 8,
  },
  reactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 2,
  },
  reactionEmoji: {
    fontSize: 12,
  },
  reactionCount: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '600',
  },

  // Botón cerrar
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});