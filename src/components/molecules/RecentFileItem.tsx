import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "../atoms/ThemedView";
import { ThemedIcon } from "../atoms/ThemedIcon";
import { FileInfo } from "expo-file-system";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../atoms/ThemedText";
import { convertDataCapacity } from "@/utils/common";

type TRecentFileItemProps = {
	name: string;
	extention: "pdf" | "txt";
	lastModified: string;
	fileInfo: FileInfo;
	width?: number;
};

const RecentFileItem = ({ name, extention, lastModified, fileInfo, width = 0, ...rest }: TRecentFileItemProps) => {
	const color = useThemeColor({}, "text");

	return (
		<ThemedView style={[styles.container, { borderColor: color, width }]}>
			<ThemedIcon extention={extention} />
			<ThemedView style={styles.textContainer}>
				<ThemedText
					type="subtitle"
					style={styles.name}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{name}
				</ThemedText>
				<ThemedText
					lightColor="#808080"
					style={styles.lastModified}
				>
					{lastModified}
				</ThemedText>
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
	textContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
	},
	name: {
		textAlign: "center",
		fontSize: 14,
		// 줄넘김 없애기
		overflow: "hidden",
	},
	describeContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	lastModified: {
		textAlign: "center",
		fontSize: 10,
		lineHeight: 10,
	},
});

export default RecentFileItem;
