import React, { useEffect } from 'react';

import Button from '../../ui/button/index'
import styles from './style.module.css';

const Third: React.FC = () => {
  useEffect(() => {
  }, [])
  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>
        Prompt used to extract attribute
      </h4>
      <div className={styles.prompt}>
        Prompt used: <i>Extract the recipe ID (decument ID) from the below text</i>
      </div>
      <div className={styles.buttonContainerFlex}>
        <Button>Go back to initial prompt</Button>
        <Button className="full-width">Re-generate output based on updated prompt</Button>
      </div>
    </section>
  );
};

export default Third;