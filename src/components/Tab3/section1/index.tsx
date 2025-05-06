import React, { useEffect, useState } from 'react';


import { getValidatedOutputTables } from '../../../api';
import { useDocument } from '../../../context/DocumentContext';
import Table from '../../ui/table';
import styles from './style.module.css';

const Status = ({ selectedDoc }) => {
  const { setIsLoading } = useDocument();
  const [validatedTables, setValidatedTables] = useState<any>([])

  const fetchValidatedTables = async (docId) => {
    try {
      setIsLoading(true);
      const { validated_tables } = await getValidatedOutputTables({
        "document_id": docId
      });
      const tableData = validated_tables.map(table => {
        const cols = table.columns.map(e => ({ key: String(e).trim(), header: String(e).trim() }));
        const rows = table.rows.map(row => {
          const data = {};
          cols.forEach((col, index) => {
            data[col.key] = row[index];
          });
          return data;
        });
        return { columns: cols, rows: rows, table_name: table.table_name }
      })

      console.log(tableData)
      setValidatedTables(tableData);
    }
    catch (e) {
      console.error(e)
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (selectedDoc) {
      fetchValidatedTables(selectedDoc);
    }
  }, [selectedDoc])

  return (
    <section className={`${styles.main} full-width`} style={{ width: '100%' }}>
      <h4 className={styles.tabTitle}>
        Extracted Outputs (After validation)
      </h4>

      <div className={styles['table-container']}>
        {validatedTables.length > 0 && validatedTables.map((table, index) => (
          <div className='' key={index}>
            <p className={styles.previousUploadTitle}>
              <b>{table.table_name} :</b>
            </p>
            <div>
              <Table data={table.rows} columns={table.columns} />
            </div>
          </div>
        ))}
        {validatedTables.length === 0 && <p className="text-center">
          Please select a document from the drop-down to view the extracted and validated outputs.
        </p>}
      </div>
    </section>
  )
}

export default Status