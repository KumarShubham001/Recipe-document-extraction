import React from 'react';
import { fetchWithBaseUrl } from '../../../api';

import Select from '../../ui/select';
import styles from './style.module.css';

interface Option {
  value: string;
  label: string;
}

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

const Second: React.FC = () => {
  const handleSelectChange = (e: string) => {
    console.log('changed', e);
    // Example: Use _fetchJson to make an API call here
    fetchWithBaseUrl(`/api/some-endpoint?docId=${e}`, { method: 'GET' }).then((response) => { console.log(response) });
  };
  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>
        Page(s) from which attribute was extracted
      </h4>
      <div className='container'>
        <div className='form-element'>
          Selected attribute: <Select
            options={previouslyUploadedDocList}
            onChange={handleSelectChange}
            value='DOC-12345'
          />
        </div>
        <div className='inner-container'>
          <a href="">Go to Page in document</a>
        </div>
      </div>
    </section>
  );
};

export default Second;