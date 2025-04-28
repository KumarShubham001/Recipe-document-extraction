import React from 'react';
import styles from './style.module.css';
import Table from '../../ui/table';

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

const documentData1: DocumentData1 = [{
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

const Status = () => {
  return (
    <section className={styles.main} style={{ width: '100%' }}>
      <h4 className={styles.tabTitle}>
        Extracted Outputs (After validation)
      </h4>

      <div className=''>
        <p className={styles.previousUploadTitle}>
          Recipe table:
        </p>
        <div>
          <Table data={documentData1} columns={tableColumns1} />
        </div>
      </div>

      <div className=''>
        <p className={styles.previousUploadTitle}>
          Unit operation table:
        </p>
        <div>
          <Table data={documentData2} columns={tableColumns2} />
        </div>
      </div>

    </section>
  )
}

export default Status