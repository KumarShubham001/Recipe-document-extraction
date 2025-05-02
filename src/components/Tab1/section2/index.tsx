import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { getExtractionLog, getExtractionStatus } from './../../../api'

import Button from '../../ui/button/index'
import styles from './style.module.css';
import ProgressBar from '../../ui/progressBar';
import { useDocument } from '../../../context/DocumentContext';

interface Log {
  "text_tables_extracted": string;
  "attributes_extracted": number;
  "time_elapsed": string;
}

const Second: React.FC = () => {
  const navigate = useNavigate();
  const { documentId } = useDocument();
  const progessInterval = useRef(0);
  const [progress, setProgress] = useState(0);
  const [extractLog, setExtractLog] = useState<Log | undefined>();

  // useEffect(() => {
  //   progessInterval.current = setInterval(() => {
  //     getExtractionStatus({ documentId: documentId }).then((res) => {
  //       console.log(res);
  //       setProgress(Number(res.status.progress))
  //     })
  //     getExtractionLog({ documentId: documentId }).then((res) => {
  //       console.log(res);
  //       setExtractLog(res.log)
  //     })
  //   }, 1000);

  //   return () => clearInterval(progessInterval.current)
  // }, [])

  function navigateToTab2() {
    navigate("/app/validation");
  }

  return (
    <section className={styles.main}>
      <h4 className={styles.tabTitle}>
        Status Update on Extraction
      </h4>
      <div>
        <div className=''>
          <ProgressBar progress={progress} />
        </div>
        <div>
          <p>Extraction log
          </p>
          <ul className={styles.dashedList}>
            <li>{extractLog?.text_tables_extracted} Text and Tables Extracted</li>
            <li>{extractLog?.attributes_extracted} Attributes Extracted</li>
            <li>Time Elapsed: {extractLog?.time_elapsed} min</li>
          </ul>
        </div>
        <Button onClick={navigateToTab2} className="full-width">Continue to validation</Button>
      </div>
    </section>
  );
};

export default Second;