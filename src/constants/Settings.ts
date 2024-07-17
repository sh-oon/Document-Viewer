import {TSettingItems} from "../app/(tabs)/(settings)";

export const Settings:TSettingItems[] = [
  {
    title: '설정',
    menus: [
      {
        title: 'Language',
        type: 'link',
        onPress: () => console.log('Language'),
      },
      {
        title: 'Theme',
        type: 'link',
        onPress: () => console.log('Theme'),
      },
      {
        title: 'Notification',
        type: 'link',
        onPress: () => console.log('Notification'),
      },
    ],
  },
  {
    title: '앱 정보 및 이용약관',
    menus: [
      {
        title: 'Privacy Policy',
        type: 'link',
        onPress: () => console.log('Privacy Policy'),
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
