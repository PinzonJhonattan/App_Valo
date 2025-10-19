import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { HapticTab } from '../shared/components/haptic-tab';
import { useThemeColor } from '../shared/hooks/use-theme-color';

export default function TabLayout() {
  const tint = useThemeColor({}, 'tint');
  const tabIconDefault = useThemeColor({}, 'tabIconDefault');
  const background = useThemeColor({}, 'background');
  const border = useThemeColor({}, 'borderLight');

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: tint,
          tabBarInactiveTintColor: tabIconDefault,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            backgroundColor: background,
            borderTopColor: border,
            borderTopWidth: 1,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
        }}>
        <Tabs.Screen
          name="global_screen"
          options={{
            title: 'Global',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "globe" : "globe-outline"} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="friends_screen"
          options={{
            title: 'Amigos',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "people" : "people-outline"} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create_screen"
          options={{
            title: 'Crear',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.createButtonContainer}>
                <TouchableOpacity
                  style={[styles.createButton, { backgroundColor: tint }]}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={32} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ),
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '500',
              marginTop: 4,
            },
          }}
        />
        <Tabs.Screen
          name="groups_screen"
          options={{
            title: 'Grupos',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "people-circle" : "people-circle-outline"} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings_screen"
          options={{
            title: 'Ajustes',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "settings" : "settings-outline"} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  createButtonContainer: {
    top: -10,
  },
  createButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
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
})