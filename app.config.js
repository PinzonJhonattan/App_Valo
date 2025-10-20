export default {
  expo: {
    name: "mi-primera-app",
    slug: "mi-primera-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "miprimeraapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.tuusuario.miprimerapp",
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "Necesitamos tu ubicación para mostrarte en el mapa",
        NSLocationAlwaysAndWhenInUseUsageDescription: "Necesitamos tu ubicación para mostrarte en el mapa"
      }
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.tuusuario.miprimerapp",
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION"
      ]
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000"
          }
        }
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Permite a $(PRODUCT_NAME) usar tu ubicación para mostrarte en el mapa.",
          locationAlwaysPermission: "Permite a $(PRODUCT_NAME) usar tu ubicación en segundo plano.",
          locationWhenInUsePermission: "Permite a $(PRODUCT_NAME) usar tu ubicación cuando uses la app.",
          isAndroidBackgroundLocationEnabled: false
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
  }
};
