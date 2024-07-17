import * as FileSystem from "expo-file-system";

export const ensureFolderExists = async (folderPath: string) => {
	try {
		const folderInfo = await FileSystem.getInfoAsync(folderPath);
		if (!folderInfo.exists) {
			await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
		}
	} catch (error) {
		console.error(`Failed to ensure folder exists at ${folderPath}:`, error);
		throw error; // 오류 처리를 호출하는 측으로 위임
	}
};

export const fetchFilesInFolder = async <T,>(path: string, setter: (arg: T[]) => void) => {
	try {
		const filesInfo = await FileSystem.readDirectoryAsync(path);
		const fileInfoArray = await Promise.all(
			filesInfo.map(async (fileName) => {
				const fileInfo = await FileSystem.getInfoAsync(path + fileName);
				return {
					name: fileName,
					extension: fileName.split(".").pop() as "pdf" | "txt",
					info: fileInfo,
				} as T;
			})
		);

		setter(fileInfoArray);
	} catch (error) {
		console.error("Failed to fetch files:", error);
	}
};

export const clearCache = async <T,>(path: string, setter: (args: T[]) => void) => {
	try {
		await FileSystem.deleteAsync(path, { idempotent: true });
		setter([]);
	} catch (error) {
		console.error("Failed to clear cache:", error);
	}
};
