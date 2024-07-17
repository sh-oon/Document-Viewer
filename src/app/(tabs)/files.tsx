import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Button, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import type { FileInfo } from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { ThemedView } from "@/components/atoms/ThemedView";
import ThemedSafeAreaView from "@/components/atoms/ThemedSafeAreaView";
import FileItem from "@/components/molecules/FileItem";
import { IDocument } from "@/types/document";
import { clearCache, ensureFolderExists, fetchFilesInFolder } from "@/hooks/useFileController";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TFileInfo = {
	name: string;
	extention: "pdf" | "txt";
	info: FileInfo;
};

const FilesScreen = () => {
	const [files, setFiles] = useState<TFileInfo[]>([]);
	const [listColumns, setListColumns] = useState<number>(3);
	const [containerWidth, setContainerWidth] = useState<number>(0);
	const folderName = "bookmarks";
	const folderPath = `${FileSystem.documentDirectory}${folderName}/`;
	const recentPath = `${FileSystem.documentDirectory}recent/`;

	const fetchFiles = async (assets: DocumentPicker.DocumentPickerResult["assets"], path: string = folderPath) => {
		if (!assets) {
			return;
		}

		await ensureFolderExists(folderPath);

		const fetchedFiles: TFileInfo[] = [];

		for (const asset of assets) {
			try {
				const newFileUri = path + asset.name;
				await FileSystem.copyAsync({ from: asset.uri, to: newFileUri });

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

	useEffect(() => {
		const initialize = async () => {
			await ensureFolderExists(folderPath);
			await fetchFilesInFolder(folderPath, setFiles);
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

	const openFile = async (info: FileInfo, filename: string) => {
		try {
			if (!info.exists) throw new Error("File does not exist");
			await ensureFolderExists(recentPath);

			if (info.uri.includes(recentPath)) {
				await FileSystem.deleteAsync(info.uri);
			}

			await FileSystem.getContentUriAsync(info.uri);

			const obj = {
				uri: info.uri,
				extention: info.uri.split(".").pop() as string,
				name: filename,
				size: info.size,
				info: info,
				lastModified: new Date().toLocaleDateString("ko-KR", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				}),
			} as IDocument;

			console.log("Opening file:", obj.name);

			// Save the recent file
			await FileSystem.copyAsync({ from: info.uri, to: recentPath + obj.name });
			const recentFilesJson = await AsyncStorage.getItem("@recent_documents");

			if (recentFilesJson) {
				const recentFiles = JSON.parse(recentFilesJson) as IDocument[];
				// 기존 파일이 있으면 삭제
				const newRecentFiles = recentFiles.filter((file: IDocument) => file.uri !== obj.uri);
				await AsyncStorage.setItem("@recent_documents", JSON.stringify([obj, ...newRecentFiles]));
			} else {
				await AsyncStorage.setItem("@recent_documents", JSON.stringify([obj]));
			}
		} catch (error) {
			console.error("Failed to open file:", error);
		}
	};

	const renderItem = ({ name, extention, info }: TFileInfo) => {
		const margin = 10;
		const gap = 16;
		const itemWidth = (containerWidth - gap * (listColumns - 1) - margin * 2) / listColumns;

		return (
			<>
				{info.exists && (
					<TouchableOpacity
						onPress={() => openFile(info, name)}
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
				<Button
					title="Pick a Document"
					onPress={pickDocument}
				/>
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
			<Button
				title="Clear Cache"
				onPress={() => clearCache(folderPath, setFiles)}
			/>
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

export default FilesScreen;
