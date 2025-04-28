import React from 'react';
import { useNavigate } from "react-router-dom";

import Button from '../../ui/button/index'
import styles from './style.module.css';
import ProgressBar from '../../ui/progressBar';

const extractLogs = [
  "Text and Tables Extracted",
  "XX Attributes Extracted",
  "Time Elapsed: XX min"
]

const Second: React.FC = () => {
  const navigate = useNavigate();

  function navigateToTab2() {
    navigate("/validation");
  }

  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>
        Status Update on Extraction
      </h4>
      <div>
        <div className=''>
          <ProgressBar progress={50} />
        </div>
        <p>Extraction log
        </p>
        <ul className={styles.dashedList}>
          {
            extractLogs.map((log, idx) => <li key={idx}>{log}</li>)
          }
        </ul>
      </div>
      <Button onClick={navigateToTab2} className="full-width">Continue to validation</Button>
    </section>
  );
};

export default Second;