import { Button, StyleSheet } from "react-native";
import { useState } from "react";
import useAsyncStorage from "@/lib/useAsyncStorage";
import { ThemedView } from "@/components/atoms/ThemedView";
import { ThemedText } from "@/components/atoms/ThemedText";
import { ThemedTextInput } from "@/components/atoms/ThemedTextInput";

export default function LanguageScreen() {
	const [username, setUsername] = useState("");
	const [storedUsername, setStoredUsername, removeStoredUsername] = useAsyncStorage<string>("@username");

	const handleSave = () => {
		setStoredUsername(username);
		setUsername("");
	};

	const handleRemove = () => {
		removeStoredUsername();
	};

	return (
		<ThemedView style={styles.container}>
			<ThemedText>Stored Username: {storedUsername}</ThemedText>
			<ThemedTextInput
				style={styles.input}
				placeholder="Enter username test"
				value={username}
				onChangeText={setUsername}
			/>
			<Button
				title="Save Username"
				onPress={handleSave}
			/>
			<Button
				title="Remove Username"
				onPress={handleRemove}
				color="red"
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10,
		width: "80%",
	},
});
