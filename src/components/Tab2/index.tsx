import React from 'react';

import Status from './section1/index'
import Second from './section2/index'
import Third from './section3/index'

import Select from '../ui/select';

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

const dropdown2: Option[] = [
  {
    value: 'recipe',
    label: 'Recipe'
  }
]

const Tab2: React.FC = () => {
  return (
    <>
      <div className='tab-header'>
        <div className='form-element'>
          Selected document: <Select
            options={dropdown1}
            onChange={(e) => { console.log('changed', e) }}
            value='DOC-12345'
          />
        </div>
        <div className='form-element'>
          Selected table: <Select
            options={dropdown2}
            onChange={(e) => { console.log('changed', e) }}
            value='recipe'
          />
        </div>
      </div>
      <div className='tab-container'>
        <Status />
        <section >
          <Second />
          <Third />
        </section>
      </div>
    </>
  );
};

export default Tab2;