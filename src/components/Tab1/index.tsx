import React from 'react';

import First from './section1/index'
import Second from './section2/index'

const Tab1: React.FC = () => {
  return (
    <div className='tab-container'>
      <First />
      <Second />
    </div>
  );
};

export default Tab1;