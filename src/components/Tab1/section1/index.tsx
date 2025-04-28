import React from 'react';

import Button from '../../ui/button';
import Dropzone from '../../ui/dropzone';

import Table from '../../ui/table';

import Select from '../../ui/select';
import styles from './style.module.css';

interface Option {
  value: string;
  label: string;
}

interface DocumentData {
  slNo: number;
  documentId: string;
  documentName: string;
  uploadedOn: string;
  uploadedBy: string;
  validated: string;
}

const documentData: DocumentData[] = [
  { slNo: 1, documentId: 'DOC001', documentName: 'Document A', uploadedOn: '2023-10-26', uploadedBy: 'User 1', validated: 'Y' },
  { slNo: 2, documentId: 'DOC002', documentName: 'Document B', uploadedOn: '2023-10-27', uploadedBy: 'User 2', validated: 'N' },
  { slNo: 3, documentId: 'DOC003', documentName: 'Document C', uploadedOn: '2023-10-28', uploadedBy: 'User 3', validated: 'Y' },
  { slNo: 4, documentId: 'DOC004', documentName: 'Document D', uploadedOn: '2023-10-29', uploadedBy: 'User 4', validated: 'N' },
  { slNo: 5, documentId: 'DOC005', documentName: 'Document E', uploadedOn: '2023-10-30', uploadedBy: 'User 5', validated: 'Y' },
];

const tableColumns = [ {key: "slNo",header: "Sl No"},{key: "documentId",header: "Document ID"},{key: "documentName",header: "Document name"},{key: "uploadedOn",header: "Uploaded on"},{key: "uploadedBy",header: "Uploaded by"},{key: "validated",header: "Validated (Y/N)"}];

const previouslyUploadedDocList: Option[] = [
  {
    value: 'DOC-12345',
    label: 'DOC-12345'
  },
  {
    value: 'DOC-67890',
    label: 'DOC-67890'
  }
]

const Status = () => {
  const selectionChange = (file) => {
    console.log(file);
  }

  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>
        Select / Upload document
      </h4>
      <div>
        {/* <Input type="file" /> */}
        <Dropzone
          onFileChange={selectionChange}
          text="Click here to upload a recipe document (Word / PDF)"
        />
      </div>

      {/* Previous Uploads Section */}
      <div>
        <div style={{ marginTop: '1em' }}>
          Select a previously uploaded document: &nbsp;
          <Select
            options={previouslyUploadedDocList}
            onChange={(e) => { console.log('changed', e) }}
            value='DOC-12345'
          />
        </div>
        <p className={styles.previousUploadTitle}>
          Previous Uploads:
        </p>
        <Table data={documentData} columns={tableColumns} />

      </div>
      <Button className="full-width">Submit</Button>
    </section>
  )
}

export default Status