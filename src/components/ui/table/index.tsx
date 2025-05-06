import React, { useEffect, useMemo, useState } from "react";
import styles from "./index.module.css";

interface TableProps<T> {
  data: T[];
  columns: {
    key: string;
    header: string;
  }[];
  editable?: boolean;
  truncateLength?: number;
  onChange?: (count: number) => void;
  editedCells?: number;
}

const Table = <T,>({ data, columns, editable, onChange, editedCells, truncateLength = 50 }: TableProps<T>) => {
  const [changedCellKeys, setChangedCellKeys] = useState<Set<string>>(new Set());
  const [originalData, setOriginalData] = useState<any>(structuredClone(data));

  const truncateText = (text: string | number, length: number) => {
    const stringText = String(text);
    if (stringText.length > length) {
      return stringText.substring(0, length) + "...";
    }
    return stringText;
  }

  const handleBlur = (e: React.FocusEvent<HTMLTableCellElement>, row: T, column: { key: string; header: string }) => {
    // format the data
    const newValue = e.currentTarget.textContent || '';
    (row[column.key as keyof T] as any) = newValue;
    if (editable) {
      e.currentTarget.style.whiteSpace = 'normal'; // Reset white-space on blur
      e.currentTarget.textContent = truncateText(newValue, truncateLength);
      e.currentTarget.title = newValue;
    }

    // track the change made in the cell
    if (editable && originalData[parseInt(e.currentTarget.dataset.index!)] && String(originalData[parseInt(e.currentTarget.dataset.index!)][e.currentTarget.dataset.key! as keyof T]) && String(originalData[parseInt(e.currentTarget.dataset.index!)][e.currentTarget.dataset.key! as keyof T]) !== newValue) {
      const cellKey = `${e.currentTarget.dataset.index}-${e.currentTarget.dataset.key}`;
      if (!changedCellKeys.has(cellKey)) {
        setChangedCellKeys(prev => new Set(prev).add(cellKey));
      }
    }
  }

  // emit the change
  useEffect(() => {
    onChange && onChange([...changedCellKeys].length);
  }, [changedCellKeys]);

  // reset the changed cells when editedCells is reset
  useEffect(() => {
    if (!editedCells) {
      setChangedCellKeys(new Set());
    }
  }, [editedCells])

  const handleFocus = (e: React.FocusEvent<HTMLTableCellElement>) => {
    if (editable) {
      e.currentTarget.style.whiteSpace = 'normal';
      e.currentTarget.textContent = String(e.currentTarget.textContent).replace(/…$/, '');
      e.currentTarget.title = '';
      e.currentTarget.focus();
      e.currentTarget.textContent = String(data[parseInt(e.currentTarget.dataset.index!)][e.currentTarget.dataset.key! as keyof T]);
    }
  };

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
      <tbody>
        {
          data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? styles["bg-dark"] : styles["bg-light"]}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  data-key={column.key}
                  data-index={index}
                  className={`${styles["border"]} ${changedCellKeys.has(`${index}-${column.key}`) ? styles.modified : ''}`}

                  contentEditable={editable}
                  suppressContentEditableWarning={true}
                  onFocus={handleFocus}
                  onBlur={(event) => handleBlur(event as React.FocusEvent<HTMLTableCellElement>, row, column)}
                  title={String(row[column.key as keyof T])}
                >
                  {!row[column.key as keyof T] && ""}
                  {row[column.key as keyof T] && !editable || (editable && typeof document !== 'undefined' && document.activeElement !== document.querySelector(`[data-index="${index}"][data-key="${column.key}"]`)) ? truncateText(String(row[column.key as keyof T]), truncateLength) : String(row[column.key as keyof T])}
                </td>
              ))}
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default Table;