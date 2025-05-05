export type ColumnConfig = {
  key: string;
  header: string;
  type: "input" | "select";
  options?: string[]; // for select columns
};

export type TableSchemaMap = {
  [tableName: string]: ColumnConfig[];
};
