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
  onChange?: (data: T[], count: number) => void;
  editedCells?: number;
}

const truncateText = (text: string | number, length: number) => {
  const stringText = String(text);
  if (stringText.length > length) {
    return stringText.substring(0, length) + "...";
  }
  return stringText;
}

const Table = <T,>({ data, columns, editable, onChange, editedCells, truncateLength = 50 }: TableProps<T>) => {
  const [changedCellKeys, setChangedCellKeys] = useState<Set<string>>(new Set());
  const [originalData, setOriginalData] = useState<any>(structuredClone(data));

  // emit the change
  useEffect(() => {
    onChange && onChange(data, [...changedCellKeys].length);
  }, [changedCellKeys]);

  // reset the changed cells when editedCells is reset
  useEffect(() => {
    if (!editedCells) {
      setChangedCellKeys(new Set());
    }
  }, [editedCells])

  const handleDeleteRow = (index: number, forceDelete: boolean = false) => {
    if (data.length === 1 && !forceDelete) {
      if (confirm('Are you sure you want to delete the last row?')) {
        handleDeleteRow(index, true);
      }
    }
    else if (data.length > 1 || forceDelete) {
      data.splice(index, 1);
      onChange && onChange(data, [...changedCellKeys].length);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLTableCellElement>) => {
    // format the data
    const newValue = e.currentTarget.textContent?.trim() || "";
    // (row[column.key as keyof T] as any) = newValue;
    const rowIndex = parseInt(e.currentTarget.dataset.index || "-1", 10);
    const colKey = e.currentTarget.dataset.key || "";

    if (editable && rowIndex >= 0 && colKey) {
      e.currentTarget.style.whiteSpace = "normal"; // Reset white-space on blur
      e.currentTarget.textContent = truncateText(newValue, truncateLength);
      e.currentTarget.title = newValue;
      data[rowIndex][colKey] = newValue;
    }

    // track the change made in the cell
    if (editable && originalData[parseInt(e.currentTarget.dataset.index!)] && String(originalData[parseInt(e.currentTarget.dataset.index!)][e.currentTarget.dataset.key! as keyof T]) !== newValue) {
      const cellKey = `${rowIndex}-${colKey}`;
      // const cellKey = `${e.currentTarget.dataset.index}-${e.currentTarget.dataset.key}`;
      if (!changedCellKeys.has(cellKey)) {
        setChangedCellKeys((prev) => new Set(prev).add(cellKey));
      }
    }
  };

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
    <>
      {data.length > 0 &&
        <div className={styles['table-container']}>
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
                {editable && <th className={`${styles["border"]}`}>Actions</th>}
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
                        onBlur={(event) => handleBlur(event as React.FocusEvent<HTMLTableCellElement>)}
                        title={String(row[column.key as keyof T])}
                      >
                        {!row[column.key as keyof T] && ""}
                        {row[column.key as keyof T] && !editable || (editable && typeof document !== 'undefined' && document.activeElement !== document.querySelector(`[data-index="${index}"][data-key="${column.key}"]`)) ? truncateText(String(row[column.key as keyof T]), truncateLength) : String(row[column.key as keyof T])}
                      </td>
                    ))}
                    {editable && <td className={`${styles["action-container"]} ${styles["border"]}`}>
                      <a href="#" onClick={() => handleDeleteRow(index)}>
                        <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>
                      </a>
                    </td>}
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      }
      {data.length === 0 && <p className="text-center">No table rows available</p>}
    </>
  );
};

export default Table;