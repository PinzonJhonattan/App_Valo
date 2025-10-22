import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '../../hooks/use-theme-color';
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
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const pan = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const isScrolling = useRef(false);
  
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
  }, [visible, pan, slideAnim]);

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

  if (!visible) return null;

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
            {/* Barra de arrastre */}
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
              onScrollBeginDrag={() => { isScrolling.current = true; }}
              onScrollEndDrag={() => { isScrolling.current = false; }}
              onMomentumScrollBegin={() => { isScrolling.current = true; }}
              onMomentumScrollEnd={() => { isScrolling.current = false; }}
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
                      source={{ uri: messageData?.creator.picture || 'https://i.pravatar.cc/150?img=1' }}
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
                        <Ionicons name="hand-left" size={20} color="white" style={styles.waveIcon} />
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
                            <Ionicons name="create-outline" size={24} color="white" />
                            <Text style={styles.labelText}> Post it</Text>
                          </>
                        ) :
                           messageData.messageType === 'AUDIO' ? (
                            <>
                              <Ionicons name="mic-outline" size={24} color="white" />
                              <Text style={styles.labelText}> Audio</Text>
                            </>
                          ) :
                           messageData.messageType === 'DRAW' ? (
                            <>
                              <Ionicons name="create-outline" size={24} color="white" />
                              <Text style={styles.labelText}> Dibujo</Text>
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

                  {/* Balance Cards */}
                  <View style={styles.balanceContainer}>
                    <View style={styles.balanceCard}>
                      <Ionicons name="stats-chart" size={24} color="white" />
                      <Text style={styles.balanceAmount}>$3,214</Text>
                    </View>
                    <View style={styles.balanceCard}>
                      <Ionicons name="location" size={24} color="white" />
                      <Text style={styles.balanceAmount}>$1,640</Text>
                    </View>
                  </View>

                  {/* Botones de acción */}
                  <View style={styles.actionButtons}>
                    <ActionButton icon="arrow-up" iconFamily="Ionicons" label="Top up" />
                    <ActionButton icon="card" iconFamily="Ionicons" label="My Referral" />
                    <ActionButton icon="send" iconFamily="MaterialIcons" label="Send" />
                    <ActionButton icon="dollar" iconFamily="FontAwesome" label="Pay" />
                  </View>
                </View>
              </View>

              {/* Sección de CONTENIDO DEL MENSAJE */}
              {messageData && (
                <View style={styles.messagesSection}>
                  <Text style={styles.sectionTitle}>CONTENIDO</Text>
                  <MessageItem message={messageData} />
                </View>
              )}

            </ScrollView>

            {/* Botón cerrar */}
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={handleClose}
              activeOpacity={0.8}
            >
              <Ionicons name="close" size={20} color="#64748b" />
            </TouchableOpacity>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

// Componente de botón de acción
function ActionButton({ icon, iconFamily = "Ionicons", label }: { icon: string; iconFamily?: string; label: string }) {
  const IconComponent = iconFamily === "MaterialIcons" ? MaterialIcons : 
                       iconFamily === "FontAwesome" ? FontAwesome : 
                       iconFamily === "AntDesign" ? AntDesign : Ionicons;

  return (
    <TouchableOpacity style={styles.actionButton}>
      <View style={styles.actionButtonIcon}>
        <IconComponent name={icon as any} size={20} color="#475569" />
      </View>
      <Text style={styles.actionButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
}


// Componente de item de mensaje
function MessageItem({ message }: { message: MessageData }) {
  const getMessageIcon = () => {
    switch (message.messageType) {
      case 'TEXT': return 'chatbubble-outline';
      case 'AUDIO': return 'mic-outline';
      case 'DRAW': return 'create-outline';
      default: return 'chatbubble-outline';
    }
  };

  const getMessageTypeColor = () => {
    switch (message.messageType) {
      case 'TEXT': return '#4299E1';
      case 'AUDIO': return '#E53E3E';
      case 'DRAW': return '#38A169';
      default: return '#64748b';
    }
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <TouchableOpacity style={styles.messageItem}>
      <View style={styles.messageItemLeft}>
        <View style={[styles.messageIconContainer, { backgroundColor: getMessageTypeColor() + '20' }]}>
          <Ionicons name={getMessageIcon() as any} size={16} color={getMessageTypeColor()} />
        </View>
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text style={styles.messageUsername}>
              {message.anonymous ? 'Usuario anónimo' : message.creator.username}
            </Text>
            <Text style={styles.messageDateTime}>
              {formatDateTime(message.messageDate, message.messageTime)}
            </Text>
          </View>
          <Text style={styles.messageText} numberOfLines={2}>
            {message.messageType === 'AUDIO' ? '🎵 Audio' : 
             message.messageType === 'DRAW' ? '🎨 Dibujo' : 
             message.messageContent}
          </Text>
          {message.messageType === 'AUDIO' && (
            <Text style={styles.messageUrl} numberOfLines={1}>
              {message.messageContent}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.messageReactions}>
        {message.reactionsCount.map((reaction, index) => (
          <View key={index} style={styles.reactionItem}>
            <Text style={styles.reactionEmoji}>
              {reaction.reaction === 'heart' ? '❤️' :
               reaction.reaction === 'laugh' ? '😂' :
               reaction.reaction === 'thumbs_up' ? '👍' : '👍'}
            </Text>
            <Text style={styles.reactionCount}>{reaction.count}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f7fa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: screenHeight * 0.90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  safeArea: {
    flex: 1,
  },
  dragIndicatorContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#f5f7fa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#cbd5e1',
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // ✅ FOTO DE PERFIL SALIENDO CON CÍRCULO DE FONDO
  profilePhotoContainer: {
    alignItems: 'center',
    marginTop: 20,         // ← Más margen arriba para que no se tape
    marginBottom: -52,     // ← Se superpone con la tarjeta
    zIndex: 10,
    position: 'relative',
  },
  
   // ✅ CÍRCULO DE FONDO DEL COLOR DE LA TARJETA
   profileBackgroundCircle: {
     position: 'absolute',
     width: 95,            // ← Más grande que la foto
     height: 95,
     borderRadius: 47.5,   // ← La mitad del width/height para ser perfectamente circular
     backgroundColor: '#4299E1', // ← Color primario por defecto
     top: '50%',           // ← Centrado verticalmente
     left: '50%',          // ← Centrado horizontalmente
     marginTop: -47.5,     // ← La mitad de la altura para centrar perfectamente
     marginLeft: -47.5,    // ← La mitad del ancho para centrar perfectamente
     zIndex: 1,
   },
  
  profileGradientBorder: {
    width: 84,
    height: 84,
    borderRadius: 42,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,             // ← Por encima del círculo de fondo
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
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 24,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
   cardGradient: {
     padding: 24,
     paddingTop: 32,
     paddingBottom: 28,
     borderRadius: 24,
     // backgroundColor se aplica dinámicamente con primaryColor
   },
  
  // Espacio para la foto que sobresale
  profileSpacing: {
    height: 32,            // ← Ajustado
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