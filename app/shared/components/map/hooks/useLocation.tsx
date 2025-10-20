import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startWatching = async () => {
      try {
        // Solicitar permisos
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setError('Permiso de ubicación denegado');
          setLoading(false);
          return;
        }

        // Obtener ubicación inicial
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        setLoading(false);
        setError(null);

        // Seguir ubicación en tiempo real
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 10, // Actualizar cada 10 metros
            timeInterval: 5000, // Actualizar cada 5 segundos
          },
          (newLocation) => {
            setLocation({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            });
            setError(null);
          }
        );
      } catch (err) {
        console.error('Error con la ubicación:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLoading(false);
      }
    };

    startWatching();

    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return { location, error, loading };
};