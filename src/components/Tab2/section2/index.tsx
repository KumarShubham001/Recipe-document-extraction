import React from 'react';

import Button from './../../ui/button/index'
import styles from './style.module.css';
import ProgressBar from '../../ui/progressBar';
import Select from '../../ui/select';

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
  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>
        Page(s) from which attribute was extracted
      </h4>
      <div className='container'>
        <div className='form-element'>
          Selected attribute: <Select
            options={previouslyUploadedDocList}
            onChange={(e) => { console.log('changed', e) }}
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