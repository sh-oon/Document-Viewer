import useAsyncStorage from "@/lib/useAsyncStorage";
import { useEffect, useState } from "react";

import { ColorSchemeName, useColorScheme } from "react-native";
export { useColorScheme };

export type TAppTheme = "light" | "dark" | "system";

export const useColorTheme = () => {
	const [storedTheme, setStoredTheme, resetStoredTheme] = useAsyncStorage<TAppTheme>("@user_theme", "light");
	const [theme, setTheme] = useState<ColorSchemeName>("light");
	const systemTheme = useColorScheme();

	useEffect(() => {
		if (storedTheme === "system") {
			setTheme(systemTheme);
		} else {
			setTheme(storedTheme);
		}
	}, [storedTheme]);

	useEffect(() => {
		console.log("theme", theme);
	}, [theme]);

	return { storedTheme, setStoredTheme, resetStoredTheme, state: theme };
};
