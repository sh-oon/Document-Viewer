import { FileInfo } from "expo-file-system";

export interface IDocument {
	uri: string;
	extention: "pdf" | "txt";
	lastModified: string;
	name: string;
	size: number;
	lastPosition: number;
	info: FileInfo;
}
