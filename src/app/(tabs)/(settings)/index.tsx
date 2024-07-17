import {StyleSheet, SafeAreaView, Animated} from 'react-native';

import {ThemedText} from '@/components/atoms/ThemedText';
import ListItem from "@/components/molecules/ListItem";
import {router} from "expo-router";
import SectionList = Animated.SectionList;
import {useColorScheme, useColorTheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";
import * as Application from 'expo-application';
import {useTheme} from "@/context/ThemeContext";


export type TMenuItem = {
  title: string;
  type: 'switch' | 'button' | 'link' | 'label';
  label?: string
  onPress?: () => void;
}

export type TSettingItems = {
  title: string;
  data: TMenuItem[];
}

export default function SettingScreen() {
  const { theme } = useTheme()
  const colors = Colors[theme ?? 'light']


  const settings: TSettingItems[] = [
    {
      title: '설정',
      data: [
        {
          title: '언어',
          type: 'link',
          onPress: () => router.push('/(settings)/language'),
        },
        {
          title: '테마',
          type: 'link',
          onPress: () => router.push('/(settings)/theme'),
        },
        {
          title: '알람',
          type: 'link',
          onPress: () => console.log('Notification'),
        },
      ],
    },
    {
      title: '앱 정보 및 이용약관',
      data: [
        {
          title: '앱 버전',
          type: 'label',
          label: `v${Application.nativeApplicationVersion}` ?? ''
        },
        {
          title: 'Terms of Service',
          type: 'link',
          onPress: () => console.log('Terms of Service'),
        },
        {
          title: 'Contact Us',
          type: 'link',
          onPress: () => console.log('Contact Us'),
        },
      ],
    },
  ]

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme === 'light' ? Colors.light.space : Colors.dark.space,
        paddingTop: 10
      }}
    >
      <SectionList
        sections={settings}
        keyExtractor={(item, index) => item.title + index}
        style={{
          height: '100%'
        }}
        renderSectionHeader={({section: {title}}) => (
          <ThemedText
            type={'defaultSemiBold'}
            style={styles.stepHeader}
          >{title}</ThemedText>
        )}
        renderItem={({item}) => (
          <ListItem
            title={item.title}
            type={item.type}
            onPress={item.onPress}
            label={item.label}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  settingContainer: {
    paddingBottom: 10
  },
  stepHeader: {
    padding: 10,
  },
});
