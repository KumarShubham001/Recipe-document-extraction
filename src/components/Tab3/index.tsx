import React from 'react';

import Status from './section1/index'

import Select from '../ui/select';
import Button from '../ui/button';

interface Option {
  value: string;
  label: string;
}

const dropdown1: Option[] = [
  {
    value: 'DOC-12345',
    label: 'DOC-12345'
  },
  {
    value: 'DOC-67890',
    label: 'DOC-67890'
  }
]

const Tab3: React.FC = () => {
  return (
    <>
      <div className='tab-header' style={{ justifyContent: "space-between" }}>
        <div className='form-element'>
          Selected document: <Select
            options={dropdown1}
            onChange={(e) => { console.log('changed', e) }}
            value='DOC-12345'
          />
        </div>
        <div className='form-element'>
          <Button>Download Tables</Button>
        </div>
      </div>
      <div className='tab-container'>
        <Status />
      </div>
    </>
  );
};

export default Tab3;