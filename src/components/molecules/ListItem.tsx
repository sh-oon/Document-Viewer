import {ThemedView} from "@/components/atoms/ThemedView";
import {StyleSheet} from "react-native";
import {ThemedText} from "@/components/atoms/ThemedText";
import {Pressable} from "expo-router/build/views/Pressable";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";
import {TMenuItem} from "@/app/(tabs)/(settings)";

interface ListItemProps extends TMenuItem {
  label?: string;
}

const ListItem = ({title, type, onPress, label, ...rest}: ListItemProps) => {
  const theme = useColorScheme();
  const colors = Colors[theme === 'light' ? 'light' : 'dark']


  return (
    <Pressable
      onPress={onPress}
    >
      <ThemedView
        style={{
          ...styles.container,
          borderBottomColor: colors.border,
        }}
      >
        <ThemedText>{title}</ThemedText>
        {type === 'switch' && <ThemedText>Switch</ThemedText>}
        {type === 'button' && <ThemedText>Button</ThemedText>}
        {type === 'link' && <ThemedText>Link</ThemedText>}
        {type === 'label' && <ThemedText>{label}</ThemedText>}
      </ThemedView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default ListItem;
