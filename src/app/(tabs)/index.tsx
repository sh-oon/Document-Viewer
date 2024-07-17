import { Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/atoms/ThemedText";
import { ThemedView } from "@/components/atoms/ThemedView";
import ThemedSafeAreaView from "@/components/atoms/ThemedSafeAreaView";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as FileSystem from "expo-file-system";
import { useCallback, useEffect, useState } from "react";
import { IDocument } from "@/types/document";
import { ensureFolderExists, fetchFilesInFolder } from "@/hooks/useFileController";
import FileItem from "@/components/molecules/FileItem";
import RecentFileItem from "@/components/molecules/RecentFileItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

const RECENT_PATH = `${FileSystem.documentDirectory}recent/`;

export default function HomeScreen() {
	const borderColor = useThemeColor({}, "border");
	const [files, setFiles] = useState<IDocument[]>([]);
	const [listColumns, setListColumns] = useState<number>(3);
	const [containerWidth, setContainerWidth] = useState<number>(0);

	useFocusEffect(
		useCallback(() => {
			const init = async () => {
				try {
					await ensureFolderExists(RECENT_PATH);
					const recentFilesJson = await AsyncStorage.getItem("@recent_documents");

					if (recentFilesJson) {
						const recentFiles = JSON.parse(recentFilesJson) as IDocument[];

						setFiles(recentFiles);
					}

					// await fetchFilesInFolder(RECENT_PATH, setFiles);
				} catch (error) {
					console.error("Failed to initialize HomeScreen:", error);
				}
			};

			init();
		}, [])
	);

	const fetchFilesInFolder = async () => {
		try {
			await ensureFolderExists(RECENT_PATH);
			const recentFilesJson = await AsyncStorage.getItem("@recent_documents");

			if (recentFilesJson) {
				const recentFiles = JSON.parse(recentFilesJson) as IDocument[];

				setFiles(recentFiles);
			}

			// await fetchFilesInFolder(RECENT_PATH, setFiles);
		} catch (error) {
			console.error("Failed to initialize HomeScreen:", error);
		}
	};

	const renderItem = ({ uri, name, extention, lastModified, info }: IDocument) => {
		const margin = 10;
		const gap = 16;
		const itemWidth = (containerWidth - gap * (listColumns - 1) - margin * 2) / listColumns;

		return (
			<>
				<TouchableOpacity>
					<RecentFileItem
						name={name}
						extention={extention}
						fileInfo={info}
						lastModified={lastModified}
						width={itemWidth}
					/>
				</TouchableOpacity>
			</>
		);
	};

	const initialize = async () => {
		try {
			await FileSystem.deleteAsync(RECENT_PATH, { idempotent: true });
			await AsyncStorage.removeItem("@recent_documents");
			setFiles([]);
		} catch (error) {
			console.error("Failed to clear cache:", error);
		}
	};

	return (
		<ThemedSafeAreaView type="full-screen">
			<ThemedView style={{ ...styles.titleContainer, borderBottomColor: borderColor }}>
				<ThemedText type="subtitle">최근 읽은 문서</ThemedText>
			</ThemedView>
			<FlatList
				data={files}
				keyExtractor={(item) => item.uri + item.lastModified}
				renderItem={({ item }) => renderItem(item)}
				columnWrapperStyle={{ marginBottom: 16, gap: 16 }}
				numColumns={listColumns}
				contentContainerStyle={{ padding: 10 }}
				onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
			/>
			<ThemedView style={{ flexDirection: "row" }}>
				<Button
					title="최신화"
					onPress={fetchFilesInFolder}
				/>
				<Button
					title="Initialize"
					onPress={initialize}
				/>
			</ThemedView>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 16,
		borderBottomColor: "#E5E5E5",
		borderBottomWidth: 1,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
