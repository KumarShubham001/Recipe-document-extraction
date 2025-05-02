import React, { useEffect, useState } from 'react';
import { useDocument } from '../../../context/DocumentContext';

// APIs
import { uploadDocument, submitDocument, getPreviousUploads } from './../../../api';

// UI components

import Button from '../../ui/button';
import Dropzone from '../../ui/dropzone';
import Table from '../../ui/table';
import Select from '../../ui/select';

// styles
import styles from './style.module.css';
import { useAuth } from '../../../context/AuthContext';

// interfaces
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

const tableColumns = [{ key: "slNo", header: "Sl No" }, { key: "documentId", header: "Document ID" }, { key: "documentName", header: "Document name" }, { key: "uploadedOn", header: "Uploaded on" }, { key: "uploadedBy", header: "Uploaded by" }, { key: "validated", header: "Validated (Y/N)" }];

// const previouslyUploadedDocList: Option[] = [
//   {
//     value: 'DOC-12345',
//     label: 'DOC-12345'
//   },
//   {
//     value: 'DOC-67890',
//     label: 'DOC-67890'
//   }
// ]

const Status = () => {
  const { documentId, setDocumentId } = useDocument();
  const { username } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const dropzoneRef = React.useRef<{ clearFile: () => void } | null>(null);
  // for dropdown
  const [previousUploadList, setPreviousUploadList] = useState<Option[]>([]);
  // curr selected dropdown
  const [selectedFileIdFromPrevList, setSelectedFileIdFromPrevList] = useState<string | undefined>(undefined);
  // to show in the table
  const [previousUploadsTable, setPreviousUploadsTable] = useState<DocumentData[]>(documentData)

  const updatepreviousuploadlist = (docList) => {
    setPreviousUploadsTable(docList);

    // extract the list of document IDs from the table list
    const docIds: Option[] = docList.map((item) => {
      return {
        value: item.documentId,
        label: item.documentId.charAt(0).toUpperCase() + item.documentId.slice(1)
      }
    })
    setPreviousUploadList(docIds);
  }

  useEffect(() => {
    const _init = async () => {
      // use the fetch API call to get the previous upload list
      // const docList = await getPreviousUploads();
      updatepreviousuploadlist(documentData);
    };
    _init();

    return () => {
      // Clear the file when the component unmounts
      if (dropzoneRef.current) {
        dropzoneRef.current.clearFile();
      }
    }
  }, [])

  const startExtraction = () => {
    document.dispatchEvent(new Event('startExtraction'));
  };

  const submitClickHandler = async (e) => {
    e.preventDefault();

    if (selectedFile || selectedFileIdFromPrevList) {
      try {
        if (selectedFile) {
          const uploadResponse = await uploadDocument({
            "file": selectedFile,
            "username": username
          })
          console.log(uploadResponse)
          if (uploadResponse.uploaded_file) {
            setDocumentId(uploadResponse.uploaded_file.file_id)
          }
          if (uploadResponse.previous_uploads) {
            updatepreviousuploadlist(uploadResponse.previous_uploads);
          }
        }

        else if (selectedFileIdFromPrevList) {
          const submitDocumentResponse = await submitDocument({
            "document_id": selectedFileIdFromPrevList,
            "document_name": previousUploadsTable.find((item) => item.documentId === selectedFileIdFromPrevList)?.documentName,
            "submitted_by": username
          })
          setDocumentId(submitDocumentResponse?.document_id)
        }

        startExtraction();
      }
      catch (error) {
        console.error('Error:', error);
      }
    }
  }

  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>
        Select / Upload document
      </h4>
      <form onSubmit={submitClickHandler}>
        <div style={{ position: "relative" }}>
          <Dropzone
            ref={dropzoneRef}
            onFileChange={(file) => setSelectedFile(file)}
            text="Click here to upload a recipe document (Word / PDF)"
          />
          {selectedFile && <p>Selected file: {selectedFile.name} &nbsp; <span className='link' onClick={() => {
            setSelectedFile(null);
            dropzoneRef.current && dropzoneRef.current.clearFile();
          }}><svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="10px" width="10px" xmlns="http://www.w3.org/2000/svg"><path d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path></svg></span></p>}
        </div>

        {/* Previous Uploads Section */}
        <div>
          <div style={{ marginTop: '1em' }}>
            Select a previously uploaded document: &nbsp;
            <Select
              options={previousUploadList}
              onChange={(e: string) => setSelectedFileIdFromPrevList(e)}
              value={selectedFileIdFromPrevList}
              disabled={!!selectedFile}
            />
          </div>
          <p className={styles.previousUploadTitle}>
            Previous Uploads:
          </p>
          <Table data={previousUploadsTable} columns={tableColumns} />

        </div>
        <Button disabled={!selectedFile && !selectedFileIdFromPrevList} type="button" className="full-width" onClick={submitClickHandler}>Submit</Button>
      </form>
    </section>
  )
}

export default Status