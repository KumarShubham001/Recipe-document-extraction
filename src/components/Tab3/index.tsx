import React, { useEffect, useState } from 'react';

import First from './section1/index'

import Select from '../ui/select';
import Button from '../ui/button';
import { useDocument } from '../../context/DocumentContext';
import { downloadValidatedOutputTables, getPreviousUploads } from '../../api';

interface Option {
  value: string;
  label: string;
}

const Tab3: React.FC = () => {
  const { documentId, setDocumentId, setIsLoading } = useDocument();
  const [previousUploadsOptions, setPreviousUploadsOptions] = useState<Option[]>([]);

  const updatepreviousuploadlist = (docList) => {
    // extract the list of document IDs from the table list
    const docIds: Option[] = docList.map((item) => {
      return {
        value: item.document_id,
        label:
          item.document_id.charAt(0).toUpperCase() +
          item.document_id.slice(1),
      };
    });
    setPreviousUploadsOptions(docIds);
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
  }, []);

  const downloadValidatedTables = async () => {
    try {
      setIsLoading(true);
      const data = {
        "document_id": documentId,

      }
      const res = await downloadValidatedOutputTables(data);
      console.log(res);
    }
    catch (e) {
      console.error(e)
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='tab-header' style={{ justifyContent: "space-between" }}>
        <div className='form-element'>
          Selected document: <Select
            options={previousUploadsOptions}
            onChange={(e) => { setDocumentId(e) }}
            value={documentId || undefined}
          />
        </div>
        <div className='form-element'>
          <Button disabled={!documentId} onClick={downloadValidatedTables} className="full-width primary icon-button">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></svg>
            Download Tables
          </Button>
        </div>
      </div>
      <div className='tab-container'>
        <First selectedDoc={documentId} />
      </div>
    </>
  );
};

export default Tab3;