import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTabBar } from '../../contexts/tab-bar-context';
import { useThemeColor } from '../../hooks/use-theme-color';
import { HapticTab } from '../haptic-tab';
import { FloatingActionMenu } from './floating-action-menu';

export function PersistentTabBar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { isVisible } = useTabBar();
  const insets = useSafeAreaInsets();
  
  const tint = useThemeColor({}, 'tint');
  const background = useThemeColor({}, 'background');
  const border = useThemeColor({}, 'borderLight');
  const tabIconDefault = useThemeColor({}, 'tabIconDefault');

  if (!isVisible) return null;

  const tabs = [
    {
      name: 'global_screen',
      title: 'Global',
      icon: (color: string, focused: boolean) => (
        <Ionicons 
          name={focused ? "globe" : "globe-outline"} 
          size={24} 
          color={color} 
        />
      ),
      onPress: () => router.push('/(tabs)/global_screen'),
    },
    {
      name: 'friends_screen',
      title: 'Amigos',
      icon: (color: string, focused: boolean) => (
        <Ionicons 
          name={focused ? "people" : "people-outline"} 
          size={24} 
          color={color} 
        />
      ),
      onPress: () => router.push('/(tabs)/friends_screen'),
    },
    {
      name: 'create',
      title: 'Crear',
      icon: (color: string, focused: boolean) => (
        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: tint }]}
            onPress={() => setMenuVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={32} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ),
      onPress: () => setMenuVisible(true),
    },
    {
      name: 'groups_screen',
      title: 'Grupos',
      icon: (color: string, focused: boolean) => (
        <Ionicons 
          name={focused ? "people-circle" : "people-circle-outline"} 
          size={24} 
          color={color} 
        />
      ),
      onPress: () => router.push('/(tabs)/groups_screen'),
    },
    {
      name: 'settings_screen',
      title: 'Ajustes',
      icon: (color: string, focused: boolean) => (
        <Ionicons 
          name={focused ? "settings" : "settings-outline"} 
          size={24} 
          color={color} 
        />
      ),
      onPress: () => router.push('/(tabs)/settings_screen'),
    },
  ];

  return (
    <>
      <View style={[
        styles.tabBar,
        {
          backgroundColor: background,
          borderTopColor: border,
          paddingBottom: insets.bottom + 10,
          paddingTop: 10,
        }
      ]}>
        {tabs.map((tab) => (
          <HapticTab
            key={tab.name}
            onPress={tab.onPress}
            style={styles.tabButton}
          >
            <View style={styles.tabContent}>
              {tab.icon(tint, false)}
              <Text style={[styles.tabLabel, { color: tabIconDefault }]}>
                {tab.title}
              </Text>
            </View>
          </HapticTab>
        ))}
      </View>

      {/* Menú flotante */}
      <FloatingActionMenu 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
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
});