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
  const { documentId, setIsLoading } = useDocument();
  const progessInterval = useRef(0);

  // used to toggle intro page
  const [showIntro, setShowIntro] = useState(true);

  // used to trigger extraction process
  const [startExtractionProcess, setStartExtractionProcess] = useState(false);

  // used to track progress of the extraction
  const [progress, setProgress] = useState(0);

  // used to store the extraction log, once the extraction is done
  const [extractLog, setExtractLog] = useState<Log | undefined>();

  // used to toggle the extraction log on UI
  const [showExtractionLog, setShowExtractionLog] = useState(false);

  useEffect(() => {
    if (documentId && startExtractionProcess) {
      setShowIntro(false);
      setProgress(0);
      setShowExtractionLog(false);

      console.log(`Event triggered: "startExtraction"`);
      console.log("Startting extraction for doc with documentId ---->", documentId);

      if (progessInterval.current) {
        clearInterval(progessInterval.current);
      }

      progessInterval.current = setInterval(() => {
        // getExtractionStatus(documentId).then((res) => {
        //   const progressPer = Number(res.status.progress.replace('%', ''));
        //   setProgress(progressPer);
        // })

        // remove this code when we un-comment the above code
        setProgress(prevProgress => prevProgress + 10);
      }, 500);
    }
  }, [documentId, startExtractionProcess]);

  useEffect(() => {
    if (progress >= 100) {
      clearInterval(progessInterval.current);
      setStartExtractionProcess(false);
      fetchExtractionLog(documentId);
    }
  }, [progress]);

  const startExtraction = () => {
    setStartExtractionProcess(true);
  }

  useEffect(() => {
    resetExtractionProcess();
    document.addEventListener('startExtraction', startExtraction);

    return () => {
      resetExtractionProcess();
    }
  }, []);

  const resetExtractionProcess = () => {
    setShowIntro(true);
    setProgress(0);
    setExtractLog(undefined);
    setShowExtractionLog(false);
    setStartExtractionProcess(false);
    document.removeEventListener('startExtraction', startExtraction);
    clearInterval(progessInterval.current);
  }

  const fetchExtractionLog = (documentId) => {
    setIsLoading(true);
    try {
      getExtractionLog(documentId).then((res) => {
        setExtractLog(res.log);
        setShowExtractionLog(true);
      })
    }
    catch (e) {
      console.log(e);
    }
    finally {
      setIsLoading(false);
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

      {!showIntro && <div>
        <div className=''>
          <ProgressBar progress={progress} />
        </div>
        <div style={{ margin: '45px 0', minHeight: "200px" }}>
          <p>Extraction log</p>
          {showExtractionLog && (<>
            <ul className={styles.dashedList}>
              <li>{extractLog?.text_tables_extracted} Text and Tables Extracted</li>
              <li>{extractLog?.attributes_extracted} Attributes Extracted</li>
              <li>Time Elapsed: {extractLog?.time_elapsed}</li>
            </ul>
          </>)}
          {!showExtractionLog && <p className={styles.tabDesc}>
            Please wait while we extract the data from the document.
          </p>}
        </div>
        {!startExtractionProcess && showExtractionLog && <Button disabled={!showExtractionLog} onClick={navigateToTab2} className="full-width primary">Continue to validation</Button> }
      </div>}

      {showIntro && <p>
        Upload a new recipe document or select a previously uploaded document and click on the 'Submit' button to start the extraction process.
      </p>}

    </section>
  );
};

export default Second;