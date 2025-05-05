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
  const documentInfo = useDocument();
  const progessInterval = useRef(0);
  const [startExtractionProcess, setStartExtractionProcess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractLog, setExtractLog] = useState<Log | undefined>();
  const [isExtractionCompleted, setIsExtractionCompleted] = useState(false);

  useEffect(() => {
    if (documentInfo.documentId && startExtractionProcess) {
      console.log(`Event triggered: "startExtraction"`);
      console.log("Startting extraction for doc with documentId ---->", documentInfo.documentId);

      if (progessInterval.current) {
        clearInterval(progessInterval.current);
      }

      progessInterval.current = setInterval(() => {
        getExtractionStatus(documentInfo.documentId).then((res) => {
          const progressPer = Number(res.status.progress.replace('%', ''));
          setProgress(progressPer);

          if (progressPer >= 100) {
            clearInterval(progessInterval.current);
            setIsExtractionCompleted(true);
            setStartExtractionProcess(false);
            fetchExtractionLog(documentInfo.documentId);
          }
        })
      }, 3000);
    }
  }, [documentInfo.documentId, startExtractionProcess])

  useEffect(() => {
    document.addEventListener('startExtraction', () => setStartExtractionProcess(true));
    return () => {
      setStartExtractionProcess(false);
      document.removeEventListener('startExtraction', () => setStartExtractionProcess(true));
      clearInterval(progessInterval.current)
    };
  }, []);

  const fetchExtractionLog = (documentId) => {
    documentInfo.setIsLoading(true);
    try {
      getExtractionLog(documentId).then((res) => {
        setExtractLog(res.log);
      })
    }
    catch (e) {
      console.log(e);
    }
    finally {
      documentInfo.setIsLoading(false);
    }
  }

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
        <div style={{ margin: '15px 0', minHeight: "200px" }}>
          {isExtractionCompleted && (<>
            <p>Extraction log</p>
            <ul className={styles.dashedList}>
              <li>{extractLog?.text_tables_extracted} Text and Tables Extracted</li>
              <li>{extractLog?.attributes_extracted} Attributes Extracted</li>
              <li>Time Elapsed: {extractLog?.time_elapsed}</li>
            </ul>
          </>)}
        </div>
        <Button disabled={!isExtractionCompleted} onClick={navigateToTab2} className="full-width">Continue to validation</Button>
      </div>
    </section>
  );
};

export default Second;