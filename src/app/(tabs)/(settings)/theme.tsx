import { View, StyleSheet, Animated, Button, Appearance } from "react-native";
import FlatList = Animated.FlatList;
import { ThemedText } from "@/components/atoms/ThemedText";
import { Pressable } from "expo-router/build/views/Pressable";
import { ThemedView } from "@/components/atoms/ThemedView";
import { useTheme } from "@/context/ThemeContext";

type TThemeButton = {
	title: "라이트 모드" | "다크 모드" | "시스템 설정 모드";
	payload: "light" | "dark" | "system";
};

const themes: TThemeButton[] = [
	{
		title: "라이트 모드",
		payload: "light",
	},
	{
		title: "다크 모드",
		payload: "dark",
	},
	{
		title: "시스템 설정 모드",
		payload: "system",
	},
];

export default function ThemeScreen() {
	const { theme, setTheme } = useTheme();

	const handleTheme = (theme: TThemeButton["payload"]) => {
		if (theme === "system") {
			const deviceTheme = Appearance.getColorScheme();
			setTheme(deviceTheme ?? "light");
		} else {
			setTheme(theme);
		}
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={themes}
				renderItem={({ item }) => (
					<ThemedView>
						<Pressable
							onPress={() => {
								handleTheme(item.payload);
							}}
						>
							<ThemedText>{item.title}</ThemedText>
						</Pressable>
					</ThemedView>
				)}
			/>
			<ThemedText>{theme}</ThemedText>
			<Button
				title="Reset"
				onPress={() => {}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	item: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
	},
});
