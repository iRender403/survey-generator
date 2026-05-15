export interface EditorItem {
  materialName: string;
  ComName: string;
}

export interface EditItemConfig {
  title: string,
  icon: React.ReactNode,
  list:EditorItem[],
}
