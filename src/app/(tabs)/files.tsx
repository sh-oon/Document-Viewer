import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import type { FileInfo } from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { ThemedView } from "@/components/atoms/ThemedView";
import { ThemedText } from "@/components/atoms/ThemedText";
import ThemedSafeAreaView from "@/components/atoms/ThemedSafeAreaView";
import { ThemedIcon } from "@/components/atoms/ThemedIcon";
import FileItem from "@/components/molecules/FileItem";
import { useThemeColor } from "@/hooks/useThemeColor";

type TFileInfo = {
  name: string;
  extention: "pdf" | "txt";
  info: FileInfo;
};

const DownloadedFiles = () => {
  const [files, setFiles] = useState<TFileInfo[]>([]);
  const [listColumns, setListColumns] = useState<number>(3);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const folderName = "bookmarks";
  const folderPath = `${FileSystem.documentDirectory}${folderName}/`;

  const ensureFolderExists = async () => {
    const folderInfo = await FileSystem.getInfoAsync(folderPath);
    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
    }
  };

  const fetchFiles = async (
    assets: DocumentPicker.DocumentPickerResult["assets"]
  ) => {
    if (!assets) {
      return;
    }

    await ensureFolderExists();

    const fetchedFiles: TFileInfo[] = [];

    for (const asset of assets) {
      try {
        // Copy the file to the custom folder
        const newFileUri = folderPath + asset.name;
        await FileSystem.copyAsync({ from: asset.uri, to: newFileUri });

        // Get file info of the copied file
        const fileInfo = await FileSystem.getInfoAsync(newFileUri, {
          md5: true,
          size: true,
        });

        if (fileInfo.isDirectory) return;

        fetchedFiles.push({
          name: asset.name,
          extention: asset.name.split(".").pop() as "pdf" | "txt",
          info: fileInfo,
        });
      } catch (error) {
        console.error("Failed to fetch file:", error);
      }
    }

    setFiles((prevFiles) => [...prevFiles, ...fetchedFiles]);
  };

  const fetchFilesInFolder = async () => {
    try {
      const filesInfo = await FileSystem.readDirectoryAsync(folderPath);
      const fileInfoArray = await Promise.all(
        filesInfo.map(async (fileName) => {
          const fileInfo = await FileSystem.getInfoAsync(folderPath + fileName);
          return {
            name: fileName,
            extention: fileName.split(".").pop() as "pdf" | "txt",
            info: fileInfo,
          };
        })
      );

      setFiles(fileInfoArray);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await ensureFolderExists();
      await fetchFilesInFolder();
    };

    initialize();
  }, []);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "text/plain", "text/csv"],
      copyToCacheDirectory: true,
    });

    // Handle the result
    if (result.canceled) {
      console.log("Document picking cancelled");
    } else {
      fetchFiles(result.assets);
    }
  };

  const clearCache = async () => {
    try {
      await FileSystem.deleteAsync(folderPath, { idempotent: true });
      setFiles([]);
    } catch (error) {
      console.error("Failed to clear cache:", error);
    }
  };

  const renderItem = ({ name, extention, info }: TFileInfo) => {
    const margin = 10;
    const gap = 16;
    const itemWidth =
      (containerWidth - gap * (listColumns - 1) - margin * 2) / listColumns;

    return (
      <>
        {info.exists && (
          <TouchableOpacity
            onPress={() => alert(`File: ${name}`)}
            activeOpacity={0.6}
          >
            <FileItem
              name={name}
              extention={extention}
              fileInfo={info}
              width={itemWidth}
            />
          </TouchableOpacity>
        )}
      </>
    );
  };

  const renderHeader = () => {
    return (
      <ThemedView style={styles.container}>
        <Button title="Pick a Document" onPress={pickDocument} />
      </ThemedView>
    );
  };

  return (
    <ThemedSafeAreaView type="full-screen">
      <FlatList
        data={files}
        keyExtractor={(item) => item.info.uri}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => renderItem(item)}
        columnWrapperStyle={{ marginBottom: 16, gap: 16 }}
        numColumns={listColumns}
        contentContainerStyle={{ padding: 10 }}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      />
      <Button title="Clear Cache" onPress={clearCache} />
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default DownloadedFiles;
