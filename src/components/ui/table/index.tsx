import React, { useMemo } from "react";
import styles from "./index.module.css";

interface TableProps<T> {
  data: T[];
  columns: {
    key: string;
    header: string;
  }[];
  editable?: boolean;
}

const Table = <T,>({ data, columns, editable }: TableProps<T>) => {
  const tableRows = useMemo(() => {
    return data.map((row, index) => (
      <tr
        key={index}
        className={index % 2 === 0 ? styles["bg-dark"] : styles["bg-light"]}
      >
        {columns.map((column) => (
          <td
            key={column.key}
            className={styles["border"]}
            contentEditable = {editable}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              const newValue = e.currentTarget.textContent || "";
              row[column.key] = newValue;
            }}
          >
            {row[column.key]}
          </td>
        ))}
      </tr>
    ));
  }, [data, columns]);

  return (
    <table
      className={`${styles["table-auto"]} ${styles["w-full"]} ${styles["border-collapse"]} ${styles["border"]} ${styles["custom-table"]}`}
    >
      <thead>
        <tr className={styles["bg-header"]}>
          {columns.map((column) => (
            <th key={column.key} className={`${styles["border"]}`}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default Table;