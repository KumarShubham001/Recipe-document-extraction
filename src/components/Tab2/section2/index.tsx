import React, { useEffect, useState } from 'react';
import { fetchWithBaseUrl, getAttributeSourcePage, getExtractedOutputs } from '../../../api';

import Select from '../../ui/select';
import styles from './style.module.css';
import { useDocument } from '../../../context/DocumentContext';

interface Option {
  value: string;
  label: string;
}

const Second = ({ selectedDocument, selectedTable, selectedAttribute, onAttriChange }) => {
  const { setIsLoading } = useDocument();
  const [attriOptions, setAttriOptions] = useState<Option[]>([])
  const [pageDetails, setPageDetails] = useState<any>()

  useEffect(() => {
    const fetchPagedetails = async (attri) => {
      try {
        setIsLoading(true);
        const { source_page } = await getAttributeSourcePage(selectedDocument, attri);
        setPageDetails(source_page);
      }
      catch (e) {
        console.error(e)
      }
      finally {
        setIsLoading(false);
      }
    }

    if (selectedAttribute) {
      fetchPagedetails(selectedAttribute);
    }
  }, [selectedAttribute]);

  useEffect(() => {
    async function fetchData() {
      const { outputs } = await getExtractedOutputs(selectedDocument, selectedTable);
      console.log(outputs)
      const attriOptions = outputs.map(output => ({
        value: output.attribute,
        label: output.attribute
      }))
      setAttriOptions(attriOptions);
      setIsLoading(false);
    }

    if (selectedDocument && selectedTable) {
      setIsLoading(true)
      fetchData();
    }
  }, [selectedDocument, selectedTable]);

  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>
        Page(s) from which attribute was extracted
      </h4>
      <div className='container'>
        <div className='form-element'>
          Selected attribute: <Select
            options={attriOptions}
            onChange={onAttriChange}
            value={selectedAttribute}
          />
        </div>
        <div className='inner-container'>
          {pageDetails && <>
            <div className={styles['page-outline']}>
              <p>Page no. {pageDetails.page_no}</p>
              <div className={styles['page-section']}>
                <p>{pageDetails.page_content}</p>

              </div>
              <p>
                {pageDetails.page_link && <a href={pageDetails.page_link}>Go to Page in document</a>}
              </p>
            </div>
          </>}
          {!pageDetails && <p>Select an attribute to view the page details</p>}
        </div>
      </div>
    </section>
  );
};

export default Second;