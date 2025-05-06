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
  const { documentId, setIsLoading } = useDocument();
  const [previousUploadsOptions, setPreviousUploadsOptions] = useState<Option[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<string>("");

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
    if (documentId) {
      setSelectedDoc(documentId);
    }
  }, [documentId]);

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
        "document_id": selectedDoc,
        
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
            onChange={(e) => { setSelectedDoc(e) }}
            value={selectedDoc}
          />
        </div>
        <div className='form-element'>
          <Button disabled={!selectedDoc} onClick={downloadValidatedTables}>Download Tables</Button>
        </div>
      </div>
      <div className='tab-container'>
        <First selectedDoc={selectedDoc} />
      </div>
    </>
  );
};

export default Tab3;