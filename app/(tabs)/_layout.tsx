import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Definição de Cores do Tema (Azul Profissional)
// Definimos localmente para evitar erros de importação de arquivos externos
const Colors = {
  light: {
    tint: '#007AFF', // Cor ativa (Azul)
    tabIconDefault: '#687076', // Cor inativa (Cinza)
    background: '#ffffff',
  },
  dark: {
    tint: '#fff',
    tabIconDefault: '#9BA1A6',
    background: '#151718',
  },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light'; 

  return (
    <Tabs
      screenOptions={{
        // Cores vindas do nosso objeto local
        tabBarActiveTintColor: Colors[theme].tint,
        tabBarInactiveTintColor: Colors[theme].tabIconDefault,
        headerShown: false, // Esconde o cabeçalho padrão
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: theme === 'dark' ? '#151718' : '#ffffff', 
          },
          default: {},
        }),
      }}>

      {/* ABA 1: Clima (Tela Principal) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Clima',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={28} 
              name={focused ? 'cloud' : 'cloud-outline'} 
              color={color} 
            />
          ),
        }}
      />

      {/* ABA 2: Explorar */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={28} 
              name={focused ? 'map' : 'map-outline'} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}