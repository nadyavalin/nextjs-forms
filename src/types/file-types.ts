// Тип для совместимости с Yup
export interface FileList {
  readonly length: number;
  item(index: number): File | null;
  [index: number]: File;
}

declare global {
  interface Window {
    FileList: typeof FileList;
  }
}