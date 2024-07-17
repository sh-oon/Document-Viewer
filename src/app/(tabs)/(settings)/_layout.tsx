// React Native _layout.tsx file

// React Native _layout.tsx file
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";

export default function TabLayout() {
	const { theme } = useTheme();

	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: {
					backgroundColor: Colors[theme ?? "light"].background,
				},
				headerTintColor: Colors[theme ?? "light"].text,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: "설정",
				}}
			/>
			<Stack.Screen
				name="language"
				options={{
					title: "언어",
				}}
			/>
			<Stack.Screen
				name="theme"
				options={{
					title: "테마",
				}}
			/>
		</Stack>
	);
}
