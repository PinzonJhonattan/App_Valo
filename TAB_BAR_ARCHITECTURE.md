# 🎯 Arquitectura de Tab Bar Persistente

## 📋 Resumen

Esta aplicación utiliza un **Tab Bar Persistente** que se mantiene visible en todas las pantallas, proporcionando una navegación consistente y escalable.

## 🏗️ Arquitectura

### 1. **Contexto Global** (`app/shared/contexts/tab-bar-context.tsx`)
- Maneja el estado de visibilidad del tab bar
- Proporciona funciones: `showTabBar()`, `hideTabBar()`, `toggleTabBar()`
- Accesible desde cualquier pantalla usando `useTabBar()`

### 2. **Componente Persistente** (`app/shared/components/ui/persistent-tab-bar.tsx`)
- Tab bar flotante que se renderiza sobre todas las pantallas
- Incluye el menú flotante de creación
- Se posiciona automáticamente con `useSafeAreaInsets`

### 3. **Layout Principal** (`app/_layout.tsx`)
- Envuelve toda la app con `TabBarProvider`
- Renderiza el `PersistentTabBar` globalmente

## 🚀 Cómo Usar

### Para Mostrar/Ocultar el Tab Bar

```tsx
import { useTabBar } from '../shared/contexts/tab-bar-context';

export default function MiPantalla() {
  const { showTabBar, hideTabBar, toggleTabBar } = useTabBar();

  // Mostrar el tab bar
  useEffect(() => {
    showTabBar();
  }, []);

  // Ocultar el tab bar
  const handleOcultar = () => {
    hideTabBar();
  };

  return (
    // Tu contenido aquí
  );
}
```

### Para Crear Nuevas Pantallas

1. **Crea la pantalla** en `app/features/tu-feature/pantalla.tsx`
2. **Agrega padding bottom** para el tab bar:
   ```tsx
   const styles = StyleSheet.create({
     content: {
       paddingBottom: 100, // Espacio para el tab bar
     },
   });
   ```
3. **Asegura visibilidad** del tab bar:
   ```tsx
   useEffect(() => {
     showTabBar();
   }, [showTabBar]);
   ```

## ✅ Ventajas

- ✅ **Escalable**: 0 archivos extra por pantalla
- ✅ **Consistente**: Tab bar siempre visible
- ✅ **Flexible**: Control total sobre visibilidad
- ✅ **Rendimiento**: Un solo componente tab bar
- ✅ **Mantenible**: Arquitectura limpia y clara

## 🎨 Personalización

### Cambiar Estilos del Tab Bar
Edita `app/shared/components/ui/persistent-tab-bar.tsx`:

```tsx
const styles = StyleSheet.create({
  tabBar: {
    // Personaliza aquí
    backgroundColor: 'tu-color',
    height: 80, // Cambia altura
  },
});
```

### Agregar Nuevos Tabs
En `persistent-tab-bar.tsx`, agrega al array `tabs`:

```tsx
{
  name: 'nuevo_tab',
  title: 'Nuevo',
  icon: (color: string, focused: boolean) => (
    <Ionicons 
      name={focused ? "icono" : "icono-outline"} 
      size={24} 
      color={color} 
    />
  ),
  onPress: () => router.push('/(tabs)/nuevo_tab'),
},
```

## 🔧 Estructura de Archivos

```
app/
├── _layout.tsx                    # Layout principal con TabBarProvider
├── (tabs)/                       # Pantallas principales (con tab bar nativo)
├── features/                     # Pantallas de features (con tab bar persistente)
│   └── create/
│       ├── postit.tsx
│       ├── draw.tsx
│       └── audio.tsx
└── shared/
    ├── contexts/
    │   └── tab-bar-context.tsx   # Contexto global
    └── components/ui/
        └── persistent-tab-bar.tsx # Tab bar persistente
```

## 🎯 Resultado

Ahora tienes un tab bar que:
- Se mantiene visible en **todas las pantallas**
- Es **completamente escalable** (0 archivos extra por pantalla)
- Tiene **control total** sobre cuándo mostrarse/ocultarse
- Mantiene una **arquitectura limpia y profesional**
