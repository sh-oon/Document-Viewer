import React from "react";
import { Dimensions, StyleSheet, TouchableHighlight, View } from "react-native";
import { ThemedView } from "../atoms/ThemedView";
import { ThemedIcon } from "../atoms/ThemedIcon";
import { FileInfo } from "expo-file-system";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../atoms/ThemedText";
import { convertDataCapacity } from "@/utils/common";

type TFileItemProps = {
  name: string;
  extention: "pdf" | "txt";
  fileInfo: FileInfo;
  width?: number;
};

const FileItem = ({
  name,
  extention,
  fileInfo,
  width = 0,
  ...rest
}: TFileItemProps) => {
  const color = useThemeColor({}, "text");

  return (
    <ThemedView style={[styles.container, { borderColor: color, width }]}>
      <ThemedIcon extention={extention} />
      <ThemedView style={{ backgroundColor: "transparent" }}>
        <ThemedText
          type="subtitle"
          style={styles.name}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </ThemedText>
        {fileInfo.exists && (
          <ThemedText lightColor="#808080" style={styles.size}>
            {convertDataCapacity(fileInfo.size)}
          </ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 8,
    gap: 24,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  icon: {
    marginRight: 16,
  },
  name: {
    textAlign: "center",
    fontSize: 14,
    // 줄넘김 없애기
    overflow: "hidden",
  },
  size: {
    textAlign: "center",
    fontSize: 10,
  },
});

export default FileItem;
