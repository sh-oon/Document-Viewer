export type TDataCapacityUnit =
  | "B"
  | "KB"
  | "MB"
  | "GB"
  | "TB"
  | "PB"
  | "EB"
  | "ZB"
  | "YB";

export function convertDataCapacity(bytes: number): string {
  const units: TDataCapacityUnit[] = [
    "B",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB",
    "EB",
    "ZB",
    "YB",
  ];
  let unitIndex = 0;
  let size = bytes;
  while (size >= 1024) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}
