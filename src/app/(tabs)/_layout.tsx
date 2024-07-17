import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useTheme} from "@/context/ThemeContext";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function TabLayout() {
  const {theme} = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[theme ?? 'light'].tint,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors[theme ?? 'light'].background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="files"
        options={{
          title: 'Files',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'folder-multiple' : 'folder-multiple-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: 'Settings',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={focused ? 'settings' : 'settings-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
