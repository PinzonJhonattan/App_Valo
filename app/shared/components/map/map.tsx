import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ViewShot from 'react-native-view-shot';
import { AnimatedWaves } from './AnimatedWaves';
import { CustomMarker } from './custom-marker';
import dataMocks from './data/data-mocks.json';
import { useLocation } from './hooks/useLocation';
import { MarkerModal } from './marker-modal';

const Map = () => {
  const { location, error, loading } = useLocation();
  const mapRef = useRef<MapView>(null);
  
  // Estados para el modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  const markers = useMemo(() => dataMocks, []);

  const [markerIcons, setMarkerIcons] = useState<{ [key: string]: any }>({});
  const viewShotRefs = useRef<{ [key: string]: ViewShot | null }>({});

  // Función para abrir el modal con el marcador seleccionado
  const handleMarkerPress = useCallback((messageUuid: string) => {
    setSelectedMarker(messageUuid);
    setModalVisible(true);
  }, []);

  // Función para cerrar el modal
  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedMarker(null);
  }, []);

  const handleImageLoad = useCallback((markerId: string) => {
    setTimeout(() => {
      const ref = viewShotRefs.current[markerId];
      if (ref) {
        ref.capture?.()
          .then((uri) => {
            console.log('Marcador capturado:', markerId, uri);
            setMarkerIcons((prevIcons) => ({
              ...prevIcons,
              [markerId]: { uri },
            }));
          })
          .catch((error) => {
            console.error('Error capturando marcador:', markerId, error);
          });
      }
    }, 100);
  }, []);

  const renderHiddenMarkers = useCallback(() => {
    return markers.map((marker, index) => (
      <ViewShot
        key={`hidden-${index}-${marker.messageUuid}`}
        ref={(ref) => {
          viewShotRefs.current[marker.messageUuid] = ref;
        }}
        style={styles.hiddenMarker}
        options={{ format: 'png', quality: 1 }}
      >
        <CustomMarker 
          imageUrl={'https://i.pravatar.cc/150?img=14'} 
          size={50}
          onImageLoad={() => handleImageLoad(marker.messageUuid)}
        />
      </ViewShot>
    ));
  }, [markers, handleImageLoad]);

  // Centrar el mapa en tu ubicación cuando cargue
  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    }
  }, [location]);

  // Memoizar la región inicial para evitar re-renderizados
  const initialRegion = useMemo(() => {
    if (location) {
      return {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    }
    return {
      latitude: 4.1255715,
      longitude: -73.6387064,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
  }, [location]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#42A5F5" />
      </View>
    );
  }

  if (error) {
    console.error('Error de ubicación:', error);
  }

  return (
    <View style={styles.container}>
      {/* Marcadores ocultos para capturar */}
      <View style={styles.hiddenContainer}>
        {renderHiddenMarkers()}
      </View>

      <AnimatedWaves />

      <MapView 
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={instagramDarkStyleWithLabels}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        toolbarEnabled={false}
        showsCompass={false}
        showsScale={false}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={false}
        rotateEnabled={false}
        initialRegion={initialRegion}
      >

        {/* Tus marcadores personalizados */}
        {markers.map((marker, index) => {
          
          return (
            <Marker
              key={`marker-${index}-${marker.messageUuid}`}
              coordinate={marker.location}
              icon={markerIcons[marker.messageUuid]}
              anchor={{ x: 0.5, y: 0.5 }}
              tracksViewChanges={false}
              onPress={() => handleMarkerPress(marker.messageUuid)}
            />
          );
          
        })}
      </MapView>

      {/* Modal para mostrar información del marcador */}
      <MarkerModal
        visible={modalVisible}
        messageUuid={selectedMarker}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const instagramDarkStyleWithLabels = [
  {
    elementType: "geometry",
    stylers: [{ color: "#1a2a3a" }]
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }]
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#c9d1d9" }]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1a2a3a", weight: 2 }]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#e3f2fd" }]
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2c3e50" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0d1b2a" }]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenContainer: {
    position: 'absolute',
    left: -1000,
    top: 0,
  },
  hiddenMarker: {
    width: 150,
    height: 150,
  },
  userLocationMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(66, 165, 245, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userLocationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#42A5F5',
  },
});

export default Map;