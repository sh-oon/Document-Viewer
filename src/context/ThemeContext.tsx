import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TTheme = "light" | "dark";

type ThemeContextType = {
	theme: TTheme;
	setTheme: (theme: TTheme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	setTheme: () => {},
});

export const ThemedProvider = ({ children }: PropsWithChildren) => {
	const [theme, setTheme] = useState<TTheme>("light");

	useEffect(() => {
		const fetchTheme = async () => {
			try {
				const storedTheme = await AsyncStorage.getItem("@user_theme");
				if (storedTheme) {
					setTheme(storedTheme as TTheme);
				}
			} catch (error) {
				console.error("Failed to fetch theme from AsyncStorage:", error);
			}
		};

		fetchTheme();
	}, []);

	useEffect(() => {
		const saveTheme = async () => {
			try {
				await AsyncStorage.setItem("@user_theme", theme);
			} catch (error) {
				console.error("Failed to save theme to AsyncStorage:", error);
			}
		};

		saveTheme();
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
