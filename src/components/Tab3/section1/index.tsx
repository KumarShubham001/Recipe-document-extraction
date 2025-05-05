import React, { useEffect, useState } from 'react';


import Table from '../../ui/table';
import styles from './style.module.css';
import { useDocument } from '../../../context/DocumentContext';
import { downloadValidatedOutputTables, getValidatedOutputTables } from '../../../api';

interface DocumentData1 {
  recipeId: string;
  recipeTitle: string;
  recipeVersion: number;
  recipeType: string;
  product: string;
  status: string;
  description: string;
  approvedDate?: string;
}

const documentData1: DocumentData1[] = [{
  recipeId: 'REC-98765',
  recipeTitle: 'Generic Biologics Downstream process',
  recipeVersion: 1,
  recipeType: 'Site-Specific',
  product: 'Generic Biologics',
  status: '',
  description: '',
  approvedDate: '3/3/2025'
}];

const tableColumns1 = [
  { key: "recipeId", header: "Recipe Id" },
  { key: "recipeTitle", header: "Recipe Title" },
  { key: "recipeVersion", header: "Recipe Version" },
  { key: "recipeType", header: "Recipe Type" },
  { key: "product", header: "Product" },
  { key: "status", header: "Status of the Recipe" },
  { key: "description", header: "Description" },
  { key: "approvedDate", header: "Approved Date" },
];

interface DocumentData2 {
  unitOperationId: number;
  recipeId: string;
  unitOpeartionName: string;
  unitOperationType: string;
  titleOfMBR: string;
  sequenceNumber: number;
}

const documentData2: DocumentData2[] = [
  {
    unitOperationId: 1,
    recipeId: 'DOC-12345',
    unitOpeartionName: 'Protein A Chromatography',
    unitOperationType: 'Chromatography',
    titleOfMBR: 'Protein A Chromatography IP-XXX',
    sequenceNumber: 1
  },
];

const tableColumns2 = [
  { key: "unitOperationId", header: "Unit Operation Id" },
  { key: "recipeId", header: "Recipe Id" },
  { key: "unitOpeartionName", header: "Unit Opeartion Name" },
  { key: "unitOperationType", header: "Unit Operation Type" },
  { key: "titleOfMBR", header: "Title Of MBR" },
  { key: "SequenceNumber", header: "Sequence Number" },
];

const tableList = [
  {
    title: 'Recipe table',
    data: documentData1,
    columns: tableColumns1
  },
  {
    title: 'Unit operation table',
    data: documentData2,
    columns: tableColumns2
  },
  {
    title: 'Monitoring Points table',
    data: documentData2,
    columns: tableColumns2
  },
  {
    title: 'Activity table',
    data: documentData2,
    columns: tableColumns2
  },
  {
    title: 'Parameters table',
    data: documentData2,
    columns: tableColumns2
  },
  {
    title: 'Material table',
    data: documentData2,
    columns: tableColumns2
  },
  {
    title: 'Unit operation material table',
    data: documentData2,
    columns: tableColumns2
  },
  {
    title: 'Sampling point table',
    data: documentData2,
    columns: tableColumns2
  },
  {
    title: 'Equipment master table',
    data: documentData2,
    columns: tableColumns2
  },
  {
    title: 'Unit operation equipment table',
    data: documentData2,
    columns: tableColumns2
  },
  {
    title: 'Parameters general table',
    data: documentData2,
    columns: tableColumns2
  },
  {
    title: 'Unit operation comment table',
    data: documentData2,
    columns: tableColumns2
  }
]

const Status = ({ selectedDoc }) => {
  const { setIsLoading } = useDocument();
  const [validatedTables, setValidatedTables] = useState<any>([])

  const fetchValidatedTables = async (docId) => {
    try {
      setIsLoading(true);
      const data = {
        "document_id": docId
      }

      // const { validated_tables } = await getValidatedOutputTables(data);

      const { validated_tables } = {
        "validated_tables": [
          {
            "table_name": "Recipe table",
            "columns": [
              "DOCUMENT_ID",
              "DOCUMENT_NAME",
              "VERSION",
              "DOCUMENT_TYPE",
              "PRODUCT",
              "DESCRIPTION",
              "APPROVED_DATE"
            ],
            "rows": [
              [
                "Doc-12345",
                "Generic Biologics Example Site Specific Downstream Process Description",
                "1",
                "Site Specific Downstream Process Description",
                "Generic Biologic",
                "This document describes the drug substance manufacturing (Indicate is molecule is Drug Substance or a mAb Intermediate) operations for Generic Biologics from protein A chromatography through drug substance storage for the Pharma Biologics manufacturing facility. The downstream manufacturing process concludes at the transfer of drug substance from the initial -80°C freeze to drug substance storage at -30°C",
                "03 March 2025"
              ]
            ]
          }
        ]
      }

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
    <section className={styles.main} style={{ width: '100%' }}>
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