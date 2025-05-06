import React, { useEffect, useState } from "react";
import { useDocument } from "../../../context/DocumentContext";

// APIs
import {
  uploadDocument,
  submitDocument,
  getPreviousUploads,
} from "./../../../api";

// UI components

import Button from "../../ui/button";
import Dropzone from "../../ui/dropzone";
import Table from "../../ui/table";
import Select from "../../ui/select";
import Toast from "../../ui/toast";

// styles
import styles from "./style.module.css";
import { useAuth } from "../../../context/AuthContext";

// interfaces
interface Option {
  value: string;
  label: string;
}

interface DocumentData {
  slNo: number;
  document_id: string;
  document_name: string;
  uploaded_on: string;
  uploaded_by: string;
  validated: string;
}

const tableColumns = [
  { key: "slNo", header: "Sl No" },
  { key: "document_id", header: "Document ID" },
  { key: "document_name", header: "Document name" },
  { key: "uploaded_on", header: "Uploaded on" },
  { key: "uploaded_by", header: "Uploaded by" },
  { key: "validated", header: "Validated (Y/N)" },
];

const Status = () => {
  const { setDocumentId, setIsLoading } = useDocument();
  const { username } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const dropzoneRef = React.useRef<{ clearFile: () => void } | null>(null);

  // for dropdown
  const [previousUploadList, setPreviousUploadList] = useState<Option[]>([]);

  // curr selected dropdown
  const [selectedFileIdFromPrevList, setSelectedFileIdFromPrevList] = useState<
    string | undefined
  >(undefined);

  // to show in the table
  const [previousUploadsTable, setPreviousUploadsTable] = useState<
    DocumentData[]

  >([]);

  const updatepreviousuploadlist = (docList) => {
    const list = docList.map((e, idx) => ({
      ...e,
      slNo: idx + 1,
      validated: e.validated ? "Y" : "N",
    }));
    setPreviousUploadsTable(list);

    // extract the list of document IDs from the table list
    const docIds: Option[] = list.map((item) => {
      return {
        value: item.document_id,
        label:
          item.document_name.charAt(0).toUpperCase() +
          item.document_name.slice(1),
      };
    });
    setPreviousUploadList(docIds);
  };

  useEffect(() => {
    const _init = async () => {
      setIsLoading(true);
      // use the fetch API call to get the previous upload list
      const docList = await getPreviousUploads();
      updatepreviousuploadlist(docList.documents);
      setIsLoading(false);
    };
    _init();

    return () => {
      // Clear the file when the component unmounts
      if (dropzoneRef.current) {
        dropzoneRef.current.clearFile();
      }
    };
  }, []);

  const startExtraction = () => {
    console.log(`Dispatching a new event: "startExtraction"`);
    document.dispatchEvent(new Event("startExtraction"));
  };

  const submitClickHandler = async (e) => {
    e.preventDefault();

    if (selectedFile || selectedFileIdFromPrevList) {
      try {
        setIsLoading(true);
        if (selectedFile) {
          const uploadResponse = await uploadDocument({
            file: selectedFile,
            username: username,
          });

          if (uploadResponse.uploaded_file) {
            setDocumentId(uploadResponse.uploaded_file.file_id);
          }
          if (uploadResponse.previous_uploads) {
            updatepreviousuploadlist(uploadResponse.previous_uploads);
          }
        } else if (selectedFileIdFromPrevList) {
          const submitDocumentResponse = await submitDocument({
            document_id: selectedFileIdFromPrevList,
            document_name: previousUploadsTable.find(
              (item) => item.document_id === selectedFileIdFromPrevList
            )?.document_name,
            submitted_by: username,
          });
          setDocumentId(String(submitDocumentResponse.document_id));
        }

        startExtraction();
      } catch (error) {
        console.error("Error:", error);
      }
      finally {
        setIsLoading(false)
      }
    }
  };

  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>Select / Upload document</h4>
      <form onSubmit={submitClickHandler}>
        <div style={{ position: "relative" }}>
          <Dropzone
            ref={dropzoneRef}
            onFileChange={(file) => setSelectedFile(file)}
            text="Click here to upload a recipe document (Word / PDF)"
          />
          {selectedFile && (
            <p>
              Selected file: {selectedFile.name} &nbsp;{" "}
              <span
                className="link"
                onClick={() => {
                  setSelectedFile(null);
                  dropzoneRef.current && dropzoneRef.current.clearFile();
                }}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  viewBox="0 0 16 16"
                  height="10px"
                  width="10px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path>
                </svg>
              </span>
            </p>
          )}
        </div>

        {/* Previous Uploads Section */}
        <div>
          <div style={{ marginTop: "1em" }}>
            Select a previously uploaded document: &nbsp;
            <Select
              className="wide-select"
              options={previousUploadList}
              onChange={(e: string) => setSelectedFileIdFromPrevList(e)}
              value={selectedFileIdFromPrevList}
              disabled={!!selectedFile || previousUploadsTable.length === 0}
            />
          </div>
          <p className={styles.previousUploadTitle}>Previous Uploads:</p>
          {previousUploadsTable.length > 0 && <Table data={previousUploadsTable} columns={tableColumns} />}
          {previousUploadsTable.length === 0 && <p>No previous uploads found!</p>}
        </div>
        <Button
          disabled={!selectedFile && !selectedFileIdFromPrevList}
          type="button"
          className="full-width"
          onClick={submitClickHandler}
        >
          Submit
        </Button>
      </form>
    </section>
  );
};

export default Status;
