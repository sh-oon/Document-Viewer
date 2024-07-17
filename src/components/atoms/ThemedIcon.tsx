import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/build/FontAwesome6";
import React from "react";
import { StyleSheet, View } from "react-native";

export type ThemedIconProps = {
  lightColor?: string;
  darkColor?: string;
  extention?: "pdf" | "folder" | "txt" | "image" | "audio" | "video" | "other";
};

export const ThemedIcon = ({
  lightColor,
  darkColor,
  extention = "other",
}: ThemedIconProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  if (extention === "pdf")
    return <FontAwesome6 name="file-pdf" size={32} color={color} />;

  if (extention === "folder")
    return <Feather name="folder" size={32} color={color} />;

  if (extention === "txt")
    return <FontAwesome6 name="file-text" size={32} color={color} />;

  if (extention === "image")
    return <FontAwesome6 name="file-image" size={32} color={color} />;

  if (extention === "audio")
    return <FontAwesome6 name="file-audio" size={32} color={color} />;

  if (extention === "video")
    return <FontAwesome6 name="file-video" size={32} color={color} />;

  return <FontAwesome6 name="file" size={32} color={color} />;
};

const styles = StyleSheet.create({});
