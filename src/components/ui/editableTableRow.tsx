import React from "react";

export interface ColumnDef {
  key: string;
  header: string;
  type?: "input" | "select" | "readonly";
  options?: string[];
}

export interface EditableRowData {
  [key: string]: string | React.ReactNode;
}

export function getEditableRowData<T extends { [key: string]: any }>(
  data: T[],
  columns: ColumnDef[],
  updateRowField: (rowIndex: number, key: keyof T, value: string) => void,
  getActions?: (rowIndex: number) => React.ReactNode
): EditableRowData[] {
  return data.map((row, rowIndex) => {
    const renderedRow: EditableRowData = {};

    columns.forEach((col) => {
      const value = row[col.key];

      if (col.type === "select") {
        renderedRow[col.key] = value ? (
          value
        ) : (
          <select
            defaultValue=""
            onBlur={(e) =>
              updateRowField(rowIndex, col.key as keyof T, e.target.value)
            }
          >
            <option value="">Select</option>
            {col.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      } else if (col.type === "input") {
        renderedRow[col.key] = value ? (
          value
        ) : (
          <input
            defaultValue=""
            onBlur={(e) => updateRowField(rowIndex, col.key, e.target.value)}
          />
        );
      } else {
        renderedRow[col.key] = value;
      }
    });

    if (getActions) {
      renderedRow["actions"] = getActions(rowIndex);
    }

    return renderedRow;
  });
}
