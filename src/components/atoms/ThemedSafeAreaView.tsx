import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

export type ThemedSafeAreaViewProps = SafeAreaViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "full-screen" | "default";
};

const ThemedSafeAreaView = ({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedSafeAreaViewProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaView
      style={[
        { backgroundColor },
        type === "full-screen" ? { flex: 1 } : undefined,
        type === "default" ? { flex: 0 } : undefined,
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({});

export default ThemedSafeAreaView;
