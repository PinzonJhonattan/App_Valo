import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ViewShot from 'react-native-view-shot';
import { CustomMarker } from './custom-marker';

export default function Map() {
  const markers = [
    {
      id: '1',
      coordinate: {
        latitude: 40.4168,
        longitude: -3.7038,
      },
      imageUrl: 'https://i.pravatar.cc/150?img=1',
      title: 'Madrid',
    },
    {
      id: '2',
      coordinate: {
        latitude: 41.3851,
        longitude: 2.1734,
      },
      imageUrl: 'https://i.pravatar.cc/150?img=2',
      title: 'Barcelona',
    },
  ];

  const [markerIcons, setMarkerIcons] = useState<{ [key: string]: any }>({});
  const viewShotRefs = useRef<{ [key: string]: ViewShot | null }>({});

  const handleImageLoad = (markerId: string) => {
    setTimeout(() => {
      const ref = viewShotRefs.current[markerId];
      if (ref) {
        ref.capture?.().then((uri) => {
          console.log('Marcador capturado:', markerId, uri);
          setMarkerIcons((prevIcons) => ({
            ...prevIcons,
            [markerId]: { uri },
          }));
        }).catch((error) => {
          console.error('Error capturando marcador:', markerId, error);
        });
      }
    }, 10); // Más tiempo para que cargue
  };

  const renderHiddenMarkers = () => {
    return markers.map((marker) => (
      <ViewShot
        key={`hidden-${marker.id}`}
        ref={(ref) => {
          viewShotRefs.current[marker.id] = ref;
        }}
        style={styles.hiddenMarker}
        options={{ format: 'png', quality: 1 }}
      >
        <CustomMarker 
          imageUrl={marker.imageUrl} 
          size={50}
          onImageLoad={() => handleImageLoad(marker.id)}
        />
      </ViewShot>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Marcadores ocultos para capturar */}
      <View style={styles.hiddenContainer}>
        {renderHiddenMarkers()}
      </View>

      <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={instagramDarkStyleWithLabels}
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
        initialRegion={{
          latitude: 40.4168,
          longitude: -3.7038,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {markers.map((marker) => {
          // Si no hay icono aún, mostrar el componente directamente
          if (!markerIcons[marker.id]) {
            return (
              <Marker
                key={marker.id}
                coordinate={marker.coordinate}
                anchor={{ x: 0.5, y: 0.5 }}
                tracksViewChanges={true}
              >
                <CustomMarker 
                  imageUrl={marker.imageUrl} 
                  size={50}
                  onImageLoad={() => handleImageLoad(marker.id)}
                />
              </Marker>
            );
          }
          
          // Una vez capturado, usar el icono
          return (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              icon={markerIcons[marker.id]}
              anchor={{ x: 0.5, y: 0.5 }}
              tracksViewChanges={false}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const instagramDarkStyleWithLabels = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#1a2a3a" }]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#c9d1d9" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#1a2a3a", "weight": 2 }]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#e3f2fd" }]
  },
  {
    "featureType": "poi",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#2c3e50" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#0d1b2a" }]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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
});